import { useCallback, useEffect, useState } from "react";
import UITable from "../components/UITable/Index";
import operationServices from "../services/operationServices";
import { IOperation } from "../constants/operation";

function Home() {
  const [operations, setOperations] = useState<IOperation[]>();
  const [loading, setLoading] = useState<Boolean>(false);

  const fetchOperations = useCallback(async () => { 
    setLoading(true);
    try {
        const data = await operationServices.getItems({dateFrom: "2023/08/01" });
        if (data) setOperations(data.operations);
        
    } catch (error) {
        // Handle error here
    }
    setLoading(false);
  }, [setLoading, setOperations])

  useEffect(() => {
    fetchOperations()
  }, [fetchOperations])

  const cols = [
    {
      name: "date",
      value: (operation: IOperation) => {
        if (!operation.createdAt) return '';
        const fullDate = new Date(operation.createdAt) 
          
        return fullDate.getDate().toString() + '/' + (fullDate.getMonth() + 1).toString()
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
        }, '');
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
    <div className="">
      {
        operations && !loading 
          ? <UITable<IOperation> cols={cols} data={operations}  /> 
          : <div>Loading...</div> 
      }
      HOME
    </div>
  );
}

export default Home;