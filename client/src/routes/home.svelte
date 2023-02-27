<script>
  import { onMount } from "svelte";
  import expenseServices from "../services/expenseServices";
  import operationServices from "../services/operationServices";

  let operations;
  onMount(async () => {
    operations = await operationServices.getItems();
  });
</script>

{JSON.stringify(operations)}
