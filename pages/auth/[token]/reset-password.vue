<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useAuthStore } from "~~/store/auth";

const password = ref("");

const authStore = useAuthStore();
const route = useRoute();

const i18n = useI18n();

const resetPasswordToken = route.params.token;

async function handleSubmit() {
  await authStore.resetPassword(i18n, {
    resetPasswordToken: resetPasswordToken as string,
    password: password.value,
  });
}

definePageMeta({
  layout: "auth",
  middleware: "already-auth",
  pageTransition: {
    name: "slide-fade",
    mode: "out-in",
  },
});
</script>

<template>
  <div class="page-content-auth">
    <section
      class="bg-base-200 w-full h-full gap-4 p-8 rounded-md flex flex-col items-start justify-center"
    >
      <h2 class="page-title pb-0">
        {{ $t("auth.reset-password.reset_your_password") }}
      </h2>

      <form
        class="mt-2 w-full flex flex-col items-start justify-start gap-4"
        @submit.prevent="handleSubmit"
      >
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">
              {{ $t("auth.reset-password.what_is_your_new_password") }}
            </span>
          </label>
          <input
            v-model="password"
            type="password"
            :placeholder="$t('auth.reset-password.your_password')"
            class="input input-bordered w-full"
            required
          />
        </div>

        <button class="btn btn-primary self-end w-1/3" type="submit">
          {{ $t("auth.reset-password.reset_password") }}
        </button>
      </form>
    </section>
  </div>
</template>
