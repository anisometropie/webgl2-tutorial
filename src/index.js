import { 
  createShader, 
  createProgram, 
  clearCanvas,
  createAndBindBuffer,
  createVertexArray,
 } from './webGl'

import vertexShaderSource from './vertex.glsl'
import fragmentShaderSource from './fragment.glsl'

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

// we first create an array buffer, that is going to feed data to the vertex array
const positionBuffer = createAndBindBuffer(gl, gl.ARRAY_BUFFER);
const positions = [
  0, 0,
  100, 100,
  100, 0
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

createVertexArray(
  gl, 
  {
    attributeLocation: positionAttributeLocation,
    size: 2,        // 2 components per iteration
    type: gl.FLOAT, // the data is 32bit floats
  },
)

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
// Clear the canvas
clearCanvas(gl);

gl.useProgram(program);
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

gl.drawArrays(gl.TRIANGLES, 0, 3);