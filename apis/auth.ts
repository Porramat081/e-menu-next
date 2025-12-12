import { axiosInstance } from "@/utils/axiosInstance";

interface AdminBody {
  email: string;
  password: string;
}

export const loginAdmin = async (body: AdminBody) => {
  const res = await axiosInstance.post("auth/login", body, {
    withCredentials: true,
  });
  return res.data;
};

export const getUserById = async () => {
  const res = await axiosInstance.get("auth/current-user", {
    withCredentials: true,
  });
  return res.data?.data;
};
