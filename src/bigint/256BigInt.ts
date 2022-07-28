/**
 * 256 Big Interger Primitives
 *
 * @since 0.7.0
 *
 */

export function uint8ArrayToUnsignedBigint(uint8Array: Iterable<number>): bigint {
  let value = 0n;
  for (let byte of uint8Array) {
    value = (value << 8n) + BigInt(byte);
  }
  return value;
}

export function uint8ArrayToSignedBigint(
  uint8Array: Iterable<number> & { length: number },
): bigint {
  const unsignedValue = uint8ArrayToUnsignedBigint(uint8Array);
  return twosComplement(unsignedValue, uint8Array.length * 8);
}

export function hexStringToUnsignedBigint(hexString: string): bigint {
  const normalizedHexString = validateAndNormalizeHexString(hexString);
  return BigInt(`0x${normalizedHexString}`);
}

export function hexStringToSignedBigint(hexString: string, numberOfBits: number): bigint {
  const normalizedHexString = validateAndNormalizeHexString(hexString);
  const unsignedValue = BigInt(`0x${normalizedHexString}`);
  return twosComplement(unsignedValue, numberOfBits);
}

export function unsignedBigintToUint8Array(value: bigint, numberOfBits: number): Uint8Array {
  if (numberOfBits % 8)
    throw new Error(`Only 8-bit increments are supported when serializing a bigint.`);
  if (value >= 2n ** BigInt(numberOfBits) || value < 0)
    throw new Error(`Cannot fit ${value} into a ${numberOfBits}-bit unsigned integer.`);
  const result = new Uint8Array(numberOfBits / 8);
  for (let i = 0; i < result.length; ++i) {
    result[i] = Number((value >> BigInt(numberOfBits - i * 8 - 8)) & 0xffn);
  }
  return result;
}

export function signedBigintToUint8Array(value: bigint, numberOfBits: number): Uint8Array {
  if (numberOfBits % 8)
    throw new Error(`Only 8-bit increments are supported when serializing a bigint.`);
  if (value >= 2n ** BigInt(numberOfBits - 1) || value < -(2n ** BigInt(numberOfBits - 1)))
    throw new Error(`Cannot fit ${value} into a ${numberOfBits}-bit signed integer.`);
  const unsignedValue = twosComplement(value, numberOfBits);
  return unsignedBigintToUint8Array(unsignedValue, numberOfBits);
}

export function signedBigintToHexString(value: bigint, numberOfBits: number): string {
  const unsignedValue = twosComplement(value, numberOfBits);
  return unsignedValue.toString(16);
}

function validateAndNormalizeHexString(hex: string): string {
  const match = new RegExp(`^(?:0x)?([a-fA-F0-9]*)$`).exec(hex);
  if (match === null)
    throw new Error(
      `Expected a hex string encoded byte array with an optional '0x' prefix but received ${hex}`,
    );
  return match[1] as any;
}

function twosComplement(value: bigint, numberOfBits: number): bigint {
  const mask = 2n ** (BigInt(numberOfBits) - 1n) - 1n;
  return (value & mask) - (value & ~mask);
}
