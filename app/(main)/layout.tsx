import { ScrollArea } from "@/components/ui/scroll-area";
import MainHeader from "../_components/Header";
import Player from "../_components/Player";
import Sidebar from "../_components/Sidebar";
import ReduxProvider from "../_libs/redux/ReduxProvider";
import { Separator } from "@/components/ui/separator";
import Footer from "../_components/Footer";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ReduxProvider>
      <div className="grid grid-cols-12 grid-rows-12 h-screen">
        <div className="col-span-12 row-span-1">
          <MainHeader />
        </div>
        <div className="col-span-3 row-span-11 p-4 -mt-6">
          <Sidebar />
        </div>
        <div className="col-span-9 row-span-11 py-4 pr-4 -mt-6">
          <ScrollArea className="h-full bg-card p-4 text-card-foreground rounded-xl border shadow-sm">
            {children}

            <Separator className="my-12" />

            <Footer />
          </ScrollArea>
        </div>
        <div className="col-span-12 row-span-1">
          <Player />
        </div>
      </div>
    </ReduxProvider>
  );
};
export default layout;
