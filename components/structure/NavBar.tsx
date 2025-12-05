"use client";

import { Menu, Receipt, Search, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MenuBar from "./MenuBar";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const divRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleClickOutSide = (event: MouseEvent | TouchEvent) => {
    if (
      divRef.current &&
      !divRef.current.contains(event.target as Node) &&
      !btnRef.current?.contains(event.target as Node)
    ) {
      setOpenMenu(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    document.addEventListener("touchstart", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
      document.removeEventListener("touchstart", handleClickOutSide);
    };
  }, [divRef, handleClickOutSide]);

  return (
    <div className="sticky top-0 z-10">
      <nav className="flex py-2 px-1 items-center justify-between sm:justify-around bg-gray-50">
        <div className="sm:hidden block">
          <button
            ref={btnRef}
            onClick={toggleMenu}
            className="block cursor-pointer outline-0"
            title="menu"
          >
            <Menu size={16} />
          </button>
        </div>
        <div className="rounded-lg border flex overflow-clip w-[60%]">
          <input
            type="text"
            placeholder="Search Menu"
            className="outline-none px-2 py-0.5 sm:py-1 text-sm w-full"
          />
          <button className="block cursor-pointer bg-blue-300 px-3 active:text-white">
            <Search size={16} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/cart")}
            className="block cursor-pointer"
          >
            <ShoppingCart size={20} />
          </button>
          <button className="block cursor-pointer">
            <Receipt size={20} />
          </button>
          <div>
            <button className="cursor-pointer flex items-center justify-center rounded-full bg-blue-300 w-7 h-7">
              <b>43</b>
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={divRef}
        className={`sm:hidden block absolute z-10 transition-all duration-500 h-svh ${
          !openMenu ? "-translate-x-full" : "translate-x-full/2"
        }`}
      >
        <MenuBar />
      </div>
    </div>
  );
}
