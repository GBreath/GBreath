import { AxiosError } from "axios";
import Swal from "sweetalert2";

export function useAxiosError(error: AxiosError | unknown, caseOk: () => void) {
  const err = (error as AxiosError)?.response?.data;

  Swal.fire({
    title: "An Unexpected Error Occurred!",
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
