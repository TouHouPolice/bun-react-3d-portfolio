#version 300 es
#ifndef GL_FRAGMENT_PRECISION_HIGH
  precision mediump float;
#else
  precision highp float;
#endif

in vec2 vUv;  // Input from vertex shader (interpolated UV coords)
out vec4 outColor;  // Output fragment color (WebGL 2.0 requires explicit out variable)

uniform sampler2D texturePosition;  // Input texture storing particle positions
uniform float deltaTime;

void main() {
    vec4 pos = texture(texturePosition, vUv);  // Get current position and velocity
    vec2 position = pos.xy;  // Particle position
    vec2 velocity = pos.zw;  // Particle velocity

    // Example: apply simple gravity
    velocity.xy += 9.8 * deltaTime;  // Apply downward force
    position += velocity * deltaTime;  // Update position

    vec4 result = vec4(position, velocity);  // Write new position and velocity to the output
    // Convert result components to sin/cos to test trigonometric functions
    result = vec4(sin(position.x), cos(position.y), sin(velocity.x), cos(velocity.y));

    outColor = result; // Write new position and velocity to the output
    //outColor = vec4(1.0, 0.0, 0.0, 1.0);  // Write red color to the output
}
