import axios from "axios";
import { getCookie } from "./cookies";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "";

export const axiosInstance = async () => {
  const token = await getCookie();
  const headers: { Authorization: string } | {} = {};

  if (token) {
    (headers as { Authorization: string }).Authorization = "Bearer " + token;
  }

  return axios.create({
    baseURL: baseUrl,
    timeout: 1200,
    headers,
  });
};
