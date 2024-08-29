import { IMat4 } from "./interface/i-mat4.interface";

export namespace wglm{
  export class Mat4 implements IMat4{
    matrix: Array<Array<Number>>;
    /*
     * Creates a 4x4 matrix with diagonal of scalar value
     * @param scalar
     */
    constructor(scalar: number){
      this.matrix = [
        [scalar, 0.0, 0.0, 0.0],
        [0.0, scalar, 0.0, 0.0],
        [0.0, 0.0, scalar, 0.0],
        [0.0, 0.0, 0.0, scalar]
      ]
    }

    get mat():Array<Array<Number>>{
      return this.matrix;
    }
  }
}
