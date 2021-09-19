<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  h1 {
    font-size: 24px;
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
import { ChangeUserPreference } from "@/utils/userPreferences";

import Icon from "@iconify/svelte";
import { Link } from "svelte-navigator";

let isDark = true;

function changeTheme() {
  isDark = !isDark;
  if (isDark) {
    ChangeUserPreference.theme("light");
  } else {
    ChangeUserPreference.theme("dark");
  }
}
</script>

<header>
  <Link to="/settings">
    <Icon icon="bx:bxs-cog" />
  </Link>
  <h1>GBreath</h1>
  <button on:click="{changeTheme}">
    {#if !isDark}
      <Icon icon="bx:bxs-sun" />
    {:else}
      <Icon icon="bx:bxs-moon" />
    {/if}
  </button>
</header>
