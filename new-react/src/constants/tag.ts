import { IBaseModel } from "./general";

export interface ITag extends IBaseModel{
  id: number;
  name: string;
  color: string;
}