<script>
  // @ts-ignore
  import Router, { location, link } from "svelte-spa-router";
  import Create from "./routes/create.svelte";
</script>

123
<Router
  routes={{
    "/create": Create,
  }}
/>
