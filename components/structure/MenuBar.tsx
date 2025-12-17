"use client";

import { useCallback, useEffect } from "react";
import { errorAlert } from "@/utils/alertSwal";
import useCategory from "@/stores/category";
import { getCategory } from "@/apis/category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MenuBar({ isMain }: { isMain?: boolean }) {
  const { setCategoryItems, categoryItems } = useCategory();

  const fetchCategory = async () => {
    try {
      const res = await getCategory();
      if (res.data && res.data?.length > 0) {
        setCategoryItems(res.data as []);
      }
    } catch (err) {
      setCategoryItems([]);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <nav className="flex flex-col px-4 py-2 gap-4 bg-gray-500 overflow-x-auto min-h-svh">
      <div className="px-2 pt-1">
        <h2 className="font-semibold text-md">Menu</h2>
      </div>
      <div className={`flex flex-col gap-4 ${!isMain && "sm:hidden"}`}>
        <MenuItem title="Home" />
        {categoryItems.map((item, index) => (
          <MenuItem key={index} title={item.name} />
        ))}
      </div>
    </nav>
  );
}

interface MenuItemProps {
  title: string;
}

const MenuItem = (props: MenuItemProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.append(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const handleClick = () => {
    if (props.title.toLowerCase() === "home") {
      router.push(pathname);
    } else {
      router.push(pathname + "?" + createQueryString("category", props.title));
    }
  };

  return (
    <div className="">
      <button onClick={handleClick}>
        <span className="text-sm text-wrap">{props.title}</span>
      </button>
    </div>
  );
};
