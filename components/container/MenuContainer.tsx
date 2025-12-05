import { MenuItemType } from "@/interfaces/Menu";
import Image from "next/image";
import MenuItem from "../items/MenuItem";

interface MenuContainerProps {
  menuItem: MenuItemType[];
  menuCategory: string;
}

export default function MenuContainer(props: MenuContainerProps) {
  return (
    <div className="px-4">
      <div>
        <h2>{props.menuCategory}</h2>
      </div>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
        {props.menuItem.map((item, index) => (
          <MenuItem {...item} key={index} />
        ))}
      </div>
    </div>
  );
}
