import { MenuItemType } from "@/interfaces/Menu";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function MenuItem(props: MenuItemType) {
  const [num, setNum] = useState<number>(0);

  const handlePlus = () => {
    setNum((prev) => prev + 1);
  };

  const handleMinus = () => {
    setNum((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };
  return (
    <div className="col-span-1 rounded-2xl overflow-clip bg-gray-300 h-auto w-full aspect-square justify-self-center">
      <div className="w-full h-full p-2 rounded-2xl overflow-clip">
        <div className="relative w-full h-full rounded-2xl overflow-clip">
          <Image
            src={props.imageUrl}
            alt={`menu-image`}
            fill
            className="object-cover object-center origin-center"
          ></Image>
        </div>
      </div>
      <div className="py-1 px-2">
        <div>
          <div className="text-sm font-semibold wrap-break-word">
            {props.name}
          </div>
          <div className="text-xs font-medium text-end">
            {props.price.toFixed(2)}
          </div>
        </div>
        <div className="flex justify-center items-center mt-2 mb-1">
          <button
            onClick={handleMinus}
            className="cursor-pointer flex items-center justify-center rounded-full bg-blue-300 w-7 h-7 sm:w-6 sm:h-6"
          >
            <Minus size={14} />
          </button>
          <input
            type="number"
            className="text-center text-xs w-[40%] outline-0"
            value={num}
            onFocus={(e) => {
              if (num == 0) {
                e.target.value = "";
              }
            }}
            onBlur={(e) => {
              if (e.target.value == "") {
                setNum(0);
                e.target.value = "0";
              }
            }}
            onChange={(e) => {
              setNum(Number(e.target.value));
            }}
          />

          <button
            onClick={handlePlus}
            className="cursor-pointer flex items-center justify-center rounded-full bg-blue-300 w-7 h-7 sm:w-6 sm:h-6"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
