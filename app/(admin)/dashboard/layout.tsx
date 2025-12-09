import AdminMenu from "@/components/container/AdminMenu";
import AdminNav from "@/components/container/AdminNav";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1000px] min-w-[300px] min-h-svh mx-auto">
      <div className="grid grid-cols-8">
        <div className="col-span-2 hidden sm:block">
          <div className="sticky top-0 h-svh">
            <AdminMenu isMain />
          </div>
        </div>
        <div className="col-span-8 sm:col-span-6">
          <div className="flex flex-col">
            <AdminNav />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
