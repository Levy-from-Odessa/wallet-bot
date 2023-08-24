<script>
  import { getContext, onMount } from "svelte";
  import operationServices from "../services/operationServices";
  import tagServices from "../services/tagServices";

  import Form from "../lib/Form.svelte";

  const telegramBot = getContext("telegramBot");

  let value = {
    tags: "",
    currency: "",
    price: 0,
  };
  let tags = [];

  onMount(async () => {
    telegramBot.MainButton.show();
    telegramBot.MainButton.setParams({
      text: "Save income",
    });
    telegramBot.onEvent("mainButtonClicked", onSendData);
    telegramBot.expand();

    // @ts-ignore
    tags = await tagServices.getItems();
  });

  async function onSendData() {
    await operationServices.post({
      ...value,
      tags: value.tags.split(","),
      type: "income",
    });
    telegramBot.sendData(JSON.stringify(value));
  }
</script>

<!-- sometimes only one tag added -->
<!-- {JSON.stringify(value)} -->

<Form on:input-value={(e) => (value = e.detail)} {value} {tags} />
<button on:click={onSendData}>Income</button>
