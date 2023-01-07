<script lang="ts" setup>
import "sweetalert2/src/sweetalert2.scss";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

watch(locale, (value) => {
  localStorage.setItem("app-language", value);
});

onMounted(() => {
  locale.value = localStorage.getItem("app-language") || "en";
});

useHead({
  script: [
    {
      src: "https://code.iconify.design/iconify-icon/1.0.0-beta.3/iconify-icon.min.js",
    },
  ],
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Fredoka+One&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    },
  ],
});
</script>

<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<style lang="scss">
@import "~~/styles/style.scss";
</style>
