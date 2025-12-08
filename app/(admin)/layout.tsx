export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1000px] min-w-[300px] min-h-svh mx-auto">
      {children}
    </div>
  );
}
