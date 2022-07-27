import { expect, use as chaiUse, assert } from 'chai';
import chaiBytes from 'chai-bytes';
chaiUse(chaiBytes);
import {
  uint8ArrayToSignedBigint,
  signedBigintToUint8Array,
  uint8ArrayToUnsignedBigint,
  unsignedBigintToUint8Array,
  signedBigintToHexString,
  hexStringToUnsignedBigint,
  hexStringToSignedBigint,
} from './index';

const testCases: Array<{ signed: bigint; unsigned: bigint; byteArray: Uint8Array; hex: string }> = [
  { signed: 0n, unsigned: 0n, byteArray: new Uint8Array([0x00]), hex: '0' },
  { signed: 1n, unsigned: 1n, byteArray: new Uint8Array([0x01]), hex: '1' },
  { signed: 2n, unsigned: 2n, byteArray: new Uint8Array([0x02]), hex: '2' },
  { signed: 126n, unsigned: 126n, byteArray: new Uint8Array([0x7e]), hex: '7e' },
  { signed: 127n, unsigned: 127n, byteArray: new Uint8Array([0x7f]), hex: '7f' },
  { signed: -128n, unsigned: 128n, byteArray: new Uint8Array([0x80]), hex: '80' },
  { signed: -127n, unsigned: 129n, byteArray: new Uint8Array([0x81]), hex: '81' },
  { signed: -126n, unsigned: 130n, byteArray: new Uint8Array([0x82]), hex: '82' },
  { signed: -2n, unsigned: 254n, byteArray: new Uint8Array([0xfe]), hex: 'fe' },
  { signed: -1n, unsigned: 255n, byteArray: new Uint8Array([0xff]), hex: 'ff' },
  {
    signed: 0n,
    unsigned: 0n,
    byteArray: new Uint8Array([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00,
    ]),
    hex: '0',
  },
  {
    signed: 1n,
    unsigned: 1n,
    byteArray: new Uint8Array([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x01,
    ]),
    hex: '1',
  },
  {
    signed: 2n,
    unsigned: 2n,
    byteArray: new Uint8Array([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x02,
    ]),
    hex: '2',
  },
  {
    signed: 1n,
    unsigned: 1n,
    byteArray: new Uint8Array([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x01,
    ]),
    hex: '1',
  },
  {
    signed: 57896044618658097711785492504343953926634992332820282019728792003956564819966n,
    unsigned: 57896044618658097711785492504343953926634992332820282019728792003956564819966n,
    byteArray: new Uint8Array([
      0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xfe,
    ]),
    hex: '7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe',
  },
  {
    signed: 57896044618658097711785492504343953926634992332820282019728792003956564819967n,
    unsigned: 57896044618658097711785492504343953926634992332820282019728792003956564819967n,
    byteArray: new Uint8Array([
      0x7f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xff,
    ]),
    hex: '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  },
  {
    signed: -57896044618658097711785492504343953926634992332820282019728792003956564819968n,
    unsigned: 57896044618658097711785492504343953926634992332820282019728792003956564819968n,
    byteArray: new Uint8Array([
      0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00,
    ]),
    hex: '8000000000000000000000000000000000000000000000000000000000000000',
  },
  {
    signed: -57896044618658097711785492504343953926634992332820282019728792003956564819967n,
    unsigned: 57896044618658097711785492504343953926634992332820282019728792003956564819969n,
    byteArray: new Uint8Array([
      0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x01,
    ]),
    hex: '8000000000000000000000000000000000000000000000000000000000000001',
  },
  {
    signed: -57896044618658097711785492504343953926634992332820282019728792003956564819966n,
    unsigned: 57896044618658097711785492504343953926634992332820282019728792003956564819970n,
    byteArray: new Uint8Array([
      0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x02,
    ]),
    hex: '8000000000000000000000000000000000000000000000000000000000000002',
  },
  {
    signed: -2n,
    unsigned: 115792089237316195423570985008687907853269984665640564039457584007913129639934n,
    byteArray: new Uint8Array([
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xfe,
    ]),
    hex: 'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe',
  },
  {
    signed: -1n,
    unsigned: 115792089237316195423570985008687907853269984665640564039457584007913129639935n,
    byteArray: new Uint8Array([
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xff,
    ]),
    hex: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  },
];

for (let testCase of testCases) {
  const expected = testCase.unsigned;
  const actual = uint8ArrayToUnsignedBigint(testCase.byteArray);
  expect(expected).to.equal(actual);
}
for (let testCase of testCases) {
  const expected = testCase.signed;
  const actual = uint8ArrayToSignedBigint(testCase.byteArray);
  expect(expected).to.equal(actual);
}
for (let testCase of testCases) {
  const expected = testCase.byteArray;
  const bits = testCase.byteArray.length * 8;
  const actual = unsignedBigintToUint8Array(testCase.unsigned, bits);
  expect(expected).to.equalBytes(actual);
}
for (let testCase of testCases) {
  const expected = testCase.byteArray;
  const bits = testCase.byteArray.length * 8;
  const actual = signedBigintToUint8Array(testCase.signed, bits);
  expect(expected).to.equalBytes(actual);
}

for (let testCase of testCases) {
  const expected = testCase.hex;
  const bits = testCase.byteArray.length * 8;
  const actual = signedBigintToHexString(testCase.signed, bits);
  expect(expected).to.equal(actual);
}
for (let testCase of testCases) {
  const expected = testCase.unsigned;
  const actual = hexStringToUnsignedBigint(testCase.hex);
  expect(expected).to.equal(actual);
}
for (let testCase of testCases) {
  const expected = testCase.signed;
  const actual = hexStringToSignedBigint(testCase.hex, testCase.byteArray.length * 8);
  expect(expected).to.equal(actual);
}

assert.throws(() => unsignedBigintToUint8Array(256n, 8));
assert.throws(() => signedBigintToUint8Array(128n, 8));
assert.throws(() => signedBigintToUint8Array(-129n, 8));
