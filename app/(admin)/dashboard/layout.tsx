"use client";
import AdminMenu from "@/components/container/AdminMenu";
import AdminNav from "@/components/container/AdminNav";

import { useEffect, useState } from "react";
import useLoading from "@/stores/loader";
import { errorAlert } from "@/utils/alertSwal";
import { getUserById } from "@/apis/auth";
import Loader from "@/components/structure/Loader";
import { useRouter } from "next/navigation";
import { checkAdmin } from "@/utils/checkToken";
import DashboardContainer from "@/components/container/DashboardContainer";
import useUser from "@/stores/user";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setCurrentUser } = useUser();
  const { isLoading, stopLoading } = useLoading();
  const router = useRouter();

  const fetchUser = async () => {
    try {
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
        if (data.userDto?.id) {
          stopLoading();
        }
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
    <div className="min-w-[300px] min-h-svh mx-auto">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-svh">
          <Loader isPage />
        </div>
      ) : (
        <div className="grid grid-cols-8">
          <div className="col-span-2 hidden sm:block">
            <div className="sticky top-0 h-svh">
              <AdminMenu isMain />
            </div>
          </div>
          <div className="col-span-8 sm:col-span-6">
            <div className="flex flex-col">
              <AdminNav />
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
