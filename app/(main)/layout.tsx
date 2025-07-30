"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainHeader from "@/components/header/MainHeader";
import Player from "@/components/player/Player";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/common/Footer";
import { useAppSelector } from "@/hooks/redux";
import QueueDrawer from "@/components/common/QueueDrawer";
import Sidebar from "@/components/sidebar/main/Sidebar";
import { cn } from "@/libs/utils";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isOpen: isDrawerOpen } = useAppSelector((state) => state.queueDrawer);

  return (
    <div className="grid h-screen grid-cols-12 grid-rows-12">
      <div className="col-span-12 row-span-1">
        <MainHeader />
      </div>
      <div className="col-span-3 row-span-11 -mt-5 p-4">
        <Sidebar />
      </div>
      <div
        className={cn(
          "row-span-11 -mt-5 py-4",
          !isDrawerOpen && "col-span-9 pr-4",
          isDrawerOpen && "col-span-6 px-0",
        )}
      >
        <ScrollArea className="bg-card text-card-foreground h-full rounded-xl border p-4 shadow-sm">
          {children}

          <Separator className="my-12" />

          <Footer />
        </ScrollArea>
      </div>
      {isDrawerOpen && (
        <div className="col-span-3 row-span-11 -mt-5 p-4">
          <QueueDrawer />
        </div>
      )}
      <div className="col-span-12 row-span-1">
        <Player />
      </div>
    </div>
  );
};
export default Layout;
