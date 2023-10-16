import { useCallback, useEffect, useState } from "react";
import UITable from "../components/UI/UITable/Index";
import operationServices from "../services/operationServices";
import { IOperation } from "../constants/operation";
import DefaultTable from "../components/DefaultTable";
import { Form } from "react-bootstrap";

function Home() {
  const [operations, setOperations] = useState<IOperation[]>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [filters, setFilters] = useState<{tags: string[]}>({tags: []});

  const fetchOperations = async () => { 
    setLoading(true);
    try {
        // const data = await operationServices.getItems({dateFrom: "2023/08/01" });
        const data = await operationServices.getItems({ dateFrom: "2023/08/9", });
        if (data) setOperations(data.operations);
        
    } catch (error) {
        // Handle error here
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchOperations()
  },[])

  return (
    <div className="">
      <div className="">
        <Form.Group className="">
          <Form.Control 
            placeholder="Tags" 
            onInput={(e) => setFilters({...filters, tags: (e.target as HTMLTextAreaElement).value.split(',')})}
            value={filters.tags?.toString() || ''} 
          />
        </Form.Group>
      </div>
      {
        operations && !loading 
          ? <DefaultTable data={operations}  /> 
          : <div>Loading...</div> 
      }
    </div>
  );
}

export default Home;