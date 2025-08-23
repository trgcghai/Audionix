"use client";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaList from "@/app/(main)/components/MediaList";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { useParams } from "next/navigation";
import {
  useGetArtistByIdQuery,
  useGetSimilarArtistQuery,
} from "@/services/artists/artistApi";
import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";
import { ApiErrorResponse } from "@/app/types/api";
import { useGetTrackByArtistQuery } from "@/services/tracks/trackApi";
import { useGetAlbumByArtistQuery } from "@/services/albums/albumApi";
import { ArtistHeroSection } from "@/app/(main)/components/heroSection";
import useUserActions from "@/hooks/useUserActions";
import { useCheckIfUserIsFollowingArtistsQuery } from "@/services/users/userApi";

const DetailArtistPage = () => {
  const { handleFollowArtist, handleUnfollowArtist } = useUserActions();
  const { id } = useParams<{ id: string }>();
  const { data: followData } = useCheckIfUserIsFollowingArtistsQuery([id], {
    skip: !id,
  });
  const {
    data: artistData,
    isLoading: isArtistLoading,
    isError: isArtistError,
    error: artistError,
  } = useGetArtistByIdQuery(id, { skip: !id });

  const artist = useMemo(() => {
    return artistData && artistData.data;
  }, [artistData]);

  const { data: tracksData } = useGetTrackByArtistQuery(artist?._id || "", {
    skip: !artist?._id,
  });
  const { data: albumsData } = useGetAlbumByArtistQuery(artist?._id || "", {
    skip: !artist?._id,
  });
  const { data: similarArtistsData } = useGetSimilarArtistQuery(
    { id: artist?._id || "", limit: 7 },
    { skip: !artist?._id },
  );

  if (isArtistLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderSpin />
      </div>
    );
  }

  if (isArtistError) {
    return (
      <div className="flex items-center justify-center">
        <ErrorMessage
          message={
            (artistError as ApiErrorResponse)?.message ||
            "Failed to load artist data"
          }
        />
      </div>
    );
  }

  return (
    <div className="">
      {artist && (
        <ArtistHeroSection
          artist={artist}
          isFollowing={followData?.data.result[0].isFollowing || false}
          onFollow={() => {
            if (followData?.data.result[0].isFollowing) {
              handleUnfollowArtist(artist._id);
            } else {
              handleFollowArtist(artist._id);
            }
          }}
        />
      )}
      <Separator className="my-4" />

      <div className="px-3">
        <p className="text-xl font-bold">Popular tracks</p>
        <SimpleTrackTable
          tracks={tracksData?.data.items || []}
          showHeader={false}
        />
      </div>

      <div className="mt-12 px-3">
        <p className="text-xl font-bold">Latest products</p>
        <Tabs defaultValue="albums" className="mt-4">
          <TabsList className="">
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="singles">Singles</TabsTrigger>
          </TabsList>
          <TabsContent value="albums" className="-mx-3">
            <MediaList data={albumsData?.data.items || []} />
          </TabsContent>
          <TabsContent value="singles" className="-mx-3">
            <MediaList data={tracksData?.data.items || []} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 px-3">
        <p className="text-xl font-bold">Fan also like</p>
        <MediaList data={similarArtistsData?.data.items || []} />
      </div>
    </div>
  );
};
export default DetailArtistPage;
