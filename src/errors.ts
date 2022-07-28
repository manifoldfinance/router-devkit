//export type TransactionReceipt {
//}

export type ErrorSignature = {
  r: string;
  s: string;
  yParity: 0 | 1;
  networkV: bigint;
};

export type ErrorAccessList = Array<{ address: string; storageKeys: Array<string> }>;

/*
export interface ErrorTransaction {
    type?: number;

    to?: string;
    from?: string;

    nonce?: number;

    gasLimit?: bigint;
    gasPrice?: bigint;

    maxPriorityFeePerGas?: bigint;
    maxFeePerGas?: bigint;

    data?: string;
    value?: bigint;
    chainId?: bigint;

    hash?: string;

    signature?: ErrorSignature;

    accessList?: ErrorAccessList;
}
*/

export interface ErrorFetchRequestWithBody extends ErrorFetchRequest {
  body: Readonly<Uint8Array>;
}

export interface ErrorFetchRequest {
  url: string;
  method: string;
  headers: Readonly<Record<string, string>>;
  getHeader(key: string): string;
  body: null | Readonly<Uint8Array>;
  hasBody(): this is ErrorFetchRequestWithBody;
}

export interface ErrorFetchResponseWithBody extends ErrorFetchResponse {
  body: Readonly<Uint8Array>;
}

export interface ErrorFetchResponse {
  statusCode: number;
  statusMessage: string;
  headers: Readonly<Record<string, string>>;
  getHeader(key: string): string;
  body: null | Readonly<Uint8Array>;
  hasBody(): this is ErrorFetchResponseWithBody;
}

export type ErrorCode =
  // Generic Errors
  | 'UNKNOWN_ERROR'
  | 'NOT_IMPLEMENTED'
  | 'UNSUPPORTED_OPERATION'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | 'TIMEOUT'
  | 'BAD_DATA'

  // Operational Errors
  | 'BUFFER_OVERRUN'
  | 'NUMERIC_FAULT'

  // Argument Errors
  | 'INVALID_ARGUMENT'
  | 'MISSING_ARGUMENT'
  | 'UNEXPECTED_ARGUMENT'
  | 'VALUE_MISMATCH'

  // Blockchain Errors
  | 'CALL_EXCEPTION'
  | 'INSUFFICIENT_FUNDS'
  | 'NONCE_EXPIRED'
  | 'REPLACEMENT_UNDERPRICED'
  | 'TRANSACTION_REPLACED'
  | 'UNPREDICTABLE_GAS_LIMIT'
  | 'UNCONFIGURED_NAME'
  | 'OFFCHAIN_FAULT';

  // export interface EthersError<T extends ErrorCode = ErrorCode> extends Error {
export interface EthersError extends Error {
  code: ErrorCode;
    recover?: (...args: Array<any>) => any;
  info?: Record<string, any>;
  error?: Error;
}

export default EthersError