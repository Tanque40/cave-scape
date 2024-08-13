"use client"
import { useEffect } from "react"

import roninStyles from "@/ronin-engine/assets/styles/ronin-styles.module.css"

const vertexShaderSource: string = `#version 300 es
    in vec2 vertexPosition;

    void main(){
        gl_Position = vec4(vertexPosition, 0.0, 1.0);
    }
`
const fragmentShaderSource: string = `#version 300 es
    precision mediump float;

    out vec4 outputColor;

    void main(){
        outputColor = vec4(0.294, 0.0, 0.51, 1.0);
    }
`

export default function RoninEntryPoint() {
  const showError = (errorText: string): void => {
    const errorBoxDiv: HTMLDivElement = document.getElementById('error-box') as HTMLDivElement
    const errorTextElement: HTMLParagraphElement = document.createElement('p')
    errorTextElement.innerText = errorText;
    errorBoxDiv.appendChild(errorTextElement)
    console.log(errorText);
  }

  const initWebGL = (): void => {
    const canvas: HTMLCanvasElement = document.getElementById('ronin-canvas') as HTMLCanvasElement;
    let gl: WebGL2RenderingContext | WebGLRenderingContext | null = canvas.getContext('webgl2')

    if (!gl) {
      showError("WebGl2 not supported, try webGl")
      gl = canvas.getContext('webgl')
    }

    if (!gl) {
      throw new Error("Your browser does not support webGl")
    }

    const triangleVertices: number[] = [
      // Top Midle
      0.0, 0.5,
      // Bottom left
      -0.5, -0.5,
      // Bottom right
      0.5, -0.5
    ]

    const triangleVerticesCpuBuffer = new Float32Array(triangleVertices)
    const triangleGeoBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, triangleVerticesCpuBuffer, gl.STATIC_DRAW)

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    if (vertexShader) {
      gl.shaderSource(vertexShader, vertexShaderSource)
      gl.compileShader(vertexShader)
      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        const compileError = gl.getShaderInfoLog(vertexShader)
        showError(`Failed to COMPILE vertex shader: ${compileError}`)
        return
      }
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    if (fragmentShader) {
      gl.shaderSource(fragmentShader, fragmentShaderSource)
      gl.compileShader(fragmentShader)
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        const compileError = gl.getShaderInfoLog(fragmentShader)
        showError(`Failed to COMPILE fragment shader: ${compileError}`)
        return
      }
    }

    const triangleShaderProgram = gl.createProgram();
    if (triangleShaderProgram) {
      gl.attachShader(triangleShaderProgram, vertexShader || 0)
      gl.attachShader(triangleShaderProgram, fragmentShader || 0)
      gl.linkProgram(triangleShaderProgram)
      if (!gl.getProgramParameter(triangleShaderProgram, gl.LINK_STATUS)) {
        const linkError = gl.getShaderInfoLog(triangleShaderProgram)
        showError(`Failed to LINK shaders: ${linkError}`)
        return
      }
    }

    const vertexPosiitonAttribLocation = gl.getAttribLocation(triangleShaderProgram || 0, 'vertexPosition');
    if (vertexPosiitonAttribLocation < 0) {
      showError(`Failed to get attrib location for vertex position`)
      return
    }

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.clearColor(0.08, 0.08, 0.08, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.useProgram(triangleShaderProgram)
    gl.enableVertexAttribArray(vertexPosiitonAttribLocation)

    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
    gl.vertexAttribPointer(
      // index: wich attribute use
      vertexPosiitonAttribLocation,
      // size: components,
      2,
      // type:
      gl.FLOAT,
      // normalized
      false,
      // stride,
      2 * Float32Array.BYTES_PER_ELEMENT,
      // offset
      0,
    )

    gl.drawArrays(gl.TRIANGLES, 0, 3)

  }

  useEffect((): void => {
    try {
      initWebGL();
    } catch (error: any) {
      showError(error)
      console.log(error);
    }
  })
  return (
    <>
      <canvas id="ronin-canvas" className={roninStyles.roninCanvas}></canvas>
      <div className={roninStyles.errorBox}>
        <span className={roninStyles.errorBoxTitle}>Error message, if any, in here </span>
      </div>
    </>
  )
}
