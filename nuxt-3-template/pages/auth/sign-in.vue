<script lang="ts" setup>
import { useAuthStore } from "~~/store/auth";

const email = ref("");
const password = ref("");

const { APP_NAME } = useRuntimeConfig().public;
const authStore = useAuthStore();

async function handleSubmit() {
  await authStore.signIn({
    email: email.value,
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
      class="bg-base-200 w-full h-full gap-4 sm:p-8 p-4 rounded-md flex flex-col items-start justify-center"
    >
      <h2 class="page-title pb-0 lg:mt-10">Sign in to {{ APP_NAME }}</h2>

      <form
        class="mt-2 w-full flex flex-col items-start justify-start gap-4"
        @submit.prevent="handleSubmit"
      >
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">What is your email?</span>
          </label>
          <input
            v-model="email"
            type="email"
            placeholder="Your email..."
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">What is your password?</span>
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="Your password..."
            class="input input-bordered w-full"
          />
        </div>

        <div
          class="flex flex-row flex-wrap items-center justify-between w-full gap-2"
        >
          <nuxt-link to="/auth/sign-up" class="link"
            >Does not have an account, create one.</nuxt-link
          >

          <nuxt-link to="/auth/forgot-password" class="link"
            >Forgot your password?</nuxt-link
          >
        </div>

        <button class="btn btn-primary self-end w-1/3" type="submit">
          Sign In
        </button>
      </form>
    </section>
  </div>
</template>
