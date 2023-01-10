<script lang="ts" setup>
import { useI18n } from "vue-i18n";
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
          min="1"
          max="3650"
          :placeholder="$t('profile.enter_the_value')"
          class="input input-bordered w-full"
        />
        <span>{{ $t("profile.days") }}</span>
      </label>
    </div>

    <button
      class="btn btn-success btn-sm self-end"
      :disabled="
        !goalStore.newGoal || goalStore.newGoal < 1 || goalStore.newGoal > 3650
      "
      @click="handleSaveNewGoal"
    >
      {{ $t("profile.save_the_new_goal") }}
    </button>
  </div>
</template>
