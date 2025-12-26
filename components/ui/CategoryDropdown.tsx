"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Check } from "lucide-react";
import { CategoryItem } from "@/stores/category";

interface CategoryDropdownProps {
  items: CategoryItem[] | string[];
  selectedItem: string;
  setSelectedItem: (selectedItem: string) => void;
  isStatus?: boolean;
}

export default function CategoryDropdown(props: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const boxRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: any) => {
    if (
      boxRef.current &&
      !boxRef.current.contains(event.target) &&
      btnRef.current &&
      !btnRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <div className="relative text-left w-full">
        {/* Dropdown button */}
        <button
          ref={btnRef}
          type="button"
          className="flex relative overflow-x-auto justify-between items-center gap-2 w-full
                               rounded-md border border-gray-300
                               shadow-sm px-2 py-5 bg-white text-sm
                               font-medium text-black hover:bg-gray-50"
          onClick={toggleDropdown}
        >
          <p className="absolute w-[80%] overflow-x-auto whitespace-nowrap">
            {props.selectedItem}
          </p>
          <ArrowDown size={16} className="absolute right-2" />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            ref={boxRef}
            className={`origin-top absolute w-full
                                    mt-2 rounded-md
                                    overflow-clip
                                    shadow-lg bg-white ring-1 ring-black
                                    ring-opacity-5 focus:outline-none ${
                                      props.isStatus ? "right-0" : "left-0"
                                    }`}
          >
            {!props.isStatus && (
              <div className="p-1 flex overflow-x-auto!">
                <input
                  type="text"
                  className="text-center overflow-x-auto! rounded-r-none! border-r-0! block max-w-fit whitespace-nowrap"
                  placeholder="new category"
                  id="new-category"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    if (e.currentTarget.previousElementSibling) {
                      props.setSelectedItem(
                        (
                          e.currentTarget
                            .previousElementSibling as HTMLInputElement
                        ).value
                      );
                      (
                        e.currentTarget
                          .previousElementSibling as HTMLInputElement
                      ).value = "";
                    }
                  }}
                  className="p-2 block bg-blue-400 border border-black border-l-0! rounded-r-sm text-white"
                >
                  <Check size={14} />
                </button>
              </div>
            )}
            {props.items.map((item, index) => (
              <button
                type="button"
                onClick={() => {
                  props.setSelectedItem(
                    (item as { name: string }).name || (item as string)
                  );
                  setIsOpen(false);
                }}
                key={index}
                className={`block w-full hover:bg-gray-400 py-1 cursor-pointer ${
                  props.isStatus ? "px-4" : "px-6"
                }`}
              >
                {(item as { name: string }).name || (item as string)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
