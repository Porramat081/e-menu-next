"use client";

import EmptyItem from "@/components/items/EmptyItem";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center pt-4 gap-2">
      <EmptyItem message="You Don't Have Any Order Yet" />
      <button
        className="action-btn bg-gray-300 w-[100px]"
        onClick={() => router.replace("/menu")}
      >
        Menu
      </button>
    </div>
  );
}
