#version 300 es
#ifndef GL_FRAGMENT_PRECISION_HIGH
  precision mediump float;
#else
  precision highp float;
#endif
in vec2 position;
out vec2 vUv;

#include test;

void main() {
    vUv = position.xy * 0.5 + 0.5;  // Convert [-1, 1] range to [0, 1] UV range
    gl_Position = vec4(position.x, position.y, 0.0, 1.0);
}
