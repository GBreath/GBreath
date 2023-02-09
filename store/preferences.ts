import { defineStore } from "pinia";

export const usePreferences = defineStore("preferences", {
  state() {
    return {
      lang: "en",
      vibrate: true,
      repeat: 16,
    };
  },
  persist: true,
});
