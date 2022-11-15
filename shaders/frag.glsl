uniform float time;
uniform vec2 resolution;
uniform vec3 color;

uniform sampler2D tex;

uniform vec3 faceLandmarks;

varying vec2 vUv;

void main() {
  // gl_FragColor = vec4(color, 1.);
  // vec4 texColor = texture(tex, vUv.xy);
  // gl_FragColor = texColor;

  // wave deformation effect
  // vec2 uv = vUv.xy;
  // uv.x += sin(uv.y * 40. + time) * 0.01;
  // uv.y += sin(uv.x * 50. + time) * 0.01;
  // vec4 texColor = texture(tex, uv);
  // gl_FragColor = texColor;

  // red and blue color swap
  // vec4 texColor = texture(tex, vUv.xy);
  // gl_FragColor = vec4(texColor.b, texColor.g, texColor.r, texColor.a);

  // negative effect

  if (vUv.x < 0.5) {
    vec4 texColor = texture(tex, vUv.xy);
    gl_FragColor = vec4(texColor.r, texColor.g, texColor.b, texColor.a);
  } else {
    // apply negative effect to the half of the screen
    vec4 texColor = texture(tex, vUv.xy);
    gl_FragColor = vec4(1. - texColor.r, 1. - texColor.g, 1. - texColor.b, texColor.a);
  }
}
