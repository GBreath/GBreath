import { defineStore } from "pinia";

export const usePreferences = defineStore("preferences", {
  state() {
    return {
      vibrate: true,
      repeat: 16,
    };
  },
  persist: true,
});
