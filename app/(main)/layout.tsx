"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainHeader from "../../components/header/MainHeader";
import Player from "../../components/player/Player";
import Sidebar from "../../components/sidebar/Sidebar";
import { Separator } from "@/components/ui/separator";
import Footer from "../../components/common/Footer";
import { useAppSelector } from "../../hooks/redux";
import QueueDrawer from "../../components/common/QueueDrawer";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isOpen: isDrawerOpen } = useAppSelector((state) => state.queueDrawer);

  return (
    <div className="grid grid-cols-12 grid-rows-12 h-screen">
      <div className="col-span-12 row-span-1">
        <MainHeader />
      </div>
      <div className="col-span-3 row-span-11 p-4 -mt-6">
        <Sidebar />
      </div>
      <div
        className={`${
          isDrawerOpen ? "col-span-6" : "col-span-9"
        } row-span-11 py-4 px-0 -mt-6`}
      >
        <ScrollArea className="h-full bg-card p-4 text-card-foreground rounded-xl border shadow-sm">
          {children}

          <Separator className="my-12" />

          <Footer />
        </ScrollArea>
      </div>
      {isDrawerOpen && (
        <div className="col-span-3 row-span-11 p-4 -mt-6">
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
