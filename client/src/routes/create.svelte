<script>
  import Form from "../lib/Form.svelte";

  let value = {
    tags: "",
    currency: "",
    price: 0,
  };
</script>

<!-- markup (zero or more items) goes here -->
<h1>iois</h1>
<Form on:input={(e) => console.log(e)} {value} />

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
<style>
  /* your styles go here */
</style>
