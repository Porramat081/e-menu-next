import { axiosInstance } from "@/utils/axiosInstance";

export const createOrder = async (orderObj: any) => {
  const res = await axiosInstance.post("/orders/order/create", orderObj);
  return res.data;
};
