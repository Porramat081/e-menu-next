import Link from "next/link";

const mock_menu_item = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "Product",
    link: "/dashboard/product",
  },
  {
    title: "Order",
    link: "/dashboard/order",
  },
  {
    title: "Customer",
    link: "/dashboard/customer",
  },
  {
    title: "Staff",
    link: "/dashboard/staff",
  },
];

export default function AdminMenu({ isMain }: { isMain?: boolean }) {
  return (
    <nav className="flex flex-col px-4 py-2 gap-4 bg-gray-500 overflow-x-auto min-h-svh">
      <div className="px-2 pt-1">
        <h2 className="font-semibold text-md">Menu</h2>
      </div>
      <div className={`flex flex-col gap-4 ${!isMain && "sm:hidden"}`}>
        {mock_menu_item.map((item, index) => (
          <MenuItem key={index} title={item.title} link={item.link} />
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
      <Link href={props.link} prefetch>
        <span className="text-sm text-wrap">{props.title}</span>
      </Link>
    </div>
  );
};
