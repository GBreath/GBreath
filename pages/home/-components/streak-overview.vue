<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useAuthStore } from "~~/store/auth";
import { useStreakStore } from "~~/store/streak";

const authStore = useAuthStore();
const streakStore = useStreakStore();

const i18n = useI18n();

const chooseTheCorrectLabel = (quantity: number) => {
  if (quantity <= 1) {
    return i18n.t("home.streak.day");
  }

  if (quantity >= 1) {
    return i18n.t("home.streak.days");
  }
};

onMounted(async () => {
  if (authStore.token) {
    await streakStore.getOverview(i18n);
  }
});
</script>

<template>
  <div
    v-if="authStore.token"
    class="flex flex-col w-full items-center justify-center"
  >
    <div class="gap-2 flex flex-row items-center justify-between w-full h-full">
      <div
        class="flex flex-col items-center justify-center w-full h-24 card bg-base-200 rounded-box"
      >
        <h4 class="text-xl font-bold">
          {{ streakStore.overview.goal }}
          <span class="text-lg">
            {{ chooseTheCorrectLabel(streakStore.overview.goal) }}
          </span>
        </h4>
        <small class="uppercase text-xs font-light">
          {{ $t("home.streak.YOURGOAL") }}
        </small>
      </div>
      <div class="w-[1px] h-16 bg-base-200"></div>
      <div
        class="flex flex-col items-center justify-center h-24 w-full card bg-base-200 rounded-box"
      >
        <h4 class="text-xl font-bold">
          {{ streakStore.overview.streak }}
          <span class="text-lg">
            {{ chooseTheCorrectLabel(streakStore.overview.streak) }}
          </span>
        </h4>
        <small class="uppercase text-xs font-light">
          {{ $t("home.streak.YOURSTREAK") }}
        </small>
      </div>
    </div>
    <span
      class="whitespace-nowrap w-full mt-4 flex flex-row items-center justify-start gap-2"
    >
      <span class="text-xs font-medium"
        >{{ Number(streakStore.overview.progress).toFixed(2) }}% / 100%</span
      >
      <progress
        class="progress progress-info w-full"
        :value="streakStore.overview.progress"
        max="100"
      ></progress>
    </span>
  </div>

  <nuxt-link
    v-else
    to="/auth/sign-in"
    class="flex flex-row items-center justify-between w-full border border-base-content p-4 rounded-md"
  >
    <h3 class="text-lg font-medium">
      {{ $t("home.sign_in_to_access_streak_tracker") }}
    </h3>
    <iconify-icon width="28" icon="ph:sign-in-bold"></iconify-icon>
  </nuxt-link>
</template>
