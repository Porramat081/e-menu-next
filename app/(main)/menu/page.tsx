"use client";

import MenuContainer from "@/components/container/MenuContainer";
import Banner from "@/components/structure/Banner";
import { MenuItemType } from "@/interfaces/Menu";

const mock_item: MenuItemType = {
  imageUrl: "/pic/food1.jpg",
  name: "demo burger",
  price: 0,
};

const mock_list_item = [
  mock_item,
  mock_item,
  mock_item,
  mock_item,
  mock_item,
  mock_item,
  mock_item,
];

export default function Page() {
  return (
    <>
      <Banner />
      <MenuContainer menuItem={mock_list_item} menuCategory={"Promotion"} />
    </>
  );
}
