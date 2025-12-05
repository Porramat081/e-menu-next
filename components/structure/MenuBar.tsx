import Link from "next/link";

const mock_menu_item = { title: "menu", link: "link" };
const mock_menu_list = [1, 2, 3, 4, 5];

export default function MenuBar({ isMain }: { isMain?: boolean }) {
  return (
    <nav className="flex flex-col px-4 py-2 gap-4 bg-gray-500 overflow-x-auto h-full">
      <div className="px-2 pt-1">
        <h2 className="font-semibold text-md">Menu</h2>
      </div>
      <div className={`flex flex-col gap-4 ${!isMain && "sm:hidden"}`}>
        {mock_menu_list.map((item, index) => (
          <MenuItem
            key={index}
            title={mock_menu_item.title + item}
            link={mock_menu_item.link + item}
          />
        ))}
      </div>
    </nav>
  );
}

interface MenuItemProps {
  title: string;
  link: string;
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <div className="">
      <Link href={props.link}>
        <span className="text-sm text-wrap">{props.title + "gergghriu"}</span>
      </Link>
    </div>
  );
};
