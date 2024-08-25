"use client"
import { useEffect } from "react"

import roninStyles from "@/ronin-engine/assets/styles/ronin-styles.module.css"
import fragmentShaderSource from '@/ronin-engine/assets/shaders/fragment-shader.shader.frag'
import vertexShaderSource from '@/ronin-engine/assets/shaders/vertex-shader.shader.vert'
import { showError } from "./utils/errors"

export default function RoninEntryPoint() {
  const initWebGL = (): void => {
    const canvas: HTMLCanvasElement = document.getElementById('ronin-canvas') as HTMLCanvasElement;
    let gl: WebGL2RenderingContext | WebGLRenderingContext | null = canvas.getContext('webgl2', {
      premultipliedAlpha: false  // Ask for non-premultiplied alpha
    })

    if (!gl) {
      showError("WebGl2 not supported, try webGl")
      gl = canvas.getContext('webgl')
    }

    if (!gl) {
      throw new Error("Your browser does not support webGl")
    }

    const triangleVertices: number[] = [


      // Bottom left
      -0.1, -0.1, 0.5, 0.80, 0.40, 0.60, 1.0,
      // Top left    //Colors
      -0.1, 0.9, 0.5, 0.80, 0.40, 0.60, 1.0,
      // Bottom right
      0.9, -0.1, 0.5, 0.80, 0.40, 0.60, 1.0,
      // Top right
      0.9, 0.9, 0.5, 0.80, 0.40, 0.60, 1.0,

      // Bottom left
      - 0.5, -0.5, 0.0, 0.70, 0.50, 0.60, 1.0,
      // Top left    //Colors
      -0.1, -0.1, 0.5, 0.70, 0.50, 0.60, 1.0,
      // Bottom right
      0.5, -0.5, 0.0, 0.70, 0.50, 0.60, 1.0,
      // Top right
      0.9, -0.1, 0.5, 0.70, 0.50, 0.60, 1.0,

      // Bottom left
      - 0.5, -0.5, 0.0, 0.80, 0.20, 0.60, 1.0,
      // Top left    //Colors
      -0.5, 0.5, 0.0, 0.80, 0.20, 0.60, 1.0,
      // Bottom right
      -0.1, -0.1, 0.5, 0.80, 0.20, 0.60, 1.0,
      // Top right
      -0.1, 0.9, 0.5, 0.80, 0.20, 0.60, 1.0,

      // Bottom left
      0.5, -0.5, 0.0, 0.80, 0.50, 0.80, 0.8,
      // Top left    //Colors
      0.5, 0.5, 0.0, 0.80, 0.50, 0.80, 0.8,
      // Bottom right
      0.9, -0.1, 0.5, 0.80, 0.50, 0.80, 0.8,
      // Top right
      0.9, 0.9, 0.5, 0.80, 0.50, 0.80, 0.8,

      // Bottom left
      -0.5, 0.5, 0.0, 0.50, 0.50, 0.60, 0.8,
      // Top left    //Colors
      -0.1, 0.9, 0.5, 0.50, 0.50, 0.60, 0.8,
      // Bottom right
      0.5, 0.5, 0.0, 0.50, 0.50, 0.60, 0.8,
      // Top right
      0.9, 0.9, 0.5, 0.50, 0.50, 0.60, 0.8,

      // Bottom left
      -0.5, -0.5, 0.0, 0.70, 0.50, 0.20, 0.8,
      // Top left    //Colors
      -0.5, 0.5, 0.0, 0.70, 0.50, 0.20, 0.8,
      // Bottom right
      0.5, -0.5, 0.0, 0.70, 0.50, 0.20, 0.8,
      // Top right
      0.5, 0.5, 0.0, 0.70, 0.50, 0.20, 0.8,
    ]

    const triangleVerticesCpuBuffer = new Float32Array(triangleVertices)
    const triangleGeoBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer)

    // * Index buffer section
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)

    const indices: number[] = [
      0, 1, 2,
      1, 2, 3,

      4, 5, 6,
      5, 6, 7,

      8, 9, 10,
      9, 10, 11,

      12, 13, 14,
      13, 14, 15,

      16, 17, 18,
      17, 18, 19,

      20, 21, 22,
      21, 22, 23,
    ]
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

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

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0.08, 0.08, 0.08, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.useProgram(triangleShaderProgram)
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);

    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(
      // index: wich attribute use
      0,
      // size: components,
      3,
      // type:
      gl.FLOAT,
      // normalized
      false,
      // stride,
      7 * Float32Array.BYTES_PER_ELEMENT,
      // offset
      0,
    )

    gl.enableVertexAttribArray(1)
    gl.vertexAttribPointer(
      // index: wich attribute use
      1,
      // size: components,
      4,
      // type:
      gl.FLOAT,
      // normalized
      false,
      // stride,
      7 * Float32Array.BYTES_PER_ELEMENT,
      // offset
      3 * Float32Array.BYTES_PER_ELEMENT,
    )

    gl.bufferData(gl.ARRAY_BUFFER, triangleVerticesCpuBuffer, gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
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
