<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useAuthStore } from "~~/store/auth";

const email = ref("");

const authStore = useAuthStore();

const i18n = useI18n();

async function handleSubmit() {
  await authStore.forgotPassword(i18n, {
    email: email.value,
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
        {{ $t("auth.forgot-password.forgot_password") }}
      </h2>

      <form
        class="mt-2 w-full flex flex-col items-start justify-start gap-4"
        @submit.prevent="handleSubmit"
      >
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">
              {{ $t("auth.forgot-password.what_is_your_email") }}
            </span>
          </label>
          <input
            v-model="email"
            type="email"
            :placeholder="$t('auth.forgot-password.your_email')"
            class="input input-bordered w-full"
            required
          />
        </div>

        <button class="btn btn-primary self-end w-1/3" type="submit">
          {{ $t("auth.forgot-password.recover_password") }}
        </button>
      </form>
    </section>
  </div>
</template>
