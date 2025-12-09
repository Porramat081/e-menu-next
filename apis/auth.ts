import { axiosInstance } from "@/utils/axiosInstance";

interface AdminBody {
  email: string;
  password: string;
}

export const loginAdmin = async (body: AdminBody) => {
  const res = await (
    await axiosInstance()
  ).post("auth/login", body, { withCredentials: true });
  return res.data;
};

export const getUserById = async () => {
  const res = await (
    await axiosInstance()
  ).get("auth/current-user", { withCredentials: true });
  return res.data?.data;
  // const res = await fetch("http://localhost:8080/api/v1/auth/current-user", {
  //   credentials: "include",
  // });
  // if (res.ok) {
  //   const user = await res.json();
  //   console.log(user);
  // }
  // return res;
};
