#version 300 es
layout(location = 0) in vec3 vertexPosition;
layout(location = 1) in vec4 ourColor;

out vec4 vertexColor;

void main(){
  gl_Position = vec4(vertexPosition, 1.0);
  vertexColor = ourColor;
}
