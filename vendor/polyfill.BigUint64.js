DataView.prototype.setBigUint64 ??= function (byteOffset, value, littleEndian) {
  const wh = Number((value >> 32n) & 0xffffffffn);
  const wl = Number(value & 0xffffffffn);
  const [h, l] = littleEndian ? [4, 0] : [0, 4];
  this.setUint32(byteOffset + h, wh, littleEndian);
  this.setUint32(byteOffset + l, wl, littleEndian);
};
DataView.prototype.getBigUint64 ??= function (byteOffset, littleEndian) {
  const [h, l] = littleEndian ? [4, 0] : [0, 4];
  const wh = BigInt(this.getUint32(byteOffset + h, littleEndian));
  const wl = BigInt(this.getUint32(byteOffset + l, littleEndian));
  return (wh << 32n) + wl;
};
