#version 300 es
precision highp float;

in vec2 vUv;  // Input from vertex shader (interpolated UV coords)
out vec4 outColor;  // Output fragment color (WebGL 2.0 requires explicit out variable)

uniform sampler2D texturePosition;  // Input texture storing particle positions
uniform float deltaTime;

void main() {
    vec4 pos = texture(texturePosition, vUv);  // Get current position and velocity
    vec2 position = pos.xy;  // Particle position
    vec2 velocity = pos.zw;  // Particle velocity

    // Example: apply simple gravity
    velocity.y -= 9.8 * deltaTime;  // Apply downward force
    position += velocity * deltaTime;  // Update position

    outColor = vec4(position, velocity);  // Write new position and velocity to the output
}
