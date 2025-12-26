"use client";

import { Menu, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MenuBar from "@/components/container/AdminMenu";
import useUser from "@/stores/user";

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

  const { currentUser } = useUser();

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
      <nav className="flex py-2 px-1 items-center justify-between sm:justify-end sm:gap-4 bg-gray-50">
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

        <div className="flex items-center gap-4">
          <span>{currentUser.email}</span>
          <span>{currentUser.fullName}</span>
          <div>
            <button className="cursor-pointer flex items-center justify-center rounded-full bg-blue-300 w-7 h-7">
              <b>{currentUser.fullName.charAt(0).toUpperCase()}</b>
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={divRef}
        className={`w-50 sm:hidden block absolute z-10 transition-all duration-500 h-svh ${
          !openMenu ? "-translate-x-full" : "translate-x-full/2"
        }`}
      >
        <MenuBar />
      </div>
    </div>
  );
}
