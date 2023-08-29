import { useCallback, useEffect, useState } from "react";
import UIForm from "../components/UIForm";
import { ITag } from "../constants/tag";
import tagServices from "../services/tagServices";
import { IOperation, IOperationRequest } from "../constants/operation";

function Create() {
  const [tags, setTags] = useState<ITag[]>();
  const [value, setValue] = useState<IOperationRequest>(
{
    id: 0,
    name: '',
    tags: ['test', 'test2'],
    type: 'income',
    price: 0,
    currency: 'USD'
  }
  );

  const fetchTags = useCallback(async () => { 
    try {
        const data = await tagServices.getItems();
        if (data) setTags(data);
        
    } catch (error) {
        // Handle error here
    }
  }, [setTags])

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  const onUpdate = (value: IOperationRequest) => {
    console.log(value);
    
    setValue(value)
  }


  return (
    <div className="">
      <UIForm<IOperationRequest> 
        tags={tags} 
        value={value} 
        onUpdate={onUpdate}
      />
    </div>
  );
}

export default Create;

// mounted () {
//     console.log(this.$tg.WebAppInitData);
//     console.log(this.$tg.WebAppUser);
//     this.$tg.MainButton.show()
//     this.$tg.MainButton.setParams({
//       text: 'Save'
//     })
//     this.$tg.onEvent('mainButtonClicked', this.onSendData);
//     this.$tg.expand()
//   },
//   beforeDestroy () {
//     this.$tg.offEvent('mainButtonClicked', this.onSendData);
//   },

//   methods: {
//     async onSendData() {
//       const res = await operationServices.post({
//         ...this.value, 
//         price: +this.value.price,
//         type: '1',
//         tags: ['test']
//       })
//       this.$tg.sendData(JSON.stringify(res))
//     }
//   }

// Vue.prototype.$tg =  window.Telegram.WebApp




// CREATE
  // onMount(async () => {
  //   telegramBot.MainButton.show();
  //   telegramBot.MainButton.setParams({
  //     text: "Save income",
  //   });
  //   telegramBot.onEvent("mainButtonClicked", onSendData);
  //   telegramBot.expand();

  //   // @ts-ignore
  //   tags = await tagServices.getItems();
  // });

  // async function onSendData() {
  //   await operationServices.post({
  //     ...value,
  //     tags: value.tags.split(","),
  //     type: "income",
  //   });
  //   telegramBot.sendData(JSON.stringify(value));
  // }