import MenuBar from "@/components/structure/MenuBar";
import NavBar from "@/components/structure/NavBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-[300px] min-h-svh mx-auto">
      <div className="grid grid-cols-8">
        <div className="col-span-2 hidden sm:block">
          <div className="sticky top-0 h-svh">
            <MenuBar isMain />
          </div>
        </div>
        <div className="col-span-8 sm:col-span-6">
          <div className="flex flex-col">
            <NavBar />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
