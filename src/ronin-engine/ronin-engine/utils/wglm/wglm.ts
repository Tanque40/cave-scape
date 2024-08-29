export namespace wglm{
  interface IVec2{
    x: number;
    y: number;
    get vec2(): number[];
  }

  export class Vec2 implements IVec2{
    x: number;
    y: number;
    constructor(x?: number, y?: number){
      this.x = x || 0;
      this.y = y || 0;
    }
    get vec2(): number[]{
      return [this.x, this.y];
    }
  }

  interface IVec3{
    x: number;
    y: number;
    z: number;
    get vec3(): number[];
  }

  export class Vec3 implements IVec3{
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?:number){
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    }

    get vec3(): number[]{
      return [this.x, this.y, this.z];
    }
  }
}
