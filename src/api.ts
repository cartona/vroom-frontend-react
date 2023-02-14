import axios from "axios";
import Payload from "./models/Payload";
import { Solution } from "./models/Solution";

const URL = `${process.env.REACT_APP_VROOM_URL}:${process.env.REACT_APP_VROOM_PORT}`;
type returnType = {
  response?: Solution
  error: boolean;
  errorMessage?: string;
};
export const solve = async (payload: Payload): Promise<returnType> => {
  const res = await axios
    .post(URL, {...payload, options: { g: true }})
    .then((res) => {
      if (res.data.code !== 0 || res.data.error) {
        return { error: true, errorMessage: res.data.error, code: res.data.code };
      }
      return { response: res.data, error: false };
    })
    .catch((err) => {
      const data = err.response.data
      return { error: true, errorMessage: data.error, code: data.code };
    });
  return res;
};
