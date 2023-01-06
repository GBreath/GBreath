<script lang="ts" setup>
import { exercices } from "~/data/exercices";
const route = useRoute();

const id = Number(route.params.id);

const execice = exercices[id];
</script>

<template>
  <div class="page-content">
    <top-bar title="Breathing" />

    <h3 class="page-subtitle">{{ execice.name.en }}</h3>
  </div>
</template>
