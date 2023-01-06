// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@pinia/nuxt"],
  colorMode: {
    preference: "system", // default theme
    dataValue: "theme", // activate data-theme in <html> tag
    classSuffix: "",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["iconify-icon"].includes(tag),
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      APP_NAME: process.env.APP_NAME,
      APP_URL: process.env.APP_URL,
    },
    APP_URL: process.env.APP_URL,
  },
});
