<script lang="ts" setup>
import HomeTopBar from "./-components/home-top-bar.vue";
import BreathingExercicePicker from "./-components/breathing-exercice-picker.vue";
import StreakOverview from "./-components/streak-overview.vue";
</script>

<template>
  <main class="page-content items-center justify-center">
    <home-top-bar />
    <streak-overview />
    <breathing-exercice-picker />
  </main>
</template>
