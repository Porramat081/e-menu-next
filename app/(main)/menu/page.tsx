"use client";

import Banner from "@/components/structure/Banner";
import MenuBar from "@/components/structure/MenuBar";
import NavBar from "@/components/structure/NavBar";

export default function Page() {
  return (
    <div className="grid grid-cols-8">
      <div className="col-span-2 hidden sm:block">
        <MenuBar />
      </div>
      <div className="col-span-8 sm:col-span-6">
        <div className="flex flex-col">
          <NavBar />
          <Banner />
          <h1>menu page</h1>
        </div>
      </div>
    </div>
  );
}
