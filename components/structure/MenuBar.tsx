import Link from "next/link";

const mock_menu_item = { title: "menu", link: "link" };
const mock_menu_list = [1, 2, 3, 4, 5];

export default function MenuBar() {
  return (
    <nav className="flex flex-col px-4 py-2 gap-4 bg-gray-200 h-full">
      <div className="px-2 pt-1">
        <h2 className="font-semibold text-md">Menu</h2>
      </div>
      <div className="flex flex-col sm:hidden gap-4">
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
        <span className="text-sm">{props.title + "gergregregnreiughriu"}</span>
      </Link>
    </div>
  );
};
