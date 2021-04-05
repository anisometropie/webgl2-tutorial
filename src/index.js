import { 
  createShader, 
  createProgram, 
  clearCanvas,
  createAndBindBuffer,
  feedAttributeWithArrayBuffer,
 } from './webGl'

 import { drawRectangle } from './shapes'

import vertexShaderSource from './vertex.glsl'
import fragmentShaderSource from './fragment.glsl'

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
const colorLocation = gl.getUniformLocation(program, "u_color");

// we first create an array buffer, that is going to feed data to the vertex array
const positionBuffer = createAndBindBuffer(gl, gl.ARRAY_BUFFER);

feedAttributeWithArrayBuffer(
  gl, 
  {
    attributeLocation: positionAttributeLocation,
    size: 2,        // 2 components per iteration
    type: gl.FLOAT, // the data is 32bit floats
  },
)

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
clearCanvas(gl);
gl.useProgram(program);
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

const black = [0,0,0,1];
const white = [1,1,1,1];
const SIZE = 16;
const rowWidth = gl.canvas.width / SIZE;
const columnHeight = gl.canvas.height / SIZE;
for (let i=0; i<SIZE; i++) {
  for (let j=0; j<SIZE; j++) {
    
    drawRectangle(
      gl, 
      gl.ARRAY_BUFFER, 
      colorLocation, 
      { x: rowWidth * i, y: columnHeight * j, w: rowWidth, h: columnHeight }, 
      (i + j) % 2 === 0 ? black : white
      )
  }
}