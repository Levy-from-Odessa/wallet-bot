import { useCallback, useEffect, useState } from "react";
import UIForm from "../components/UIForm";
import { ITag } from "../constants/tag";
import tagServices from "../services/tagServices";
import { IOperationRequest } from "../constants/operation";
import { useSearchParams } from "react-router-dom";
import { telegramAPI } from "../constants/telegram";
import UIReceipt from "../components/UIReceipt";

function Create() {
  const [queryParameters] = useSearchParams()
  const defaultOperation: IOperationRequest = {
    id: 0,
    name: '',
    tags: [],
    type: queryParameters.get("type") || 'expense',
    price: 0,
    currency: 'USD'
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

  const showSaveBtn = useCallback(() => {
    telegramAPI.MainButton.show()
    telegramAPI.MainButton.setParams({
      text: 'Save'
    })
    telegramAPI.onEvent('mainButtonClicked', onSend);
    telegramAPI.expand()
  }, [])

  useEffect(() => {
    fetchTags()
  }, [])


  useEffect(() => {
    if (!(value.tags.length && value.price && value.currency)) return 
    showSaveBtn()
  }, [value, showSaveBtn])



  const onSend = () => {
    telegramAPI.sendData(JSON.stringify(value))
  }


  return (
    <div className="">
      <UIForm<IOperationRequest> 
        tags={tags} 
        value={value} 
        onUpdate={setValue}
      />
      <UIReceipt<IOperationRequest> value={value} />
    </div>
  );
}

export default Create;

