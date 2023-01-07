import moment from "moment";
import { useAuthStore } from "~~/store/auth";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const router = useRouter();

  if (!authStore.token || moment(authStore.expires_at).isBefore(moment())) {
    authStore.signOut();
    return router.push("/auth/sign-in");
  }

  // 1 -> admin
  if (![1].includes(authStore?.user?.role || 3)) {
    return router.push("/dashboard");
  }
});
