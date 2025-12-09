import { AxiosError } from "axios";
import Swal from "sweetalert2";

export const errorAlert = (title?: string, err?: AxiosError | unknown) => {
  let message = (err as { message: string }).message || "Something wrong";
  if (err instanceof AxiosError) {
    message = (err?.response?.data as AxiosError)?.message || "server error";
  }
  return Swal.fire({
    icon: "error",
    title: title || "",
    text: message + " ,please try again",
  });
};

export const successAlert = (title?: string, message?: string) => {
  return Swal.fire({
    icon: "success",
    title,
    text: message,
    timer: 1000,
  });
};
