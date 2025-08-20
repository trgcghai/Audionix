"use client";
import MediaList from "@/app/(main)/components/MediaList";
import { useGetTracksQuery } from "@/services/tracks/trackApi";
import { ApiErrorResponse } from "@/app/types/api";
import { useGetMyPlaylistsQuery } from "@/services/playlists/playlistApi";
import {
  useGetLatestAlbumsQuery,
  useGetMyFollowedAlbumsQuery,
} from "@/services/albums/albumApi";
import {
  useGetMyFollowedArtistsQuery,
  useGetPopularArtistsQuery,
} from "@/services/artists/artistApi";

export default function Home() {
  const {
    data: trackData,
    isLoading: trackLoading,
    isError: trackError,
    error: trackErrorData,
  } = useGetTracksQuery({
    limit: 7,
  });

  const {
    data: playlists,
    isLoading: isLoadingPlaylists,
    isError: isErrorPlaylists,
    error: errorPlaylists,
  } = useGetMyPlaylistsQuery({ limit: 7 });

  const {
    data: followedAlbums,
    isLoading: isLoadingFollowed,
    isError: isErrorFollowed,
    error: errorFollowed,
  } = useGetMyFollowedAlbumsQuery({});

  const {
    data: followedArtists,
    isLoading: isLoadingFollowedArtists,
    isError: isErrorFollowedArtists,
    error: errorFollowedArtists,
  } = useGetMyFollowedArtistsQuery({ limit: 7 });

  const {
    data: latestAlbums,
    isLoading: isLoadingLatest,
    isError: isErrorLatest,
    error: errorLatest,
  } = useGetLatestAlbumsQuery({ limit: 7 });

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
          error={(trackErrorData as ApiErrorResponse)?.message}
        />
      )}
      {latestAlbums && latestAlbums.data.items && (
        <MediaList
          title={"Latest albums"}
          data={latestAlbums.data.items}
          isLoading={isLoadingLatest}
          isError={isErrorLatest}
          error={(errorLatest as ApiErrorResponse)?.message}
        />
      )}
      {popularArtists && popularArtists.data.items && (
        <MediaList
          title={"Popular artists"}
          data={popularArtists.data.items}
          isLoading={isLoadingPopular}
          isError={isErrorPopular}
          error={(errorPopular as ApiErrorResponse)?.message}
        />
      )}
      {playlists && playlists.data.items && (
        <MediaList
          title={"Your playlists"}
          data={playlists.data.items}
          isLoading={isLoadingPlaylists}
          isError={isErrorPlaylists}
          error={(errorPlaylists as ApiErrorResponse)?.message}
        />
      )}
      {followedAlbums && followedAlbums.data.albums && (
        <MediaList
          title={"Your followed albums"}
          data={followedAlbums.data.albums.slice(0, 7)}
          isLoading={isLoadingFollowed}
          isError={isErrorFollowed}
          error={(errorFollowed as ApiErrorResponse)?.message}
        />
      )}
      {followedArtists && followedArtists.data.artists && (
        <MediaList
          title={"Your followed artists"}
          data={followedArtists.data.artists}
          isLoading={isLoadingFollowedArtists}
          isError={isErrorFollowedArtists}
          error={(errorFollowedArtists as ApiErrorResponse)?.message}
        />
      )}
    </div>
  );
}
