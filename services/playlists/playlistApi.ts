import { ApiResponse } from "@/app/types/api";
import { Playlist } from "@/app/types/model";
import { api } from "@/services/api";
import {
  AddMultipleTracksParams,
  AddTracksParams,
  AddTracksResponse,
  CheckTracksParams,
  CheckTracksResponse,
  FindPlaylistParams,
  FindPlaylistResponse,
  RemoveMultipleTracksParams,
  RemoveTracksParams,
  RemoveTracksResponse,
} from "@/services/playlists/type";

const playlistApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => {
    return {
      getPlaylists: builder.query<FindPlaylistResponse, FindPlaylistParams>({
        query: ({ current = 1, limit = 10, sort, status, title }) => ({
          url: "/playlists",
          method: "GET",
          params: {
            current,
            limit,
            sort,
            status,
            title,
          },
        }),
      }),
      getPlaylistById: builder.query<ApiResponse<Playlist>, string>({
        query: (id: string) => ({
          url: `/playlists/${id}`,
          method: "GET",
        }),
        providesTags: (_, __, id) => [{ type: "Playlists", id }],
      }),
      getMyPlaylists: builder.query<FindPlaylistResponse, FindPlaylistParams>({
        query: ({ current = 1, limit = 10, sort, status, title }) => ({
          url: "/users/me/playlists",
          method: "GET",
          params: {
            current,
            limit,
            sort,
            status,
            title,
          },
        }),
        providesTags: ["Playlists"],
      }),
      createPlaylist: builder.mutation<ApiResponse<Playlist>, void>({
        query: () => ({
          url: "/playlists",
          method: "POST",
        }),
        invalidatesTags: ["Playlists"],
      }),
      updatePlaylist: builder.mutation<
        ApiResponse<Playlist>,
        { id: string; formData: FormData }
      >({
        query: ({ id, formData }) => ({
          url: `/playlists/${id}`,
          method: "PUT",
          data: formData,
        }),
        invalidatesTags: ["Playlists"],
      }),
      deletePlaylist: builder.mutation<ApiResponse<Playlist>, string>({
        query: (id) => ({
          url: `/playlists/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Playlists"],
      }),
      addTracksToPlaylist: builder.mutation<AddTracksResponse, AddTracksParams>(
        {
          query: ({ id, trackIds }) => ({
            url: `/playlists/${id}/tracks`,
            method: "PUT",
            data: { trackIds },
          }),
          invalidatesTags: ["Playlists"],
        },
      ),
      removeTracksFromPlaylist: builder.mutation<
        RemoveTracksResponse,
        RemoveTracksParams
      >({
        query: ({ id, trackIds }) => ({
          url: `/playlists/${id}/tracks`,
          method: "DELETE",
          data: { trackIds },
        }),
        invalidatesTags: ["Playlists"],
      }),
      addTracksToPlaylists: builder.mutation<
        AddTracksResponse,
        AddMultipleTracksParams
      >({
        query: ({ playlistIds, trackIds }) => ({
          url: `/playlists/tracks`,
          method: "PUT",
          data: { playlistIds, trackIds },
        }),
        invalidatesTags: ["Playlists"],
      }),
      removeTracksFromPlaylists: builder.mutation<
        RemoveTracksResponse,
        RemoveMultipleTracksParams
      >({
        query: ({ playlistIds, trackIds }) => ({
          url: `/playlists/tracks`,
          method: "DELETE",
          data: { playlistIds, trackIds },
        }),
        invalidatesTags: ["Playlists"],
      }),
      addTracksToLiked: builder.mutation<AddTracksResponse, string[]>({
        query: (trackIds) => ({
          url: `/playlists/liked/tracks`,
          method: "PUT",
          data: { trackIds },
        }),
        invalidatesTags: ["Playlists"],
      }),
      removeTracksFromLiked: builder.mutation<RemoveTracksResponse, string[]>({
        query: (trackIds) => ({
          url: `/playlists/liked/tracks`,
          method: "DELETE",
          data: { trackIds },
        }),
        invalidatesTags: ["Playlists"],
      }),
      checkTracksInPlaylist: builder.query<
        CheckTracksResponse,
        CheckTracksParams
      >({
        query: ({ id, trackIds }) => ({
          url: `/playlists/${id}/tracks/contains`,
          method: "GET",
          params: {
            trackIds: trackIds.join(","),
          },
        }),
        providesTags: ["Playlists"],
      }),
      checkTracksInLiked: builder.query<CheckTracksResponse, string[]>({
        query: (trackIds) => ({
          url: `/playlists/liked/tracks/contains`,
          method: "GET",
          params: {
            trackIds: trackIds.join(","),
          },
        }),
        providesTags: ["Playlists"],
      }),
    };
  },
});

export const {
  useGetPlaylistsQuery,
  useGetMyPlaylistsQuery,
  useCreatePlaylistMutation,
  useGetPlaylistByIdQuery,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
  useAddTracksToPlaylistMutation,
  useRemoveTracksFromPlaylistMutation,
  useAddTracksToPlaylistsMutation,
  useRemoveTracksFromPlaylistsMutation,
  useAddTracksToLikedMutation,
  useRemoveTracksFromLikedMutation,
  useCheckTracksInPlaylistQuery,
  useCheckTracksInLikedQuery,
} = playlistApi;
