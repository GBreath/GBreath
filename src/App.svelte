<script lang="ts">
import { Router, Route } from "svelte-navigator";
import Index from "@/routes/Home/Index.svelte";
import Settings from "@/routes/Settings/Index.svelte";
import { userPreferences } from "./utils/userPreferences";

document.body.classList.add(userPreferences.theme);
</script>

<Router>
  <main>
    <Route path="/">
      <Index />
    </Route>

    <Route path="/settings">
      <Settings />
    </Route>
  </main>
</Router>
