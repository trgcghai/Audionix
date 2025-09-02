"use client";
import MediaList from "@/app/(main)/components/MediaList";
import { ApiErrorResponse } from "@/app/types/api";
import {
  useGetLatestAlbumsQuery,
  useGetMyFollowedAlbumsQuery,
} from "@/services/albums/albumApi";
import {
  useGetMyFollowedArtistsQuery,
  useGetPopularArtistsQuery,
} from "@/services/artists/artistApi";
import { useGetMyPlaylistsQuery } from "@/services/playlists/playlistApi";
import { useGetTracksQuery } from "@/services/tracks/trackApi";
import { useUserSlice } from "@/store/slices/userSlice";

export default function Home() {
  const { isAuthenticated } = useUserSlice();

  // cái này phải public
  const {
    data: trackData,
    isLoading: trackLoading,
    isError: trackError,
    error: trackErrorData,
  } = useGetTracksQuery({ limit: 7 });

  const {
    data: playlists,
    isLoading: isLoadingPlaylists,
    isError: isErrorPlaylists,
    error: errorPlaylists,
  } = useGetMyPlaylistsQuery({ limit: 7 }, { skip: !isAuthenticated });

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
  } = useGetMyFollowedArtistsQuery({ limit: 7 }, { skip: !isAuthenticated });

  // cái này phải public
  const {
    data: latestAlbums,
    isLoading: isLoadingLatest,
    isError: isErrorLatest,
    error: errorLatest,
  } = useGetLatestAlbumsQuery({ limit: 7 });

  // cái này phải public
  const {
    data: popularArtists,
    isLoading: isLoadingPopular,
    isError: isErrorPopular,
    error: errorPopular,
  } = useGetPopularArtistsQuery({ limit: 7 });

  return (
    <div className="space-y-8 first:mt-2">
      {trackData && trackData.data.items && (
        <MediaList
          title={"You may have interest"}
          data={trackData.data.items}
          isLoading={trackLoading}
          isError={trackError}
          error={(trackErrorData as ApiErrorResponse)?.data?.message}
        />
      )}
      {latestAlbums && latestAlbums.data.items && (
        <MediaList
          title={"Latest albums"}
          data={latestAlbums.data.items}
          isLoading={isLoadingLatest}
          isError={isErrorLatest}
          error={(errorLatest as ApiErrorResponse)?.data?.message}
        />
      )}
      {popularArtists && popularArtists.data.items && (
        <MediaList
          title={"Popular artists"}
          data={popularArtists.data.items}
          isLoading={isLoadingPopular}
          isError={isErrorPopular}
          error={(errorPopular as ApiErrorResponse)?.data?.message}
        />
      )}
      {playlists && playlists.data.items && (
        <MediaList
          title={"Your playlists"}
          data={playlists.data.items}
          isLoading={isLoadingPlaylists}
          isError={isErrorPlaylists}
          error={(errorPlaylists as ApiErrorResponse)?.data?.message}
        />
      )}
      {followedAlbums && followedAlbums.data.albums && (
        <MediaList
          title={"Your followed albums"}
          data={followedAlbums.data.albums.slice(0, 7)}
          isLoading={isLoadingFollowed}
          isError={isErrorFollowed}
          error={(errorFollowed as ApiErrorResponse)?.data?.message}
        />
      )}
      {followedArtists && followedArtists.data.artists && (
        <MediaList
          title={"Your followed artists"}
          data={followedArtists.data.artists}
          isLoading={isLoadingFollowedArtists}
          isError={isErrorFollowedArtists}
          error={(errorFollowedArtists as ApiErrorResponse)?.data?.message}
        />
      )}
    </div>
  );
}
