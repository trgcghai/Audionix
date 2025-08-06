import { ApiResponse } from "@/app/types/api";
import { Playlist } from "@/app/types/model";
import { api } from "@/services/api";
import {
  FindPlaylistParams,
  FindPlaylistResponse,
} from "@/services/playlists/type";

const playlistApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => {
    return {
      getPlaylistById: builder.query<ApiResponse<{ item: Playlist }>, string>({
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
      createPlaylist: builder.mutation({
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
      deletePlaylist: builder.mutation({
        query: (id) => ({
          url: `/playlists/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Playlists"],
      }),
    };
  },
});

export const {
  useGetMyPlaylistsQuery,
  useCreatePlaylistMutation,
  useGetPlaylistByIdQuery,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
} = playlistApi;
