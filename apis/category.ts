import { axiosInstance } from "@/utils/axiosInstance";

export const getCategory = async () => {
  const res = await axiosInstance.get("/category/all");
  return res.data;
};
