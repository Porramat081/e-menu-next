export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-[1000px] min-w-[300px] mx-auto">{children}</div>;
}
