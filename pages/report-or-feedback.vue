<script lang="ts" setup>
import axios from "axios";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
import { useLoading } from "~~/store/loading";

const i18n = useI18n();

const loading = useLoading();
const router = useRouter();

const name = ref("");
const email = ref("");
const message = ref("");

const handleSubmit = async () => {
  loading.open();
  loading.hint = i18n.t("alerts.sending_message");

  try {
    await axios.post("https://patogordo-admin.netlify.app/api/contact/save", {
      name: name.value,
      message: message.value,
      email: email.value || "anonymous@email.com",
      origin: "GBreath WebSite",
    });

    loading.close();

    await Swal.fire({
      title: i18n.t(
        "report-or-feedback.your_message_has_been_succcessfully_sent"
      ),
      text: `${
        email.value
          ? i18n.t(
              "report-or-feedback.thank_you_for_help_the_GBreath_to_be_better_1"
            )
          : i18n.t(
              "report-or-feedback.thank_you_for_help_the_GBreath_to_be_better_2"
            )
      }`,
      icon: "success",
      allowOutsideClick: false,
      confirmButtonText: i18n.t("buttons.return"),
    });

    router.push("/");
  } catch (error) {
    useAxiosError(error, () => {
      loading.close();
    });
  }
};
</script>

<template>
  <div class="page-content">
    <top-bar
      :title="$t('report-or-feedback.report_error_or_give_a_feedback')"
    />

    <form
      class="w-full flex flex-col items-start justify-start gap-4"
      @submit.prevent="handleSubmit"
    >
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">
            {{ $t("report-or-feedback.what_is_your_name") }}
          </span>
        </label>
        <input
          v-model="name"
          type="text"
          :placeholder="$t('report-or-feedback.type_here')"
          class="input input-bordered w-full"
          required
        />
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">
            {{ $t("report-or-feedback.what_is_your_email") }}
          </span>
        </label>
        <input
          v-model="email"
          type="email"
          :placeholder="
            $t(
              'report-or-feedback.type_here_if_you_want_an_answer_of_your_feedback'
            )
          "
          class="input input-bordered w-full"
        />
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">
            {{ $t("report-or-feedback.what_is_your_message") }}
          </span>
        </label>
        <textarea
          v-model="message"
          :placeholder="
            $t(
              'report-or-feedback.type_here_what_is_your_opinion_sugestions_bug_etc'
            )
          "
          class="textarea textarea-bordered w-full h-[130px]"
          required
        />
      </div>

      <button class="btn btn-success self-end">
        {{ $t("buttons.send_message") }}
      </button>
    </form>
  </div>
</template>
