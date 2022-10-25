uniform float time;
uniform vec2 resolution;
uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.);
}