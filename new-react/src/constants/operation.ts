import { ICurrency } from "./currency";
import { IBaseModel } from "./general";
import { ITag } from "./tag";
import { IType } from "./type";

export interface IOperationBase extends IBaseModel {
  price: number;
  createdAt?: string;
}

export interface IOperationRequest extends IOperationBase {
  type: string;
  currency: string;
  tags: string[];
}

export interface IOperation extends IOperationBase {
  type: IType;
  currency: ICurrency;
  tags: Array<ITag>
}

export interface IOperationStatistic {
  expenseAvg: number 
  expenseSum: number
  incomeAvg: number
  incomeSum: number
}

export interface IOperationsResponse extends IOperationStatistic {
  operations: IOperation[],
}