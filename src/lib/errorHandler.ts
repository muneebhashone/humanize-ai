import { AxiosError } from "axios";

export const extractErrorMessage = (error: unknown) => {
  if(error instanceof AxiosError) {
    return error.response?.data?.message || "Something went wrong, please try again.";
  }
  return error instanceof Error ? error.message : "Something went wrong, please try again.";
};