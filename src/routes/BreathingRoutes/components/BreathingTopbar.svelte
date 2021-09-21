<style lang="scss">
.breathing-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  h2 {
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

<script lang="ts">
import { techniques } from "@/data/exercises";
import Icon from "@iconify/svelte";
import { Link } from "svelte-navigator";
export let id: number;
export let topbarLabel: "Details" | "Practice";
</script>

<header class="breathing-topbar">
  <h2>{techniques[id].name["en"]} - {topbarLabel}</h2>
  <Link to="{topbarLabel === 'Details' ? '/' : `/breathing/details/${id}`}">
    <Icon
      icon="entypo:chevron-small-left"
      style="width: 32px !important; height: 32px !important;" />
  </Link>
</header>
