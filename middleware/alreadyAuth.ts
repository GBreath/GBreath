import moment from "moment";
import { useAuthStore } from "~~/store/auth";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const router = useRouter();

  if (authStore.token && moment(authStore.expires_at).isAfter(moment())) {
    return router.push("/");
  }
});
