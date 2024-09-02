export interface IVec1{
  x: number;
  addition(vec1ToAdd: IVec1): IVec1;
  sustraction(vec1ToAdd: IVec1): IVec1;
  scale(scalar: number): IVec1;
}
