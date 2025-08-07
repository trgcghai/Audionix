"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainHeader from "@/components/header/MainHeader";
import Player from "@/app/(main)/components/player/Player";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/common/Footer";
import { useAppSelector } from "@/hooks/redux";
import QueueDrawer from "@/components/common/QueueDrawer";
import { cn } from "@/libs/utils";
import { useGetMyPlaylistsQuery } from "@/services/playlists/playlistApi";
import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";
import MainSidebar from "@/app/(main)/components/sidebar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isOpen: isDrawerOpen } = useAppSelector((state) => state.queueDrawer);
  const { data, isLoading, isError } = useGetMyPlaylistsQuery({});

  if (isLoading) {
    return <LoaderSpin />;
  }

  if (isError) {
    return;
  }

  return (
    <div className="grid h-screen grid-cols-12 grid-rows-12">
      <div className="col-span-12 row-span-1">
        <MainHeader />
      </div>
      <div className="col-span-3 row-span-11 -mt-5 p-4">
        {isLoading && <LoaderSpin />}
        {isError && <ErrorMessage message="Failed to load your playlists" />}
        {data && <MainSidebar playlists={data?.data.items} />}
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
