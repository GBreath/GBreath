<script lang="ts" setup>
import { useStreakStore } from "~/store/streak";
import { getNextAward } from "~/utils/getNextAward";

const streakStore = useStreakStore();

const nextAward = ref(
  getNextAward(streakStore.overview.goal, streakStore.overview.progress)
);

streakStore.$subscribe(() => {
  nextAward.value = getNextAward(
    streakStore.overview.goal,
    streakStore.overview.progress
  );
});
</script>

<template>
  <input id="awards-modal" type="checkbox" class="modal-toggle" />

  <label for="awards-modal" class="modal cursor-pointer w-full">
    <label class="modal-box relative" for="">
      <h3 class="text-lg font-bold text-center">
        {{ $t("awards.awards_overview") }}!
      </h3>

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

      <div class="flex sm:flex-row flex-col gap-4 w-full h-full mt-4">
        <div
          class="w-full h-full flex flex-col items-center justify-center gap-4 text-center"
        >
          <h3 class="font-bold">{{ $t("awards.your_current_award") }}</h3>

          <img
            class="w-1/3 h-1/3 object-cover"
            :src="`/images/awards/${streakStore.overview.award}.png`"
            :alt="'Image: ' + $t(`awards.${streakStore.overview.award}`)"
          />

          <span class="font-light">
            {{ $t(`awards.${streakStore.overview.award}`) }}
          </span>
        </div>

        <div
          class="w-full h-full flex flex-col items-center justify-center gap-4 text-center"
        >
          <h3 class="font-bold">{{ $t("awards.your_next_award") }}</h3>

          <img
            class="w-1/3 h-1/3 object-cover"
            :src="`/images/awards/${nextAward.img}.png`"
            :alt="'Image: ' + $t(`awards.${nextAward.img}`)"
          />

          <span class="font-light"
            >{{ $t(`awards.${nextAward.img}`) }}
            {{ nextAward.percentage }}%</span
          >
        </div>
      </div>

      <div class="modal-action">
        <label for="awards-modal" class="btn btn-sm">
          {{ $t("buttons.close") }}
        </label>
      </div>
    </label>
  </label>
</template>
