#version 300 es
#ifndef GL_FRAGMENT_PRECISION_HIGH
  precision mediump float;
#else
  precision highp float;
#endif

uniform float uOpacity;
uniform vec4 uColor;
in float vDistance;
void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    if (dot(cxy, cxy) > 1.0) discard;
    gl_FragColor = uColor * vec4(vec3(1.0), (1.04 - clamp(vDistance * 1.5, 0.0, 1.0)) * uOpacity);
}