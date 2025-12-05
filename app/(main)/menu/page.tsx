"use client";

import MenuContainer from "@/components/container/MenuContainer";
import Banner from "@/components/structure/Banner";
import MenuBar from "@/components/structure/MenuBar";
import NavBar from "@/components/structure/NavBar";
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
    <div className="grid grid-cols-8">
      <div className="col-span-2 hidden sm:block">
        <MenuBar isMain />
      </div>
      <div className="col-span-8 sm:col-span-6">
        <div className="flex flex-col">
          <NavBar />
          <Banner />
          <MenuContainer menuItem={mock_list_item} menuCategory={"Promotion"} />
        </div>
      </div>
    </div>
  );
}
