<style lang="scss" scoped>
.settings-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .sign-in-with-google {
    width: min(480px, 100% - 32px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 12px;
    border: 1px solid #666;
    background: transparent;
    border-radius: 16px;
    font-size: 18px;
    filter: none !important;
  }
  .input-container {
    height: 45px;
    width: min(480px, 100% - 32px);
    display: flex;
    align-items: center;
    justify-content: center;
    input,
    select {
      height: 100%;
      width: 100%;
      padding: 12px;
      border-radius: 16px 0 0 16px;
      border: 1px solid #666;
      outline: none;
    }
    select {
      border-radius: 16px;
      cursor: pointer;
    }
    > div {
      height: 100%;
      padding: 12px;
      display: grid;
      place-items: center;
      border-top: 1px;
      border-bottom: 1px;
      border-right: 1px;
      border-left: 0;
      border-color: #666;
      border-style: solid;
      border-radius: 0 16px 16px 0;
      white-space: nowrap;
    }
  }
}
</style>

<script lang="ts">
import Icon from "@iconify/svelte";
import { Link } from "svelte-navigator";
import SettingsTopbar from "./components/SettingsTopbar.svelte";
import { userPreferences, ChangeUserPreference } from "@/utils/userPreferences";
import { locale, _ } from "svelte-i18n";

let langPref = "pt";

function changeLang(e: Event) {
  langPref = (e.target as HTMLInputElement).value;
  ChangeUserPreference.lang(
    (e.target as HTMLInputElement).value as "pt" | "en"
  );
  locale.set((e.target as HTMLInputElement).value);
}

$: {
  langPref = userPreferences.lang;
}
</script>

<SettingsTopbar />
<div class="settings-page">
  {#if false}
    <button
      class="sign-in-with-google"
      on:click="{() => alert(`${$_('settings.not_working_yet')}!`)}">
      <Icon
        icon="flat-color-icons:google"
        style="width: 32px !important; height: 32px !important;" />
      {$_("settings.sync_your_data_with_google")}
    </button>
    <br />
    <br />
    <h3>{$_("settings.set_your_breathing_streak_goal")}</h3>
    <small>{$_("settings.not_working_yet")}!</small>
    <br />
    <div class="input-container">
      <input
        type="number"
        name="goal"
        id="goal"
        min="0"
        placeholder="{$_('settings.set_here_your_streak_goal')}" />
      <div>{$_("settings.numbers_of_days")}</div>
    </div>
    <br />
    <br />
  {/if}
  <h3>{$_("settings.change_your_app_language")}</h3>
  <br />
  <div class="input-container">
    <select on:change="{(e) => changeLang(e)}" bind:value="{langPref}">
      <option value="en">English</option>
      <option value="pt">Português</option>
    </select>
  </div>
</div>
