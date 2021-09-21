<script lang="ts">
import { Router, Route, globalHistory } from "svelte-navigator";
import Index from "@/routes/Home/Index.svelte";
import Settings from "@/routes/Settings/Index.svelte";
import { userPreferences } from "./utils/userPreferences";
import BreathingDetails from "@/routes/BreathingRoutes/Details/Index.svelte";
import BreathingPractice from "@/routes/BreathingRoutes/Practice/Index.svelte";

document.body.classList.add(userPreferences.theme);
</script>

<Router>
  <main>
    <Route path="/">
      <Index />
    </Route>

    <Route path="settings">
      <Settings />
    </Route>

    <Route path="breathing/*" primary="{false}">
      <Route path="details/:id" primary="{false}" let:params>
        <BreathingDetails query="{params}" />
      </Route>
      <Route path="practice/:id" primary="{false}" let:params>
        <BreathingPractice query="{params}" />
      </Route>
    </Route>
  </main>
</Router>
