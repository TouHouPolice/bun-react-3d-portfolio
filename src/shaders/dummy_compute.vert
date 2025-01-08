#version 300 es
precision highp float;

in vec2 position;  // Input from the vertex buffer (attribute equivalent)
out vec2 vUv;      // Output to fragment shader (varying equivalent)

void main() {
    vUv = position * 0.5 + 0.5;  // Convert [-1, 1] range to [0, 1] UV range
    gl_Position = vec4(position, 0.0, 1.0);
}
