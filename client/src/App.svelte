<script>
  // @ts-nocheck

  import { setContext } from "svelte";

  import Router, { location, link } from "svelte-spa-router";
  import Home from "./routes/home.svelte";
  import Create from "./routes/create.svelte";
  import Income from "./routes/income.svelte";
  import Expense from "./routes/expense.svelte";

  setContext("telegramBot", window.Telegram.WebApp);
</script>

<Router
  routes={{
    "/": Home,
    "/create": Create,
    "/income": Income,
    "/expense": Expense,
  }}
/>
/#{$location}
