<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  h1 {
    font-size: 24px;
    cursor: pointer;
    user-select: none;
  }
  button {
    display: grid;
    place-items: center;
    border: 0;
    background: transparent;
    cursor: pointer;
  }
}
</style>

<script lang="ts">
import { ChangeUserPreference, userPreferences } from "@/utils/userPreferences";

import Icon from "@iconify/svelte";
import { Link, globalHistory } from "svelte-navigator";

let isDark = true;

if (userPreferences.theme === "light") {
  isDark = false;
}

function changeTheme() {
  if (isDark) {
    ChangeUserPreference.theme("light");
    isDark = false;
  } else {
    ChangeUserPreference.theme("dark");
    isDark = true;
  }
}
</script>

<header>
  <Link to="/settings">
    <Icon icon="bx:bxs-cog" />
  </Link>
  <h1 class="logo" on:click="{() => globalHistory.navigate('/')}">GBreath</h1>
  <button on:click="{() => changeTheme()}">
    {#if isDark}
      <Icon icon="bx:bxs-sun" />
    {/if}
    {#if !isDark}
      <Icon icon="bx:bxs-moon" />
    {/if}
  </button>
</header>
