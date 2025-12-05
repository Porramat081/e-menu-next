import { Menu, Receipt, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import MenuBar from "./MenuBar";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  return (
    <div className="relative">
      <nav className="flex py-2 px-1 items-center justify-between sm:justify-around">
        <div className="sm:hidden block">
          <button
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
          <button className="block cursor-pointer">
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
        className={`sm:hidden block absolute z-10 transition-all duration-500 ${
          !openMenu ? "-translate-x-full" : "translate-x-full/2"
        }`}
      >
        <MenuBar />
      </div>
    </div>
  );
}
