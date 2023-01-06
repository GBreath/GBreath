import { useAuthStore } from "~~/store/auth";

export function useToken() {
  const authStore = useAuthStore();

  return "Bearer " + authStore.token;
}
