import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { $ot } from "~/utils/objectLocale";
import { an_unexpected_error_occurred } from "~/plugins/i18n";
import { usePreferences } from "~~/store/preferences";

export function useAxiosError(error: AxiosError | unknown, caseOk: () => void) {
  const err = (error as AxiosError)?.response?.data;

  const preferences = usePreferences();

  Swal.fire({
    title: $ot(an_unexpected_error_occurred, preferences.lang || "en"),
    text: (err as { message: string }).message,
    icon: "error",
    showCancelButton: true,
  }).then((res) => {
    if (res.dismiss) {
      caseOk();
    }

    if (res.isConfirmed) {
      caseOk();
    }

    if (res.isDismissed) {
      caseOk();
    }

    if (res.isDenied) {
      caseOk();
    }
  });
}
