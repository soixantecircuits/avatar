uniform float time;
uniform vec2 resolution;
uniform vec3 color;

uniform sampler2D tex;

uniform mat3 faceLandmarks;

varying vec2 vUv;

void main() {
  gl_FragColor = vec4(color, 1.);
  vec4 texColor = texture(tex, vUv.xy);
  gl_FragColor = texColor;

  // wave deformation effect
  // vec2 uv = vUv.xy;
  // uv.x += sin(uv.y * 40. + time) * 0.01;
  // uv.y += sin(uv.x * 50. + time) * 0.01;
  // vec4 texColor = texture(tex, uv);
  // gl_FragColor = texColor;

  // negative effect

  // vec4 texColor = texture(tex, vUv.xy);

  // if (vUv.x < 0.5) {
  //   gl_FragColor = vec4(texColor.r, texColor.g, texColor.b, texColor.a);
  // } else {
  //   // apply negative effect to the half of the screen
  //   gl_FragColor = vec4(1. - texColor.r, 1. - texColor.g, 1. - texColor.b, texColor.a);
  // }

  // rainbow effect with waves
  // vec2 uv = vUv.xy;
  // uv.x += sin(uv.y * 40. + time) * 0.01;
  // uv.y += sin(uv.x * 50. + time) * 0.01;
  // vec4 texColor = texture(tex, uv);

  // float r = texColor.r;
  // float g = texColor.g;
  // float b = texColor.b;

  // if (vUv.x < 0.33) {
  //   gl_FragColor = vec4(r, g, b, texColor.a);
  // } else if (vUv.x < 0.66) {
  //   gl_FragColor = vec4(g, b, r, texColor.a);
  // } else {
  //   gl_FragColor = vec4(b, r, g, texColor.a);
  // }

}
