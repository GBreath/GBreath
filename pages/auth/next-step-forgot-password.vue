<script lang="ts" setup>
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
      class="bg-base-200 w-full h-full gap-4 p-8 rounded-md flex flex-col items-center justify-center"
    >
      <h2 class="page-title pb-0 text-center">
        {{
          $t(
            "auth.next-step-forgot-password.access_your_email_to_see_the_reset_link"
          )
        }}
      </h2>
      <iconify-icon
        icon="emojione:white-heavy-check-mark"
        width="220"
      ></iconify-icon>
      <nuxt-link to="/auth/sign-in" class="btn btn-primary">
        {{ $t("auth.next-step-forgot-password.go_to_login_page") }}
      </nuxt-link>
    </section>
  </div>
</template>
