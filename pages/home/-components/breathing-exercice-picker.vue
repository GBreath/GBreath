<script lang="ts" setup>
import { exercices } from "~~/data/exercices";
import { $ot } from "~/utils/objectLocale";
</script>

<template>
  <section class="w-full flex flex-col items-center justify-start gap-4 mt-6">
    <h2 class="page-subtitle !text-center">
      {{ $t("home.content.find_a_breathing_exercise_to_practice") }}
    </h2>
    <nuxt-link
      v-for="(exercice, index) of exercices"
      :key="index"
      :to="`/exercice/details/${index}`"
      class="flex flex-row items-center justify-between w-full bg-base-200 p-4 rounded-md"
    >
      <h3 class="text-lg font-medium">
        {{ $ot(exercice.name, $i18n.locale) }}
      </h3>
      <iconify-icon
        width="28"
        icon="material-symbols:chevron-right-rounded"
      ></iconify-icon>
    </nuxt-link>
  </section>
</template>
