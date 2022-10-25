<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let value;

  const updateValue = (key, event) => {
    dispatch("input", {
      ...value,
      [key]: event.target.value,
    });
  };
</script>

<form class="form">
  <input
    class="input"
    value={value.tags}
    on:input={(e) => updateValue("tags", e)}
    type="text"
  />
  <input
    class="input"
    value={value.currency}
    on:input={(e) => updateValue("currency", e)}
    type="text"
  />
  <input
    class="input"
    value={value.price}
    on:input={(e) => updateValue("price", e)}
    type="number"
  />
</form>

<style>
  .form {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .input {
    width: 100%;
    height: 60px;
    font-size: 35px;
    margin-top: 15px;
  }
</style>
