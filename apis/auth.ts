import { axiosInstance } from "@/utils/axiosInstance";

interface AdminBody {
  email: string;
  password: string;
}

export const loginAdmin = async (body: AdminBody) => {
  const res = await (await axiosInstance()).post("auth/login", body);
  return res.data;
};

export const getUserById = async (userId: string) => {
  const res = await (await axiosInstance()).get("users/" + userId + "/user");
  return res.data;
};
