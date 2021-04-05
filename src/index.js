import { createShader, createProgram } from './webGl'

import vertexShaderSource from './vertex.glsl'
import fragmentShaderSource from './fragment.glsl'

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = [
  0, 0,
  400, 300,
  0, 300,
  200, 20,
  200, 60,
  100, 60,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);
gl.enableVertexAttribArray(positionAttributeLocation);
const size = 2;          // 2 components per iteration
const type = gl.FLOAT;   // the data is 32bit floats
const normalize = false; // don't normalize the data
const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
const offset = 0;        // start at the beginning of the buffer
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
// Clear the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

gl.useProgram(program);

// Bind the attribute/buffer set we want.
gl.bindVertexArray(vao);

gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);


gl.drawArrays(gl.TRIANGLES, 0, 6);