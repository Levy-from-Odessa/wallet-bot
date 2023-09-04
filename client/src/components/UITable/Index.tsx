import { IBaseModel } from "../../constants/general";
import Table from 'react-bootstrap/Table';


interface IProps<T> {
  cols: {name: string, value: string | ((item: T) => string ) }[];
  data: T[];
}

function UITable<T extends IBaseModel>(props: IProps<T>) {
  const {cols, data} = props;

  return (
    <Table striped bordered hover>
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
          <tr>
            {cols.map(({value, name}) => {
                return <td key={item.id +''+ name}>
                  {(typeof value === "string" ? item[value] : value(item))?.toString()}
                </td>;
            })}
          </tr>)
        })}
      </tbody>
    </Table>
  );
}

export default UITable;
