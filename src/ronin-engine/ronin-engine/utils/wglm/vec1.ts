import { IVec1 } from "./interface/vec1.interface";

namespace wglm{
  export class Vec1 implements IVec1{
    x: number;
    /**
     * Generate Vec1 vector with given x. Default value 1.0
     * @param {number} x
     */
    constructor(x?: number){
      this.x = x || 1.0;
    }

    /**
     * Add given Vec1 to the original vector
     * @param {Vec1} vec1ToAdd
     * @returns {Vec1} new Vec1 with the addition result
     */
    addition(vec1ToAdd: Vec1): Vec1 {
      return new Vec1(this.x + vec1ToAdd.x);
    }

    sustraction(vec1ToAdd: Vec1): Vec1 {
      throw new Error("Method not implemented.");
    }
    scale(scalar: number): Vec1 {
      throw new Error("Method not implemented.");
    }

  }
}
export {}
