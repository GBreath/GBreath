import { User } from "@prisma/client";
import moment from "moment";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
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
    async signIn({ email, password }: { email: string; password: string }) {
      const loading = useLoading();
      const router = useRouter();

      loading.hint = "Signing...";
      loading.open();

      try {
        const res = await api.post("/auth/sign-in", {
          email,
          password,
        });

        const result = useResult(res);

        this.token = result.token;
        this.user = result.user;
        this.expires_at = result.expires_at;

        router.push("/dashboard");
        loading.close();
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
        });
      }
    },
    async signUp({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) {
      const loading = useLoading();
      const router = useRouter();

      loading.hint = "Creating account...";
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
        this.expires_at = result.expires_at;

        router.push("/dashboard");
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

      router.push("/auth/sign-in");
    },
    async forgotPassword({ email }: { email: string }) {
      const loading = useLoading();
      const router = useRouter();

      loading.hint = "Sending a reset email...";
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
          cancelButtonText: "OK",
        });
        router.push("/auth/next-step-forgot-password");
        loading.close();
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
        });
      }
    },
    async resetPassword({
      resetPasswordToken,
      password,
    }: {
      resetPasswordToken: string;
      password: string;
    }) {
      const loading = useLoading();
      const router = useRouter();

      loading.hint = "Reseting password...";
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
