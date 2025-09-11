/**
 * Converts a float array to Buffer for SQLite storage
 * @param {number[]} arr - Array of float numbers to convert
 * @returns {Buffer} Binary buffer representation of the float array
 */
export function floatArrayToBuffer(arr: number[]): Buffer {
  const f32 = new Float32Array(arr);
  return Buffer.from(f32.buffer);
}

/**
 * Converts a Buffer back to float array from SQLite storage
 * @param {Buffer} buf - Binary buffer to convert
 * @returns {number[]} Array of float numbers
 */
export function bufferToFloatArray(buf: Buffer): number[] {
  const f32 = new Float32Array(buf.buffer, buf.byteOffset, Math.floor(buf.byteLength / 4));
  return Array.from(f32);
}
