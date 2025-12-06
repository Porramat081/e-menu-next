"use client";

import MenuContainer from "@/components/container/MenuContainer";
import Banner from "@/components/structure/Banner";
import { MenuItemType } from "@/interfaces/Menu";

const mock_item = (num: number) => ({
  imageUrl: "/pic/food1.jpg",
  name: "demo burger",
  price: 200,
  id: num.toString(),
});

const mock_list_item = [
  mock_item(1),
  mock_item(2),
  mock_item(3),
  mock_item(4),
  mock_item(5),
  mock_item(6),
  mock_item(7),
];

export default function Page() {
  return (
    <>
      <Banner />
      <MenuContainer menuItem={mock_list_item} menuCategory={"Promotion"} />
    </>
  );
}
