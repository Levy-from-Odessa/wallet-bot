import { useCallback, useEffect, useState } from "react";
import UIForm from "../components/UI/UIForm";
import { ITag } from "../constants/tag";
import tagServices from "../services/tagServices";
import { IOperationRequest } from "../constants/operation";
import { useSearchParams } from "react-router-dom";
import { telegramAPI } from "../constants/telegram";
import UIReceipt from "../components/UI/UIReceipt";
import operationServices from "../services/operationServices";

function Create() {
  const [queryParameters] = useSearchParams()
  const defaultOperation: IOperationRequest = {
    // id: 0,
    tags: [],
    type: queryParameters.get("type") || 'expense',
    price: 0,
    currency: 'USD',
    createdAt: ''
  }
  const [tags, setTags] = useState<ITag[]>();
  const [value, setValue] = useState<IOperationRequest>(defaultOperation);

  const fetchTags = useCallback(async () => { 
    try {
        const data = await tagServices.getItems();
        if (data) setTags(data);
        
    } catch (error) {
        // Handle error here
    }
  }, [])

  const onSend = useCallback(async() => {
    // console.log(new Date(value.createdAt + ':15:00').toDateString());
    
    const operation = await operationServices.post({
      ...value,
      tags: value.tags.filter(Boolean),
      ...(value.createdAt ? {date: new Date('2023-' + value.createdAt + ':15:00').toDateString()} : {})
    })

    setValue(defaultOperation)
    

    telegramAPI.sendData(JSON.stringify(operation))
  }, [value])

  const showSaveBtn = useCallback(() => {
    telegramAPI.MainButton.show()
    telegramAPI.MainButton.setParams({
      text: 'Save'
    })
    telegramAPI.onEvent('mainButtonClicked', onSend);
    telegramAPI.expand()
  }, [onSend])

  useEffect(() => {
    fetchTags()
  }, [])


  useEffect(() => {
    if (!(value.tags.length && value.price && value.currency)) return 
    showSaveBtn()
  }, [value, showSaveBtn])



  return (
    <div className="">
      <UIForm<IOperationRequest> 
        tags={tags} 
        value={value} 
        onUpdate={setValue}
      />
      <UIReceipt<IOperationRequest> value={value} />
      <button onClick={onSend}>send</button>
    </div>
  );
}

export default Create;

