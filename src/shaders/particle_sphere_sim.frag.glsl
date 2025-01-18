#version 300 es
#ifndef GL_FRAGMENT_PRECISION_HIGH
  precision mediump float;
#else
  precision highp float;
#endif

uniform sampler2D positions;
uniform float uTime;
uniform float uCurlFreq;
uniform vec3 uAntiGravityPos;
uniform float uAntiGravityStrength;
in vec2 vUv;

#include "../../node_modules/lygia/generative/curl.glsl"
#include "../../node_modules/lygia/generative/cnoise.glsl"

void main() {
    float t = uTime * 0.015;

    // 1) Read current position from the texture
    vec3 pos = texture(positions, vUv).rgb;
    // 2) Apply curl-based movement
    vec3 basePos = curl(pos * uCurlFreq + t);
    vec3 curlPos = basePos;
    curlPos += curl(curlPos * uCurlFreq *  2.0) * 0.5;
    curlPos += curl(curlPos * uCurlFreq *  4.0) * 0.25;
    curlPos += curl(curlPos * uCurlFreq *  8.0) * 0.125;
    curlPos += curl(basePos * uCurlFreq * 16.0) * 0.0625;

    vec3 finalPos = vec3(mix(basePos, curlPos, cnoise(basePos + t)));

    vec3 dir = finalPos - uAntiGravityPos;
    float dist = length(dir);

    // define your falloff
    // e.g. force = strength / (dist + small_epsilon)
    float force = uAntiGravityStrength / (dist + 0.001);
    force = clamp(force, 0.0, uAntiGravityStrength); // or clamp further if desired

    // push away
    finalPos += normalize(dir) * force;

    // output new position
    gl_FragColor = vec4(finalPos, 1.0);
}