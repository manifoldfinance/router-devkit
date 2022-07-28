import type { ErrorCode, ErrorFetchRequest, ErrorFetchResponse } from './errors.js';
import type EthersError  from './errors.js';

// Generic Errors

export interface UnknownError extends EthersError<'UNKNOWN_ERROR'> {
  [key: string]: any;
}

export interface NotImplementedError extends EthersError<'NOT_IMPLEMENTED'> {
  operation: string;
}

export interface UnsupportedOperationError extends EthersError<'UNSUPPORTED_OPERATION'> {
  operation: string;
}

export interface NetworkError extends EthersError<'NETWORK_ERROR'> {
  event: string;
}

export interface ServerError extends EthersError<'SERVER_ERROR'> {
  request: ErrorFetchRequest | string;
  response?: ErrorFetchResponse;
}

export interface TimeoutError extends EthersError<'TIMEOUT'> {
  operation: string;
  reason: string;
  request?: ErrorFetchRequest;
}

export interface BadDataError extends EthersError<'BAD_DATA'> {
  value: any;
}

// Operational Errors

export interface BufferOverrunError extends EthersError<'BUFFER_OVERRUN'> {
  buffer: Uint8Array;
  length: number;
  offset: number;
}

export interface NumericFaultError extends EthersError<'NUMERIC_FAULT'> {
  operation: string;
  fault: string;
  value: any;
}

// Argument Errors

export interface InvalidArgumentError extends EthersError<'INVALID_ARGUMENT'> {
  argument: string;
  value: any;
  info?: Record<string, any>;
}

export interface MissingArgumentError extends EthersError<'MISSING_ARGUMENT'> {
  count: number;
  expectedCount: number;
}

export interface UnexpectedArgumentError extends EthersError<'UNEXPECTED_ARGUMENT'> {
  count: number;
  expectedCount: number;
}

//export interface ValueMismatchError extends EthersError<ErrorCode.UNEXPECTED_ARGUMENT> {
//    count: number;
//    expectedCount: number;
//}

// Blockchain Errors

export interface CallExceptionError extends EthersError<'CALL_EXCEPTION'> {
  // The revert data
  data: string;

  // The transaction that triggered the exception
  transaction?: any;

  // The Contract, method and args used during invocation
  method?: string;
  signature?: string;
  args?: ReadonlyArray<any>;

  // The Solidity custom revert error
  errorSignature?: string;
  errorName?: string;
  errorArgs?: ReadonlyArray<any>;
  reason?: string;
}

//export interface ContractCallExceptionError extends CallExceptionError {
// The transaction call
//    transaction: any;//ErrorTransaction;
//}

export interface InsufficientFundsError extends EthersError<'INSUFFICIENT_FUNDS'> {
  transaction: any; //ErrorTransaction;
}

export interface NonceExpiredError extends EthersError<'NONCE_EXPIRED'> {
  transaction: any; //ErrorTransaction;
}

export interface OffchainFaultError extends EthersError<'OFFCHAIN_FAULT'> {
  transaction?: any;
  reason: string;
}

export interface ReplacementUnderpricedError extends EthersError<'REPLACEMENT_UNDERPRICED'> {
  transaction: any; //ErrorTransaction;
}

export interface TransactionReplacedError extends EthersError<'TRANSACTION_REPLACED'> {
  cancelled: boolean;
  reason: 'repriced' | 'cancelled' | 'replaced';
  hash: string;
  replacement: any; //TransactionResponse;
  receipt: any; //TransactionReceipt;
}

export interface UnconfiguredNameError extends EthersError<'UNCONFIGURED_NAME'> {
  value: string;
}

export interface UnpredictableGasLimitError extends EthersError<'UNPREDICTABLE_GAS_LIMIT'> {
  transaction: any; //ErrorTransaction;
}

// Coding; converts an ErrorCode its Typed Error

export type CodedEthersError<T> = T extends 'UNKNOWN_ERROR'
  ? UnknownError
  : T extends 'NOT_IMPLEMENTED'
  ? NotImplementedError
  : T extends 'UNSUPPORTED_OPERATION'
  ? UnsupportedOperationError
  : T extends 'NETWORK_ERROR'
  ? NetworkError
  : T extends 'SERVER_ERROR'
  ? ServerError
  : T extends 'TIMEOUT'
  ? TimeoutError
  : T extends 'BAD_DATA'
  ? BadDataError
  : T extends 'BUFFER_OVERRUN'
  ? BufferOverrunError
  : T extends 'NUMERIC_FAULT'
  ? NumericFaultError
  : T extends 'INVALID_ARGUMENT'
  ? InvalidArgumentError
  : T extends 'MISSING_ARGUMENT'
  ? MissingArgumentError
  : T extends 'UNEXPECTED_ARGUMENT'
  ? UnexpectedArgumentError
  : T extends 'CALL_EXCEPTION'
  ? CallExceptionError
  : T extends 'INSUFFICIENT_FUNDS'
  ? InsufficientFundsError
  : T extends 'NONCE_EXPIRED'
  ? NonceExpiredError
  : T extends 'OFFCHAIN_FAULT'
  ? OffchainFaultError
  : T extends 'REPLACEMENT_UNDERPRICED'
  ? ReplacementUnderpricedError
  : T extends 'TRANSACTION_REPLACED'
  ? TransactionReplacedError
  : T extends 'UNCONFIGURED_NAME'
  ? UnconfiguredNameError
  : T extends 'UNPREDICTABLE_GAS_LIMIT'
  ? UnpredictableGasLimitError
  : never;

/**
 *  try {
 *      // code....
 *  } catch (e) {
 *      if (isError(e, errors.CALL_EXCEPTION)) {
 *          console.log(e.data);
 *      }
 *  }
 */
export function isError<K extends ErrorCode, T extends CodedEthersError<K>>(
  error: any,
  code: K,
): error is T {
  return error && (<EthersError>error).code === code;
}

export function isCallException(error: any): error is CallExceptionError {
  return isError(error, 'CALL_EXCEPTION');
}
