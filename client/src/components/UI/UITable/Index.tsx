import { IBaseModel } from "../../../constants/general";
import Table from 'react-bootstrap/Table';
import './styles.scss';


interface IProps<T> {
  cols: {name: string, value: string | ((item: T) => string ) }[];
  data: T[];
}

function UITable<T extends IBaseModel>(props: IProps<T>) {
  const {cols, data} = props;

  const getCol = (item: T, value: string | ((item: T) => string)) => {
    const colValue = typeof value === "string" 
      ? item[value]
      : value(item);
    
      const colValueArr = `${colValue}`?.split(',')


    if (colValueArr.length > 1 ){
      return (<ul>
        {colValueArr.map((str: string) => {
          return <li>{str}</li>
        })}
      </ul>)
    }

    return <span>{colValue?.toString()}</span> 

  }

  return (
    <Table striped bordered hover className="table">
      <thead>
        <tr>
          {cols.map(({name}) => {
              return <th key={name}>{name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
          <tr className="table_row">
            {cols.map(({value, name}) => {
                return <td className="table_item" key={item.id +''+ name}>
                  {getCol(item, value)}
                </td>
            })}
          </tr>)
        })}
      </tbody>
    </Table>
  );
}

export default UITable;
