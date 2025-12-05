import { Menu, Receipt, Search, ShoppingCart } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="flex py-2 px-1 items-center justify-between">
      <div>
        <button className="block cursor-pointer" title="menu">
          <Menu size={16} />
        </button>
      </div>
      <div className="rounded-lg border flex overflow-clip">
        <input
          type="text"
          placeholder="Search Menu"
          className="outline-none px-2 py-1 text-sm"
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
      </div>
      <div>
        <button className="cursor-pointer flex items-center justify-center rounded-full bg-blue-300 w-7 h-7">
          <b>43</b>
        </button>
      </div>
    </nav>
  );
}
