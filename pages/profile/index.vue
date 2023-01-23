<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import {
  awards30days,
  awards120orMoreDays,
  awards30to120days,
} from "~~/data/awards";
import { useGoalStore } from "~~/store/goal";

const goalStore = useGoalStore();

const i18n = useI18n();

const handleSaveNewGoal = async () => {
  await goalStore.setNewGoal(i18n);
};

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="page-content">
    <top-bar :title="$t('profile.profile')" />

    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t("profile.enter_your_new_goal") }}</span>
      </label>
      <label class="input-group w-full">
        <input
          v-model="goalStore.newGoal"
          type="number"
          min="7"
          max="3650"
          :placeholder="$t('profile.enter_the_value')"
          class="input input-bordered w-full"
        />
        <span>{{ $t("profile.days") }}</span>
      </label>
    </div>

    <small class="text-red-400" :class="goalStore.newGoal >= 7 && 'hidden'"
      >- Minimo de 7 dias!</small
    >

    <small class="text-red-400" :class="goalStore.newGoal <= 3650 && 'hidden'"
      >- Máximo de 3650 dias!</small
    >

    <button
      class="btn btn-success btn-sm self-end"
      :disabled="
        !goalStore.newGoal || goalStore.newGoal < 7 || goalStore.newGoal > 3650
      "
      @click="handleSaveNewGoal"
    >
      {{ $t("profile.save_the_new_goal") }}
    </button>

    <h3 class="page-subtitle">
      {{ $t("profile.awards_that_your_will_recieve") }}:
    </h3>

    <ul v-if="goalStore.newGoal < 30" class="steps steps-vertical">
      <li
        v-for="(item, index) in awards30days"
        :key="index"
        class="step"
        :class="typeof item.percentage !== 'string' && 'step-info'"
      >
        <span class="flex flex-row items-center justify-center gap-4">
          <img
            class="w-10 h-10 object-cover"
            :class="typeof item.percentage === 'string' && 'opacity-40'"
            :src="`/images/awards/${item.award}.png`"
            :alt="'Image: '"
          />

          <div
            v-if="typeof item.percentage === 'number'"
            class="flex flex-col items-start justify-start"
          >
            <h3 class="text-xl font-bold">
              {{ item.percentage }}% {{ $t("profile.of_the_streak") }}!
            </h3>
            <small>
              {{ $t("profile.you_will_recieve") }}:
              {{ $t(`awards.${item.award}`) }}
            </small>
          </div>

          <h3 v-else class="text-xl font-bold">
            {{ $t("profile.more_than_x_days", { days: item.percentage }) }}!
          </h3>
        </span>
      </li>
    </ul>

    <ul
      v-if="goalStore.newGoal >= 30 && goalStore.newGoal < 120"
      class="steps steps-vertical"
    >
      <li
        v-for="(item, index) in awards30to120days"
        :key="index"
        class="step"
        :class="typeof item.percentage !== 'string' && 'step-info'"
      >
        <span class="flex flex-row items-center justify-center gap-4">
          <img
            class="w-10 h-10 object-cover"
            :class="typeof item.percentage === 'string' && 'opacity-40'"
            :src="`/images/awards/${item.award}.png`"
            :alt="'Image: '"
          />

          <div
            v-if="typeof item.percentage === 'number'"
            class="flex flex-col items-start justify-start"
          >
            <h3 class="text-xl font-bold">
              {{ item.percentage }}% {{ $t("profile.of_the_streak") }}!
            </h3>
            <small>
              {{ $t("profile.you_will_recieve") }}:
              {{ $t(`awards.${item.award}`) }}
            </small>
          </div>

          <h3 v-else class="text-xl font-bold">
            {{ $t("profile.more_than_x_days", { days: item.percentage }) }}!
          </h3>
        </span>
      </li>
    </ul>

    <ul v-if="goalStore.newGoal >= 120" class="steps steps-vertical">
      <li
        v-for="(item, index) in awards120orMoreDays"
        :key="index"
        class="step"
        :class="typeof item.percentage !== 'string' && 'step-info'"
      >
        <span class="flex flex-row items-center justify-center gap-4">
          <img
            class="w-10 h-10 object-cover"
            :class="typeof item.percentage === 'string' && 'opacity-40'"
            :src="`/images/awards/${item.award}.png`"
            :alt="'Image: '"
          />

          <div
            v-if="typeof item.percentage === 'number'"
            class="flex flex-col items-start justify-start"
          >
            <h3 class="text-xl font-bold">
              {{ item.percentage }}% {{ $t("profile.of_the_streak") }}!
            </h3>
            <small>
              {{ $t("profile.you_will_recieve") }}:
              {{ $t(`awards.${item.award}`) }}
            </small>
          </div>

          <h3 v-else class="text-xl font-bold">
            {{ $t("profile.more_than_x_days", { days: item.percentage }) }}!
          </h3>
        </span>
      </li>
    </ul>
  </div>
</template>
