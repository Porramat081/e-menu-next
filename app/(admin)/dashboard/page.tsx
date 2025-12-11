"use client";

import { useEffect, useState } from "react";
import useLoading from "@/stores/loader";
import { errorAlert } from "@/utils/alertSwal";
import { getUserById } from "@/apis/auth";
import Loader from "@/components/structure/Loader";
import { useRouter } from "next/navigation";
import { checkAdmin } from "@/utils/checkToken";
import DashboardContainer from "@/components/container/DashboardContainer";
import useUser from "@/stores/user";

export default function Page() {
  const { setCurrentUser } = useUser();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const router = useRouter();
  const fetchUser = async () => {
    try {
      startLoading();
      const data = await getUserById();
      if (!checkAdmin(data.roles)) {
        router.replace("/auth");
        throw new Error("Unauthorizied user");
      } else {
        const getUser = {
          id: data.userDto?.id || "",
          email: data.userDto?.email || "",
          fullName: data.userDto?.firstName + " " + data.userDto?.lastName,
        };
        setCurrentUser(getUser);
      }
    } catch (err) {
      errorAlert("Access Denied", err);
      router.replace("/auth");
    } finally {
      stopLoading();
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center min-h-svh items-center w-full">
          <div className="flex flex-col gap-2">
            <Loader isPage />
            <div></div>
          </div>
        </div>
      ) : (
        <div className="px-4 py-2">
          <DashboardContainer />
        </div>
      )}
    </>
  );
}
