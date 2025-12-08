"use client";

import { getUserById, loginAdmin } from "@/apis/auth";
import { errorAlert, successAlert } from "@/utils/alertSwal";
import { AxiosError } from "axios";
import { Eye, EyeClosed } from "lucide-react";
import { FormEvent, useState } from "react";
import useLoading from "@/stores/loader";
import Loader from "@/components/structure/Loader";

export default function Page() {
  const [openEye, setOpenEye] = useState(false);
  const [loginObj, setLoginObj] = useState({
    userName: "",
    password: "",
    errorUsername: "",
    errorPassword: "",
  });
  const { startLoading, stopLoading, isLoading } = useLoading();
  const toggleEye = () => {
    setOpenEye((prev) => !prev);
  };
  const validateLoginBody = () => {
    if (!loginObj.userName.trim() || !loginObj.password.trim()) {
      if (!loginObj.userName.trim()) {
        setLoginObj((prev) => ({
          ...prev,
          errorUsername: "username cannot be empty",
        }));
      }
      if (!loginObj.password.trim()) {
        setLoginObj((prev) => ({
          ...prev,
          errorPassword: "password cannot be empty",
        }));
      }
      return false;
    }
    setLoginObj((prev) => ({
      ...prev,
      errorUsername: "",
      errorPassword: "",
    }));
    return true;
  };
  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      startLoading();
      if (validateLoginBody()) {
        const data = await loginAdmin({
          email: loginObj.userName,
          password: loginObj.password,
        });
        if (data.message) {
          successAlert("", data.message);
        }
      }
    } catch (err: AxiosError | unknown) {
      errorAlert("login fail", err);
    } finally {
      stopLoading();
    }
  };
  return (
    <div className="flex flex-col justify-center min-h-svh max-w-[720px] mx-auto">
      <div className="container mx-auto">
        <form className="form-input" onSubmit={handleSubmitLogin}>
          <h2 className="font-bold text-xl text-center mb-2">Admin Login</h2>
          <div>
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) =>
                setLoginObj((prev) => ({ ...prev, userName: e.target.value }))
              }
              className={loginObj.errorUsername && "error-input"}
              type="text"
              id="username"
              placeholder="Enter Username"
            />
          </div>
          {loginObj.errorUsername && (
            <div className="error-div">{loginObj.errorUsername}</div>
          )}
          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                className={loginObj.errorPassword && "error-input"}
                type={openEye ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                onChange={(e) =>
                  setLoginObj((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              <button
                className="cursor-pointer outline-0 absolute top-[50%] -translate-y-[50%] right-4"
                type="button"
                onClick={toggleEye}
              >
                {!openEye ? <EyeClosed size={16} /> : <Eye size={16} />}
              </button>
              {loginObj.errorPassword && (
                <div className="error-div">{loginObj.errorPassword}</div>
              )}
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <button
              type="submit"
              className="flex items-center justify-center action-btn bg-blue-600 text-white py-2! w-[100px]"
            >
              {isLoading ? <Loader /> : <span>Login</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
