<style lang="scss" scoped>
.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
</style>

<script lang="ts">
import BreathingExercisePicker from "./components/BreathingExercisePicker.svelte";
import HomeTopbar from "./components/HomeTopbar.svelte";
import StreakOverview from "./components/StreakOverview.svelte";
</script>

<HomeTopbar />
<div class="home-content">
  <StreakOverview />
  <BreathingExercisePicker />
</div>
