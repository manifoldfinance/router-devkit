export const fetchTextSignatures = async (methodSignature: string): Promise<string[]> => {
  const url = new URL('/api/v1/signatures', 'https://www.4byte.directory');
  url.searchParams.set('hex_signature', methodSignature);
  url.searchParams.set('ordering', 'created_at');
  const response = await fetch(url.toString());
  const { results } = await response.json();
  return results.map((signature) => signature.text_signature);
};

const getMethodSignature = (data: string) => {
  const methodSignature = data.substr(0, 10);
  if (isHexString(methodSignature) && methodSignature.length === 10) {
    return methodSignature;
  }
  return null;
};

export const decodeContractTransaction = async (
  network: string,
  transaction: ModuleTransaction,
): Promise<ContractInteractionModuleTransaction> => {
  const decode = (abi: string | FunctionFragment[]) => {
    const contractInterface = new InterfaceDecoder(abi);
    const method = contractInterface.getMethodFragment(transaction.data);
    contractInterface.decodeFunction(transaction.data, method); // Validate data can be decode by method.
    return contractInteractionToModuleTransaction({
      data: transaction.data,
      nonce: 0,
      to: transaction.to,
      value: transaction.value,
      method,
    });
  };

  const contractAbi = await getContractABI(network, transaction.to);
  if (contractAbi) return decode(contractAbi);

  const methodSignature = getMethodSignature(transaction.data);
  if (methodSignature) {
    const textSignatures = await fetchTextSignatures(methodSignature);
    for (const signature of textSignatures) {
      try {
        return decode([FunctionFragment.fromString(signature)]);
      } catch (e) {
        console.warn('invalid abi for transaction');
      }
    }
  }

  throw new Error(`we were not able to decode this transaction`);
};

export const isERC20TransferTransaction = (transaction: ModuleTransaction) => {
  return getMethodSignature(transaction.data) === '0xa9059cbb';
};

export const decodeERC721TransferTransaction = (transaction: ModuleTransaction) => {
  const erc721ContractInterface = new InterfaceDecoder(ERC721ContractABI);
  try {
    return erc721ContractInterface.decodeFunction(transaction.data);
  } catch (e) {
    return null;
  }
};

export const decodeTransactionData = async (network: string, transaction: ModuleTransaction) => {
  if (!transaction.data || transaction.data === '0x') {
    return transferFundsToModuleTransaction({
      recipient: transaction.to,
      amount: transaction.value,
      data: '0x',
      token: ETHEREUM_COIN,
      nonce: 0,
    });
  }

  if (isERC20TransferTransaction(transaction)) {
    try {
      const erc20ContractInterface = new InterfaceDecoder(ERC20ContractABI);
      const params = erc20ContractInterface.decodeFunction(transaction.data);
      const token = await getGnosisSafeToken(network, transaction.to);
      return transferFundsToModuleTransaction({
        recipient: params[0],
        amount: params[1],
        data: transaction.data,
        nonce: 0,
        token,
      });
    } catch (e) {
      console.warn('invalid ERC20 transfer transaction');
    }
  }
};
