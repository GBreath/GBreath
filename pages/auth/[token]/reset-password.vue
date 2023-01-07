<script lang="ts" setup>
import { useAuthStore } from "~~/store/auth";

const password = ref("");

const authStore = useAuthStore();
const route = useRoute();

const resetPasswordToken = route.params.token;

async function handleSubmit() {
  await authStore.resetPassword({
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
      <h2 class="page-title pb-0">Reset your password</h2>

      <form
        class="mt-2 w-full flex flex-col items-start justify-start gap-4"
        @submit.prevent="handleSubmit"
      >
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">What is your new password?</span>
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="Your password..."
            class="input input-bordered w-full"
          />
        </div>

        <button class="btn btn-primary self-end w-1/3" type="submit">
          Reset password
        </button>
      </form>
    </section>
  </div>
</template>
