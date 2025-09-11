export function floatArrayToBuffer(arr: number[]): Buffer {
  const f32 = new Float32Array(arr);
  return Buffer.from(f32.buffer);
}

export function bufferToFloatArray(buf: Buffer): number[] {
  const f32 = new Float32Array(buf.buffer, buf.byteOffset, Math.floor(buf.byteLength / 4));
  return Array.from(f32);
}
