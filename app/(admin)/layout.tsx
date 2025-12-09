import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Page",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="">{children}</div>;
}
