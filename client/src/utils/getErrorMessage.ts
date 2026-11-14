// utils/getErrorMessage.ts
import axios from "axios";

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error ?? "Could not reach the server. Try again.";
  }
  return "Something went wrong. Try again.";
}