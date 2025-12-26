import { OrderStatus } from "@/interfaces/Product";
import { axiosInstance } from "@/utils/axiosInstance";

export const createOrder = async (orderObj: any) => {
  const res = await axiosInstance.post("/orders/order/create", orderObj);
  return res.data;
};

export const getOrder = async (orderId: string) => {
  const res = await axiosInstance.get("/orders/" + orderId + "/order");
  return res.data;
};

export const getAllOrder = async (from, to) => {
  const res = await axiosInstance.get("/orders/all", {
    params: {
      fromDate: from,
      toDate: to,
    },
    withCredentials: true,
  });
  return res.data;
};

export const deleteOrder = async (orderId: string) => {
  const res = await axiosInstance.delete("/orders/" + orderId + "/delete", {
    withCredentials: true,
  });
  return res.data;
};

export const updateOrderStatus = async (
  orderId: string,
  newOrderStatus: OrderStatus
) => {
  const res = await axiosInstance.put(
    "/orders/" + orderId + "/update",
    { orderStatus: newOrderStatus },
    { withCredentials: true }
  );

  return res.data;
};
