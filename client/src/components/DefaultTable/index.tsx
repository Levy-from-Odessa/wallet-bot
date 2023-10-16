import { IOperation } from "../../constants/operation";
import UITable from "../UI/UITable/Index";

interface DefaultTableProps {
  data: IOperation[]
}
 
function DefaultTable(props: DefaultTableProps) {
  const cols = [
    {
      name: "id",
      value: 'id'
    },
    {
      name: "date",
      value: (operation: IOperation) => {
        if (!operation.createdAt) return '';
        const fullDate = new Date(operation.createdAt) 
          
        return fullDate.getDate().toString() + '/' + (fullDate.getMonth() + 1).toString() + '/' + fullDate.getFullYear().toString();
      }
    },
    {
      name: "type",
      value: (operation: IOperation) => {
        return operation.type.name;
      }
    },
    {
      name: "tags",
      value: (operation: IOperation) => {
        return operation.tags.reduce((acc, tag, index) => {
          return acc + tag.name + ( index < operation.tags.length - 1 ? ", " : "");
        }, '')
      }
    },
    {
      name: "price",
      value: (operation: IOperation) => {
        return operation.price + ' ' + operation.currency.name;
      }
    },
  ];
  return ( 
      <UITable<IOperation> cols={cols} data={props.data}  /> 
   );
}
 
export default DefaultTable;