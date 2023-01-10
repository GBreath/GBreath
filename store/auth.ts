import { User } from "@prisma/client";
import moment from "moment";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { Composer } from "vue-i18n";
import { useAxiosError } from "~~/composables/useAxiosError";
import { useResult } from "~~/composables/useResult";
import { api } from "~~/service/api";
import { useLoading } from "./loading";

type AuthStoreProps = {
  token?: null | string;
  expires_at?: null | Date | moment.Moment;
  user?: null | User;
};

export const useAuthStore = defineStore("auth", {
  state(): AuthStoreProps {
    return {
      token: null,
      expires_at: null,
      user: null,
    };
  },
  actions: {
    async signIn(
      i18n: Composer,
      { email, password }: { email: string; password: string }
    ) {
      const loading = useLoading();
      const router = useRouter();

      loading.hint = i18n.t("alerts.signing");
      loading.open();

      try {
        const res = await api.post("/auth/sign-in", {
          email,
          password,
        });

        const result = useResult(res);

        this.token = result.token;
        this.user = result.user;
        this.expires_at = moment().add(7, "days").toDate();

        api.defaults.headers.common["authorization"] = useToken();

        router.push("/");
        loading.close();
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
        });
      }
    },
    async signUp(
      i18n: Composer,
      {
        name,
        email,
        password,
      }: {
        name: string;
        email: string;
        password: string;
      }
    ) {
      const loading = useLoading();
      const router = useRouter();

      loading.hint = i18n.t("alerts.creating_account");
      loading.open();

      try {
        const res = await api.post("/auth/sign-up", {
          email,
          password,
          name,
        });

        const result = useResult(res);

        this.token = result.token;
        this.user = result.user;
        this.expires_at = moment().add(7, "days").toDate();

        api.defaults.headers.common["authorization"] = useToken();

        router.push("/");
        loading.close();
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
        });
      }
    },
    async signOut() {
      const router = useRouter();

      this.token = null;
      this.user = null;
      this.expires_at = null;

      router.push("/");
    },
    async forgotPassword(i18n: Composer, { email }: { email: string }) {
      const loading = useLoading();
      const router = useRouter();

      loading.hint = i18n.t("alerts.sending_a_reset_email");
      loading.open();

      try {
        const res = await api.post("/auth/forgot-password", {
          email,
        });

        const result = useResult(res);

        Swal.fire({
          icon: "success",
          title: result.message,
          showCancelButton: true,
        });

        router.push("/auth/next-step-forgot-password");

        loading.close();
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
        });
      }
    },
    async resetPassword(
      i18n: Composer,
      {
        resetPasswordToken,
        password,
      }: {
        resetPasswordToken: string;
        password: string;
      }
    ) {
      const loading = useLoading();
      const router = useRouter();

      loading.hint = i18n.t("alerts.reseting_password");
      loading.open();

      try {
        const res = await api.post("/auth/reset-password", {
          token: resetPasswordToken,
          password,
        });

        const result = useResult(res);

        Swal.fire({
          icon: "success",
          title: result.message,
          showCancelButton: true,
          cancelButtonText: "OK",
        });

        loading.close();
        router.push("/auth/sign-in");
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
        });
      }
    },
  },
  persist: true,
});
