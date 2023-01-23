import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { Composer } from "vue-i18n";
import { api } from "~~/service/api";
import { useLoading } from "./loading";

export const useStreakStore = defineStore("streak", {
  state() {
    return {
      overview: {
        streak: 0,
        goal: 0,
        progress: 0,
        award: "",
        nextaward: "",
      },
    };
  },
  actions: {
    async getOverview(i18n: Composer) {
      const loading = useLoading();

      if (
        this.overview.goal === 0 &&
        this.overview.streak === 0 &&
        this.overview.progress === 0
      ) {
        loading.open();
      }

      loading.hint = i18n.t("alerts.loading_data");

      try {
        const res = await api.get("/record/current-streak");

        this.overview = res.data.result;

        loading.close();
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
        });
      }
    },
    async saveRecord(
      i18n: Composer,
      {
        repetitions,
        exerciceIndex,
      }: { repetitions: number; exerciceIndex: number }
    ) {
      const loading = useLoading();

      loading.open();
      loading.hint = i18n.t("alerts.saving_data");

      try {
        await api.post("/record/store", {
          repetitions: Number(repetitions),
          exerciceIndex: Number(exerciceIndex),
        });

        Swal.fire({
          title: i18n.t(
            "breathing.practice.your_exercice_has_been_successfully_registered"
          ),
          icon: "success",
          timer: 3000,
        });

        loading.close();
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
        });
      }
    },
  },
  persist: true,
});
