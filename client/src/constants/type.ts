import { IBaseModel } from "./general";

export interface IType extends IBaseModel{
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};