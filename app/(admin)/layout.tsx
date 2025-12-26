import OrderNotifications from "@/contexts/OrderNotifications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Page",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <OrderNotifications />
      {children}
    </div>
  );
}
