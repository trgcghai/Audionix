"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainHeader from "@/components/header/MainHeader";
import Player from "@/app/(main)/components/player/Player";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/common/Footer";
import QueueDrawer from "@/components/common/QueueDrawer";
import { cn } from "@/libs/utils";
import { useGetMyPlaylistsQuery } from "@/services/playlists/playlistApi";
import MainSidebar from "@/app/(main)/components/sidebar";
import { useQueueDrawer } from "@/store/slices/queueDrawerSlice";
import { useGetMyFollowedAlbumsQuery } from "@/services/albums/albumApi";
import { ApiErrorResponse } from "@/app/types/api";
import { useGetMyFollowedArtistsQuery } from "@/services/artists/artistApi";
import { useUserSlice } from "@/store/slices/userSlice";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isOpen: isDrawerOpen } = useQueueDrawer();
  const { isAuthenticated } = useUserSlice();
  const {
    data: playlists,
    isLoading: isLoadingPlaylists,
    isError: isErrorPlaylists,
    error: errorPlaylists,
  } = useGetMyPlaylistsQuery({}, { skip: !isAuthenticated });
  const {
    data: followedAlbums,
    isLoading: isLoadingFollowed,
    isError: isErrorFollowed,
    error: errorFollowed,
  } = useGetMyFollowedAlbumsQuery({}, { skip: !isAuthenticated });

  const {
    data: followedArtists,
    isLoading: isLoadingFollowedArtists,
    isError: isErrorFollowedArtists,
    error: errorFollowedArtists,
  } = useGetMyFollowedArtistsQuery({}, { skip: !isAuthenticated });

  return (
    <div className="grid h-screen grid-cols-12 grid-rows-12">
      <div className="col-span-12 row-span-1">
        <MainHeader />
      </div>
      <div className="col-span-3 row-span-11 -mt-5 p-4">
        <MainSidebar
          playlistData={{
            playlists: playlists?.data?.items || [],
            isLoading: isLoadingPlaylists,
            isError: isErrorPlaylists,
            error:
              (errorPlaylists as ApiErrorResponse)?.message ||
              "Failed to load your playlists",
          }}
          albumData={{
            albums: followedAlbums?.data?.albums || [],
            isLoading: isLoadingFollowed,
            isError: isErrorFollowed,
            error:
              (errorFollowed as ApiErrorResponse)?.message ||
              "Failed to load your followed albums",
          }}
          artistData={{
            artists: followedArtists?.data?.artists || [],
            isLoading: isLoadingFollowedArtists,
            isError: isErrorFollowedArtists,
            error:
              (errorFollowedArtists as ApiErrorResponse)?.message ||
              "Failed to load your followed artists",
          }}
        />
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
