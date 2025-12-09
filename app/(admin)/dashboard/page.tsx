"use client";

import { useEffect, useState } from "react";
import useLoading from "@/stores/loader";
import { errorAlert } from "@/utils/alertSwal";
import { getUserById } from "@/apis/auth";
import Loader from "@/components/structure/Loader";
import { useRouter } from "next/navigation";
import { checkAdmin } from "@/utils/checkToken";
import DashboardContainer from "@/components/container/DashboardContainer";

export default function Page() {
  const [] = useState();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const router = useRouter();
  const fetchUser = async () => {
    try {
      startLoading();
      const data = await getUserById();
      if (!checkAdmin(data.roles || [])) {
        router.replace("/auth");
        throw new Error("Unauthorizied user");
      }
    } catch (err) {
      errorAlert("Access Denied", err);
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
        <DashboardContainer />
      )}
    </>
  );
}
