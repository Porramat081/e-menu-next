import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});
