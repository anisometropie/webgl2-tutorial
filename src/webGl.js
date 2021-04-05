export function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
 
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

export function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
 
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

export function clearCanvas(gl) {
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

export function createAndBindBuffer(gl, glBuffer) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(glBuffer, buffer);
  return buffer;
}

export function createVertexArray(
  gl, 
  {
    attributeLocation,
    size,
    type,
    normalize = false,
    stride = 0,
    offset = 0,
  }
  ) {
  const vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);
  gl.enableVertexAttribArray(attributeLocation); // the data is 32bit floats      // start at the beginning of the buffer
  gl.vertexAttribPointer(attributeLocation, size, type, normalize, stride, offset)
}