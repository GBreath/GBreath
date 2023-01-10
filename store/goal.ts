import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { Composer } from "vue-i18n";
import { api } from "~~/service/api";
import { useLoading } from "./loading";
import { useStreakStore } from "./streak";

export const useGoalStore = defineStore("goal", {
  state() {
    return {
      newGoal: 0,
    };
  },
  actions: {
    async setNewGoal(i18n: Composer) {
      const streakStore = useStreakStore();
      const loading = useLoading();
      const router = useRouter();

      loading.open();
      loading.hint = i18n.t("alerts.changing_data");

      try {
        await api.post("/goal/store", {
          days: Number(this.newGoal),
        });

        Swal.fire(
          i18n.t("profile.your_new_goal_has_been_successfully_changed")
        );

        streakStore.overview.goal = Number(this.newGoal);

        router.push("/");

        loading.close();
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
        });
      }
    },
  },
});
