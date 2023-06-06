uniform float time;
uniform vec2 resolution;
uniform vec3 color;

uniform sampler2D tex;

uniform mat3 faceLandmarks;

varying vec2 vUv;

void main() {
  // gl_FragColor = vec4(color, 1.);
  // vec4 texColor = texture(tex, vUv.xy);
  // gl_FragColor = texColor;

  vec4 texColor = texture(tex, vUv.xy);
  gl_FragColor = vec4(texColor.r * 0.9, texColor.g * 0.8, texColor.b * 0.7, texColor.a);
}
