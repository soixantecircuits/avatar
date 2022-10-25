uniform float time;
uniform vec2 resolution;
uniform vec3 color;

uniform sampler2D tex;

varying vec2 vUv;

void main() {
  // gl_FragColor = vec4(color, 1.);
  vec4 texColor = texture(tex, vUv.xy);
  gl_FragColor = texColor;

}