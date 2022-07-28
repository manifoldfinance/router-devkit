import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { splitSignature } from '@ethersproject/bytes';
import { Contract } from '@ethersproject/contracts';
import { Wallet } from '@ethersproject/wallet';
import { signTypedData, SignTypedDataVersion, TypedDataUtils } from '@metamask/eth-sig-util';
import { addHexPrefix, toBuffer } from 'ethereumjs-util';
