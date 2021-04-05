export function drawRectangle(gl, buffer, colorLocation, { x, y, w, h }, color) {
  const rightX = x + w;
  const bottomY = y + h;
  const positions = [
    x, y,
    rightX, bottomY,
    x, bottomY,
    x, y,
    rightX, y,
    rightX, bottomY,
  ]
  gl.bufferData(buffer, new Float32Array(positions), gl.STATIC_DRAW);
  gl.uniform4f(colorLocation, ...color);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}