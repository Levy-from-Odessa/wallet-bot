<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import expenseServices from "../services/expenseServices";
  import operationServices from "../services/operationServices";

  let operations = [];
  let cols = [
    {
      title: "id",
      value: (v) => v.id,
    },
    {
      title: "type",
      value: (v) => v.type.name,
    },
    {
      title: "created",
      value: (v) => v.createdAt,
    },
    {
      title: "tags",
      value: (v) => v.tags.map((t) => t.name).join(", "),
    },
    {
      title: "price",
      value: (v) => v.price,
    },
    {
      title: "currency",
      value: (v) => v.currency.name,
    },
  ];
  onMount(async () => {
    operations = await operationServices.getItems();
  });
</script>

<table>
  <tr>
    {#each cols as col}
      <td>{col.title}</td>
    {/each}
  </tr>
  {#each operations as row}
    <tr>
      {#each cols as col}
        <td>{col.value(row)}</td>
      {/each}
    </tr>
  {/each}
</table>
