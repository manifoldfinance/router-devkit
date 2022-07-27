/**
 * @file constants
 * @summary Manifold Finance Constants and Contracts
 * @author Manifold Finance, Inc.
 * @license BSD4
 * @version 0.0.0
 *
 */

import { Hexable } from '@ethersproject/bytes';
import JSBI from 'jsbi';

// exports for external consumption
export type BigintIsh = JSBI | string | number;

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
}

/**
 * @copyright
 * @version
 * @package
 */

//********************************************************************************************//
//
//  @namespace Manifold Finance
//
//********************************************************************************************//

// export const [] = {};

export const multisig = ['0x72cbdeaadddd14ec95b92995933cec69566650f0'];

export const accounts = [
  '0xdc9ca13f21f10c8a922767cd4fa210ca7c4313ac',
  '0xcee9ad6d00237e25a945d7ac2f7532c602d265df',
  '0x5c6b5fac9dd1054e7a57c500e0b36fc5e8b48a70',
];
export const deployments = ['0xbfe403e747ab13f7297d1fcacebb2601bf2fef4c'];

export const FOLD_TOKEN = {
  mainnet: {
    FOLD: '0xd084944d3c05cd115c09d072b9f44ba3e0e45921',
  },
};

/**
 *
 * @summary JavaScript engine analysis
 * @exports sdkCanary
 */

export const sdkCanary = 0xdeadbeefcafe;
export const sdk_lm = (sdkCanary & 0xffffff) == 0xefcafe;

export const MANIFOLD_ERC20 = FOLD_TOKEN;

// @TODO
// @fixme
export const FOLD_ERC20_ABI = {};
export const MANIFOLD_ERC20_ABI = FOLD_ERC20_ABI;

// @fixme
export const MANIFOLD_STAKING_ABI = {};
// @fixme
export const MANIFOLD_GOVERNANCE_ABI = {};
// @fixme
export const MANIFOLD_LIBCALLER_ABI = {};
// @fixme
export const MANIFOLD_REGISTRY_ABI = {};
// @fixme
export const MANIFOLD_PAYOUTS_ABI = {};
// @fixme
export const MANIFOLD_PROXY_ABI = {};

//********************************************************************************************//
// @fixme
// SafeChainId
// safety checks and values
// timezone constants and math constants
//********************************************************************************************//

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ADDRESS_ZERO_PADDED =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const DUMMY_ADDRESS = '0x0000000000000000000000000000000000000001';

export const MAX_SAFE_CHAIN_ID = 4503599627370476;

// @exports isSafeChainId
// @param chainId
// @returns isSafeInteger
export function isSafeChainId(chainId: number) {
  return Number.isSafeInteger(chainId) && chainId > 0 && chainId <= MAX_SAFE_CHAIN_ID;
}

/**
 * @constant timestampUtc
 * @summary UTC timestamp (seconds since 1970-01-01)
 * @param timeStapUtc
 * @typeOf {float} seconds
 */
export const timestampUtc = () => new Date().getTime() / 1000; // float seconds

/**
 * @const MaxUint256
 * @summary Max Uint256
 * @type JSBI.bigint
 */
// export const MaxUint256: JSBI.bigint = JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
// export const MAX_INT = 115792089237316195423570985008687907853269984665640564039457584007913129639935
/**
 * @const MAX_ENCODED_BIGINT
 * @summary 2n**256n
 * @type bigint
 */
// export const MAX_ENCODED_BIGINT: bigint = 115792089237316195423570985008687907853269984665640564039457584007913129639936

/**
 * @const MAX_ENCODED_NUMBER
 * @summary 2**53
 * @typeOf number
 */

export const MAX_ENCODED_NUMBER = 4503599627370496;

/**
 * @exports NETWORKISH_ID
 * @summary canonical chainId
 * @typeOf {number}
 */

export const NETWORK_TYPE_RPC = 'rpc';
/**  @note networkId is pathological  */
export const MAINNET_NETWORK_ID = '1';
export const ROPSTEN_NETWORK_ID = '3';
export const RINKEBY_NETWORK_ID = '4';
export const GOERLI_NETWORK_ID = '5';
export const KOVAN_NETWORK_ID = '42';

export const MAINNET_CHAIN_ID = '0x1';
export const ROPSTEN_CHAIN_ID = '0x3';
export const RINKEBY_CHAIN_ID = '0x4';
export const GOERLI_CHAIN_ID = '0x5';
export const KOVAN_CHAIN_ID = '0x2a';

/**
 * @constant MAX_SAFE_CHAIN_ID
 * @returns 4503599627370476
 * @summary The largest possible chainId MetaMask can handle
 */

// @fixme

/**
 * @param
 * @returns
 * @type
 */

function NETWORK_TYPE_TO_ID_MAP(NETWORK_TYPE_TO_ID_MAP: any) {
  throw new Error('Function not implemented.');
}

export const CHAIN_ID_TO_TYPE_MAP = Object.entries(NETWORK_TYPE_TO_ID_MAP).reduce(
  (chainIdToTypeMap, [networkType, { chainId }]) => {
    chainIdToTypeMap[chainId] = networkType;
    return chainIdToTypeMap;
  },
  {},
);
export const CHAIN_ID_TO_NETWORK_ID_MAP = Object.values(NETWORK_TYPE_TO_ID_MAP).reduce(
  (chainIdToNetworkIdMap, { chainId, networkId }) => {
    chainIdToNetworkIdMap[chainId] = networkId;
    return chainIdToNetworkIdMap;
  },
  {},
);

// @fixme
// export const MAX = {
// "0": ""
// };
