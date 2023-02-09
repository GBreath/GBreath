import { createNuxtPersistedState } from "pinia-plugin-persistedstate/nuxt";
import { useCookie } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(createNuxtPersistedState(useCookie, {}));
});
