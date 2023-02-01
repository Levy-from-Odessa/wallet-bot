<script>
  import { getContext, onMount } from "svelte";
  import operationServices from "../services/operationServices";

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
    const res = await operationServices.post(value);
    telegramBot.sendData(JSON.stringify(value));
  }
</script>

{JSON.stringify(value)}

<Form on:input-value={(e) => (value = e.detail)} {value} />
<button on:click={onSendData}>test</button>

<!-- mounted () {
    console.log(this.$tg.WebAppInitData);
    console.log(this.$tg.WebAppUser);
    this.$tg.MainButton.show()
    this.$tg.MainButton.setParams({
      text: 'Save'
    })
    this.$tg.onEvent('mainButtonClicked', this.onSendData);
    this.$tg.expand()
  },
  beforeDestroy () {
    this.$tg.offEvent('mainButtonClicked', this.onSendData);
  },

  methods: {
    async onSendData() {
      const res = await operationServices.post({
        ...this.value, 
        price: +this.value.price,
        type: '1',
        tags: ['test']
      })
      this.$tg.sendData(JSON.stringify(res))
    }
  }

Vue.prototype.$tg =  window.Telegram.WebApp
  , -->
