export interface IBaseModel {
  id?: number, 
  [key: string]: string | number | string[] | number[] | IBaseModel[] | IBaseModel | undefined,
}