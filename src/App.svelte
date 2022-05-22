<script lang="ts">
import { Router, Route, globalHistory } from "svelte-navigator";
import Index from "@/routes/Home/Index.svelte";
import Settings from "@/routes/Settings/Index.svelte";
import { userPreferences } from "@/utils/userPreferences";
import BreathingDetails from "@/routes/BreathingRoutes/Details/Index.svelte";
import BreathingPractice from "@/routes/BreathingRoutes/Practice/Index.svelte";
import pt from "@/i18n/messages/pt.json";
import en from "@/i18n/messages/en.json";
import { addMessages, init, getLocaleFromNavigator } from "svelte-i18n";

document.body.classList.add(userPreferences.theme);

addMessages("pt", pt);
addMessages("en", en);

$: {
  init({
    fallbackLocale: "pt",
    initialLocale: userPreferences.lang,
  });
}
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
