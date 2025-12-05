export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-[800px] min-w-[300px] mx-auto">{children}</div>;
}
