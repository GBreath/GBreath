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
.breathing-repetition-setting {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  gap: 8px;
  input {
    width: 100%;
  }
}
</style>

<script lang="ts">
import type RouteParams from "svelte-navigator/types/RouteParam";
import { techniques } from "@/data/exercises";
import { globalHistory } from "svelte-navigator";
import BreathingTopbar from "../components/BreathingTopbar.svelte";
import { ChangeUserPreference, userPreferences } from "@/utils/userPreferences";
import { locale, _ } from "svelte-i18n";
export let query: RouteParams;

const idParam = query.id;
const id = Number(idParam);
let repeatTimes = userPreferences.defaultBreathingRepeat;

function changeRepeatTimeAndSave() {
  ChangeUserPreference.defaultBreathingRepeat(repeatTimes);
}
</script>

<BreathingTopbar topbarLabel="Details" id="{id}" />
<div class="breathing-details-page">
  <section class="breathing-details">
    <h3>{$_("breathing.details.what_is")} {techniques[id].name[$locale]}?</h3>
    <p>{techniques[id].description[$locale]}</p>
    <br />
    <ul class="steps">
      {#if techniques[id].steps[0] > 0}
        <li>
          &#8226; {$_("breathing.details.inhale_for")}
          {techniques[id].steps[0]}s;
        </li>
      {/if}
      {#if techniques[id].steps[1] > 0}
        <li>
          &#8226; {$_("breathing.details.hold_for")}
          {techniques[id].steps[1]}s;
        </li>
      {/if}
      {#if techniques[id].steps[2] > 0}
        <li>
          &#8226; {$_("breathing.details.exhale_for")}
          {techniques[id].steps[2]}s;
        </li>
      {/if}
      {#if techniques[id].steps[3] > 0}
        <li>
          &#8226; {$_("breathing.details.take_a_rest_for")}
          {techniques[id].steps[3]}s;
        </li>
      {/if}
    </ul>
    <script type="text/javascript">
    atOptions = {
      key: "e79c7b08eac11ce7ca416ad5fd9b499c",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };
    document.write(
      "<scr" +
        'ipt type="text/javascript" src="http' +
        (location.protocol === "https:" ? "s" : "") +
        '://www.effectivedisplayformats.com/e79c7b08eac11ce7ca416ad5fd9b499c/invoke.js"></scr' +
        "ipt>"
    );
    </script>
    <br />
    <br />
    <div class="breathing-repetition-setting">
      <input
        type="range"
        min="8"
        max="120"
        on:change="{() => changeRepeatTimeAndSave()}"
        bind:value="{repeatTimes}" />
      <span
        >{$_("breathing.details.the_breathing_will_repeat")}
        <strong>{repeatTimes}</strong>
        {$_("breathing.details.times")}.</span>
    </div>
    <br />
    <div class="action-buttons">
      <button class="return" on:click="{() => globalHistory.navigate(`/`)}"
        >{$_("breathing.details.return")}</button>
      <button
        class="start"
        on:click="{() => globalHistory.navigate(`/breathing/practice/${id}`)}"
        >{$_("breathing.details.start_practice")}</button>
    </div>
  </section>
</div>
