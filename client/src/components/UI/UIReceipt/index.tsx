import { IBaseModel } from "../../../constants/general";
import './styles.css';

interface IProps<T>{
  value: T
}

function UIReceipt<T extends IBaseModel>({value}: IProps<T>) {
  if (!value.price || !value.tags) {
    return null
  }

  return ( 
    <div className="receipt">
      <div className="receipt-tags">{value.tags?.toString()}</div>
      <div className="">
        {value.type === 'expense' ? '-' : '+'}
        {value.price?.toString()} {value.currency?.toString()}
      </div>
    </div>
  )
}


export default UIReceipt;