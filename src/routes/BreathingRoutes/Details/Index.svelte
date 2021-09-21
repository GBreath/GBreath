<style lang="scss" scoped>
.breathing-details-page {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.breathing-details {
  width: min(480px, 100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h3,
  p,
  ul,
  ul li {
    align-self: flex-start;
    list-style: none;
  }
  .action-buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    button {
      width: 50%;
      min-height: 45px;
      border-radius: 9999px;
      border: 0;
      font-size: 14px;
      font-weight: 400;
      &.return {
        background: #ffd952;
      }
      &.start {
        background: #72ff88;
      }
    }
  }
}
</style>

<script lang="ts">
import type RouteParams from "svelte-navigator/types/RouteParam";
import { techniques } from "@/data/exercises";
import { globalHistory } from "svelte-navigator";
import BreathingTopbar from "../components/BreathingTopbar.svelte";
export let query: RouteParams;

const idParam = query.id;
const id = Number(idParam);
</script>

<BreathingTopbar topbarLabel="Details" id="{id}" />
<div class="breathing-details-page">
  <section class="breathing-details">
    <h3>What is {techniques[id].name["en"]}?</h3>
    <p>{techniques[id].description["en"]}</p>
    <br />
    <ul class="steps">
      {#if techniques[id].steps[0] > 0}
        <li>&#8226; Inhale for {techniques[id].steps[0]}s;</li>
      {/if}
      {#if techniques[id].steps[1] > 0}
        <li>&#8226; Hold for {techniques[id].steps[1]}s;</li>
      {/if}
      {#if techniques[id].steps[2] > 0}
        <li>&#8226; Exhale for {techniques[id].steps[2]}s;</li>
      {/if}
      {#if techniques[id].steps[3] > 0}
        <li>&#8226; Take a rest for {techniques[id].steps[3]}s;</li>
      {/if}
    </ul>
    <br />
    <br />
    <div class="action-buttons">
      <button class="return" on:click="{() => globalHistory.navigate(`/`)}"
        >Return</button>
      <button
        class="start"
        on:click="{() => globalHistory.navigate(`/breathing/practice/${id}`)}"
        >Start Practice</button>
    </div>
  </section>
</div>
