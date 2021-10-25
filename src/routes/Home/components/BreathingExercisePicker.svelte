<style lang="scss" scoped>
.breathing-exercises-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 477px;
  width: min(380px, 100% - 32px);
  padding: 16px;
  background: #dedede;
  border-radius: 16px;
  h3 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 24px;
    text-align: center;
  }
  .breathing-exercises {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    .breathing-exercise-item {
      background: #c4c4c4;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      min-height: 60px;
      padding: 16px;
      border-radius: 16px;
      gap: 16px;
    }
  }
}
</style>

<script lang="ts">
import { techniques } from "@/data/exercises";
import Icon from "@iconify/svelte";
import { globalHistory } from "svelte-navigator";
import { locale, _ } from "svelte-i18n";
</script>

<section class="breathing-exercises-container">
  <h3>{$_("home.content.find_a_breathing_exercise_to_practice")}</h3>
  <div class="breathing-exercises">
    {#each techniques as technique, index}
      <div
        class="breathing-exercise-item button-like"
        on:click="{() =>
          globalHistory.navigate(`/breathing/details/${index}`)}">
        {technique.name[$locale]}
        <Icon
          icon="carbon:arrow-right"
          style="width: 21px !important; height: 21px !important;" />
      </div>
    {/each}
  </div>
</section>
