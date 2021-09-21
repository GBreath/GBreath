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
</script>

<SettingsTopbar />
<div class="settings-page">
  <button
    class="sign-in-with-google"
    on:click="{() => alert('Not working yet!')}">
    <Icon
      icon="flat-color-icons:google"
      style="width: 32px !important; height: 32px !important;" />
    Sync your data with google
  </button>
  <br />
  <br />
  <h3>Set your breathing streak goal</h3>
  <small>Not working yet!</small>
  <br />
  <div class="input-container">
    <input
      type="number"
      name="goal"
      id="goal"
      min="0"
      placeholder="Set here your streak goal" />
    <div>Numbers of days</div>
  </div>
  <br />
  <br />
  <h3>Change your app language</h3>
  <small>Not working yet!</small>
  <br />
  <div class="input-container">
    <select>
      <option value="en">English</option>
      <option value="pt">Português</option>
    </select>
  </div>
</div>
