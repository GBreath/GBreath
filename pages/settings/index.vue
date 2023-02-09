<script lang="ts" setup>
import { useAuthStore } from "~~/store/auth";
import { usePreferences } from "~~/store/preferences";

const preferences = usePreferences();

const authStore = useAuthStore();
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

    <div class="grid lg:grid-cols-2 grid-cols-1 w-full gap-4">
      <nuxt-link
        to="/report-or-feedback"
        class="sm:flex hidden btn btn-warning w-full"
      >
        {{ $t("alerts.report_errors_or_give_feedback") }}
      </nuxt-link>

      <nuxt-link
        v-if="authStore.token"
        to="/profile"
        class="btn btn-info w-full"
      >
        {{ $t("alerts.looking_for_how_to_change_your_goal") }}
      </nuxt-link>

      <nuxt-link
        to="/report-or-feedback"
        class="sm:hidden flex btn btn-warning w-full"
      >
        {{ $t("alerts.report_errors_or_give_feedback") }}
      </nuxt-link>
    </div>

    <a
      href="https://github.com/GBreath/GBreath"
      target="_blank"
      rel="noopener noreferrer"
      class="btn btn-outline w-full gap-2"
    >
      <iconify-icon icon="mdi:github" width="28"></iconify-icon>
      {{ $t("alerts.contribute_to_the_project_here") }}
    </a>

    <span>
      {{ $t("see_our") }}
      <nuxt-link to="privacy-policy" class="link link-info">
        {{ $t("privacy_policy") }}
      </nuxt-link>
      {{ $t("and") }}
      <nuxt-link to="terms-of-service" class="link link-info">
        {{ $t("terms_of_service") }} </nuxt-link
      >.
    </span>
  </div>
</template>
