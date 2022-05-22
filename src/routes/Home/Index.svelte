<style lang="scss" scoped>
.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.home-top {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;
}
</style>

<script lang="ts">
import { _ } from "svelte-i18n";
import BreathingExercisePicker from "./components/BreathingExercisePicker.svelte";
import BreathingOnStressControl from "./components/BreathingOnStressControl.svelte";
import HomeTopbar from "./components/HomeTopbar.svelte";
import StreakOverview from "./components/StreakOverview.svelte";
</script>

<HomeTopbar />
<div class="home-content">
  <div class="home-top">
    <!-- <StreakOverview /> -->
    <BreathingExercisePicker />
    <a href="#stress_control_using_breathing_exercises"
      >{$_("home.learn_more_about_breathing_exercises_benefits")}</a>
  </div>
  <BreathingOnStressControl />
</div>
