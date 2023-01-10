<script lang="ts" setup>
import "sweetalert2/src/sweetalert2.scss";
import { useI18n } from "vue-i18n";
import { api } from "./service/api";
import { useAuthStore } from "./store/auth";
import { usePreferences } from "./store/preferences";

const { locale } = useI18n();

const preferences = usePreferences();

const authStore = useAuthStore();

watch(locale, (value) => {
  api.defaults.params = {
    ...api.defaults.params,
    lang: value,
  };

  localStorage.setItem("app-language", value);
  preferences.lang = value;
});

onMounted(() => {
  const savedLanguage = localStorage.getItem("app-language");

  const userLang = navigator.language.split("-")[0];

  if (!savedLanguage) {
    locale.value = userLang;
    localStorage.setItem("app-language", userLang);
  } else {
    locale.value = savedLanguage;
  }

  preferences.lang = locale.value;

  api.defaults.params = {
    ...api.defaults.params,
    lang: locale.value,
    "is-google-auth": authStore.isGoogleAuth,
  };
});

onBeforeMount(() => {
  if (authStore.token) {
    api.defaults.headers.common["authorization"] = useToken();
  }
});

useHead({
  script: [
    {
      src: "https://code.iconify.design/iconify-icon/1.0.0-beta.3/iconify-icon.min.js",
    },
    {
      src: "https://accounts.google.com/gsi/client",
      async: true,
      defer: true,
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
