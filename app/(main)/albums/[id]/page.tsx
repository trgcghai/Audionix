"use client";
import { AlbumControlSection } from "@/app/(main)/components/controlSection";
import { AlbumHeroSection } from "@/app/(main)/components/heroSection";
import MediaList from "@/app/(main)/components/MediaList";
import { ITEM_PER_MEDIA_ROW } from "@/app/constant";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { Separator } from "@/components/ui/separator";
import { usePlayer } from "@/hooks/usePlayer";
import useUserActions from "@/hooks/useUserActions";
import {
  useGetAlbumByArtistQuery,
  useGetAlbumByIdQuery,
} from "@/services/albums/albumApi";
import { useCheckIfUserIsFollowingAlbumsQuery } from "@/services/users/userApi";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const DetailAlbumPage = () => {
  const { playTracks } = usePlayer();
  const { handleFollowAlbum, handleUnfollowAlbum } = useUserActions();
  const { id } = useParams<{ id: string }>();
  const {
    data: albumData,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
    error: albumError,
  } = useGetAlbumByIdQuery(id, { skip: !id });
  const { data: followData } = useCheckIfUserIsFollowingAlbumsQuery([id], {
    skip: !id,
  });
  const album = useMemo(() => {
    return albumData && albumData.data;
  }, [albumData]);
  const { data: similarAlbumData } = useGetAlbumByArtistQuery(
    { artistId: album?.artist._id || "", limit: ITEM_PER_MEDIA_ROW },
    { skip: !album?.artist._id },
  );

  if (isAlbumLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderSpin />
      </div>
    );
  }

  if (isAlbumError) {
    return (
      <div className="flex items-center justify-center">
        <ErrorMessage
          message={
            (albumError as ApiErrorResponse)?.data?.message ||
            "Failed to load album data"
          }
        />
      </div>
    );
  }

  return (
    <div>
      {album && <AlbumHeroSection album={album} />}

      <Separator className="my-4" />

      <AlbumControlSection
        isFollowing={followData?.data.result[0].isFollowing || false}
        onPlay={() => album && playTracks(album.tracks)}
        onFollow={() => {
          if (followData?.data.result[0].isFollowing) {
            handleUnfollowAlbum(album._id);
          } else {
            handleFollowAlbum(album._id);
          }
        }}
      />

      <SimpleTrackTable tracks={album?.tracks || []} />

      <MediaList
        className="mt-12"
        data={similarAlbumData ? similarAlbumData.data.items : []}
        title={`More from ${album?.artist.name}`}
      />
    </div>
  );
};
export default DetailAlbumPage;
