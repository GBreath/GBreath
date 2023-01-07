import { AxiosResponse } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useResult = (result: AxiosResponse<any, any>) => {
  return result.data.result;
};
