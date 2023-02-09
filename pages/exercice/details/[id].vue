<script lang="ts" setup>
import { exercices } from "~/data/exercices";
import { $ot } from "~/utils/objectLocale";
import { usePreferences } from "~~/store/preferences";

const route = useRoute();
const preference = usePreferences();

const id = Number(route.params.id);

const execice = exercices[id];
</script>

<template>
  <div class="page-content">
    <top-bar :title="$ot(execice.name, $i18n.locale)" />

    <p>{{ $ot(execice.description, $i18n.locale) }}</p>

    <ul>
      <li v-if="exercices[id].steps[0] > 0">
        &#8226; {{ $t("breathing.details.inhale_for") }}
        {{ exercices[id].steps[0] }}s;
      </li>

      <li v-if="exercices[id].steps[1] > 0">
        &#8226; {{ $t("breathing.details.hold_for") }}
        {{ exercices[id].steps[1] }}s;
      </li>

      <li v-if="exercices[id].steps[2] > 0">
        &#8226; {{ $t("breathing.details.exhale_for") }}
        {{ exercices[id].steps[2] }}s;
      </li>

      <li v-if="exercices[id].steps[3] > 0">
        &#8226; {{ $t("breathing.details.take_a_rest_for") }}
        {{ exercices[id].steps[3] }}s;
      </li>
    </ul>

    <input
      v-model="preference.repeat"
      type="range"
      min="4"
      max="120"
      class="range range-xs range-info"
    />

    <span>
      {{ $t("breathing.details.the_breathing_will_repeat") }}
      <strong>{{ preference.repeat }}</strong>
      {{ $t("breathing.details.times") }}.
    </span>

    <span class="grid grid-cols-2 gap-4 w-full">
      <button class="btn btn-outline w-full" @click="$router.back()">
        {{ $t("breathing.details.return") }}
      </button>

      <nuxt-link class="btn btn-info w-full" :to="`/exercice/practice/${id}`">
        {{ $t("breathing.details.start_practice") }}
      </nuxt-link>
    </span>
  </div>
</template>
