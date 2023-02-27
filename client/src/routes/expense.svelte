<script>
  import { getContext, onMount } from "svelte";
  import expenseServices from "../services/expenseServices";

  import Form from "../lib/Form.svelte";

  const telegramBot = getContext("telegramBot");

  onMount(() => {
    telegramBot.MainButton.show();
    telegramBot.MainButton.setParams({
      text: "Save income",
    });
    telegramBot.onEvent("mainButtonClicked", onSendData);
    telegramBot.expand();
  });

  let value = {
    tags: "",
    currency: "",
    price: 0,
  };

  async function onSendData() {
    await expenseServices.post({
      ...value,
      tags: value.tags.split(","),
      type: "expense",
    });
    telegramBot.sendData(JSON.stringify(value));
  }
</script>

<!-- {JSON.stringify(value)} -->

<Form on:input-value={(e) => (value = e.detail)} {value} />
<button on:click={onSendData}>Expense</button>
