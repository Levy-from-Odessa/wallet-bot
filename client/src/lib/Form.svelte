<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let value;
  export let tags;

  const updateValue = (key, event) => {
    dispatch("input-value", {
      ...value,
      [key]: event.target.value,
    });
  };
</script>

<form class="form">
  <div class="input">
    <label for="tags"> Tags </label>
    <input
      name="tags"
      class="input"
      value={value.tags}
      on:input={(e) => updateValue("tags", e)}
      type="text"
    />
  </div>
  <div class="">
    {#each tags as tag}
      <div class="chip">{{ tag.name }}</div>
    {/each}
  </div>
  <div class="input">
    <label for="currency"> Currency </label>
    <input
      name="currency"
      class="input"
      value={value.currency}
      on:input={(e) => updateValue("currency", e)}
      type="text"
    />
  </div>
  <div class="input">
    <label for="price"> Price </label>
    <input
      name="price"
      class="input"
      value={value.price}
      on:input={(e) => updateValue("price", e)}
      type="number"
    />
  </div>
</form>

<style>
  .form {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .input {
    display: block;
    width: 100%;
    font-size: 25px;
    margin-top: 15px;
  }
</style>
