"use client";

import { getProducts } from "@/apis/product";
import MenuContainer from "@/components/container/MenuContainer";
import Banner from "@/components/structure/Banner";
import { MenuItemType } from "@/interfaces/Menu";
import { ProductFetchType } from "@/interfaces/Product";
import { errorAlert } from "@/utils/alertSwal";
import { useEffect, useState } from "react";

export default function Page() {
  const [menus, setMenus] = useState<MenuItemType[]>([]);
  const fetchMenu = async () => {
    try {
      const res = await getProducts();
      if (res.data.productList && Array.isArray(res.data.productList)) {
        setMenus(
          (res.data.productList as ProductFetchType[]).map((item) => ({
            id: item.id,
            imageUrl: item.images[0]?.downloadUrl?.substring(1),
            name: item.name,
            price: item.price,
          }))
        );
      }
    } catch (err) {
      errorAlert("Fetch Menu Unsuccessfuylly", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <>
      <Banner />
      <MenuContainer menuItem={menus} menuCategory={"Promotion"} />
    </>
  );
}
