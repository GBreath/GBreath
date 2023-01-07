<script lang="ts" setup>
import { usePreferences } from "~~/store/preferences";

const preferences = usePreferences();
</script>

<template>
  <div class="page-content">
    <top-bar :title="$t('settings.settings')" />

    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">
          {{ $t("settings.change_your_app_language") }}
        </span>
      </label>
      <select v-model="$i18n.locale" class="select select-bordered">
        <option disabled selected>
          {{ $t("settings.change_your_app_language") }}
        </option>
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
    </div>

    <div class="flex flex-col w-full">
      <div class="form-control w-full">
        <label class="cursor-pointer label">
          <span class="label-text">
            {{ $t("settings.allow_vibration") }}
          </span>
          <input
            v-model="preferences.vibrate"
            type="checkbox"
            class="toggle toggle-info toggle-lg"
          />
        </label>
      </div>
      <div class="form-control w-full">
        <label class="cursor-pointer label">
          <span class="label-text">
            {{ $t("settings.enable_dark_mode") }}
          </span>
          <input
            type="checkbox"
            class="toggle toggle-info toggle-lg"
            :checked="$colorMode.preference === 'dark'"
            @click="
              $colorMode.value === 'dark'
                ? ($colorMode.preference = 'light')
                : ($colorMode.preference = 'dark')
            "
          />
        </label>
      </div>
    </div>
  </div>
</template>
