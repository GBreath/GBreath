<script lang="ts" setup>
import { useAuthStore } from "~~/store/auth";

const name = ref("");
const email = ref("");
const password = ref("");

const { APP_NAME } = useRuntimeConfig().public;
const authStore = useAuthStore();

async function handleSubmit() {
  await authStore.signUp({
    name: name.value,
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
      <h2 class="page-title pb-0 lg:mt-10">Sign up to {{ APP_NAME }}</h2>

      <form
        class="mt-2 w-full flex flex-col items-start justify-start gap-2"
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
            <span class="label-text">What is your name?</span>
          </label>
          <input
            v-model="name"
            type="text"
            placeholder="Your name..."
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

        <nuxt-link to="/auth/sign-in" class="link"
          >Already have an account, access it.</nuxt-link
        >

        <button class="btn btn-primary self-end w-1/3" type="submit">
          Sign Up
        </button>
      </form>
    </section>
  </div>
</template>
