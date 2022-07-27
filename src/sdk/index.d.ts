/**
 * @file lib.d.ts
 * @summary Manifold Finance Constants and Contracts
 * @author Manifold Finance, Inc.
 * @license BSD4
 * @version 0.0.0
 *
 */
//********************************************************************************************//

// SafeChainId
// safety checks and values
// timezone constants and math constants
//********************************************************************************************//
export as namespace manifold;

export const MAX_SAFE_CHAIN_ID = 4503599627370476;

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
