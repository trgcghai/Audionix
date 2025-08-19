import {
  CreateAlbumResponse,
  FindAlbumsByIdResponse,
  FindAlbumsParams,
  FindAlbumsResponse,
  FindMyFollowedAlbumsResponse,
  UpdateStatusManyParams,
  UpdateStatusOneParams,
} from "@/services/albums/type";
import { api } from "@/services/api";

const albumApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAlbums: builder.query<FindAlbumsResponse, FindAlbumsParams>({
      query: ({ current, limit, title, genres, status, sort }) => {
        return {
          url: "/albums",
          method: "GET",
          params: {
            current: current && current < 1 ? 1 : current,
            limit: limit && limit < 1 ? 10 : limit,
            title,
            genres: (genres && genres.join(",")) || undefined,
            status: (status && status.join(",")) || undefined,
            sort,
          },
        };
      },
      providesTags: ["Albums"],
    }),
    getMyCreatedAlbums: builder.query<FindAlbumsResponse, FindAlbumsParams>({
      query: ({ current, limit, title, genres, status, sort }) => {
        return {
          url: "/artists/me/albums",
          method: "GET",
          params: {
            current: current && current < 1 ? 1 : current,
            limit: limit && limit < 1 ? 10 : limit,
            title,
            genres: (genres && genres.join(",")) || undefined,
            status: (status && status.join(",")) || undefined,
            sort,
          },
        };
      },
      providesTags: ["Albums"],
    }),
    createAlbum: builder.mutation<CreateAlbumResponse, FormData>({
      query: (formData) => ({
        url: "/albums",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Albums"],
    }),
    deleteOne: builder.mutation<unknown, string>({
      query: (albumId) => ({
        url: `/albums/${albumId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Albums"],
    }),
    deleteMultiples: builder.mutation<unknown, string[]>({
      query: (ids) => ({
        url: `/albums`,
        method: "DELETE",
        data: { ids },
      }),
      invalidatesTags: ["Albums"],
    }),
    updateStatusOne: builder.mutation<unknown, UpdateStatusOneParams>({
      query: ({ albumId, status }) => ({
        url: `/albums/${albumId}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["Albums"],
    }),
    updateStatusMany: builder.mutation<unknown, UpdateStatusManyParams>({
      query: ({ ids, status }) => ({
        url: `/albums/status`,
        method: "PATCH",
        data: { ids, status },
      }),
      invalidatesTags: ["Albums"],
    }),
    getMyFollowedAlbums: builder.query<FindMyFollowedAlbumsResponse, unknown>({
      query: () => ({
        url: `/users/me/following/albums`,
        method: "GET",
      }),
      providesTags: ["Albums"],
    }),
    getLatestAlbums: builder.query<FindAlbumsResponse, FindAlbumsParams>({
      query: ({ current, limit, title, genres, status, sort }) => {
        return {
          url: "/albums/latest",
          method: "GET",
          params: {
            current: current && current < 1 ? 1 : current,
            limit: limit && limit < 1 ? 10 : limit,
            title,
            genres: (genres && genres.join(",")) || undefined,
            status: (status && status.join(",")) || undefined,
            sort,
          },
        };
      },
      providesTags: ["Albums"],
    }),
    getAlbumByArtist: builder.query<FindAlbumsResponse, string>({
      query: (artistId) => ({
        url: `/artists/${artistId}/albums`,
        method: "GET",
      }),
      providesTags: ["Albums"],
    }),
    getAlbumById: builder.query<FindAlbumsByIdResponse, string>({
      query: (id) => ({
        url: `/albums/${id}`,
        method: "GET",
      }),
      providesTags: ["Albums"],
    }),
  }),
});

export const {
  useCreateAlbumMutation,
  useGetAlbumsQuery,
  useGetMyCreatedAlbumsQuery,
  useDeleteOneMutation,
  useDeleteMultiplesMutation,
  useUpdateStatusOneMutation,
  useUpdateStatusManyMutation,
  useGetMyFollowedAlbumsQuery,
  useGetLatestAlbumsQuery,
  useGetAlbumByArtistQuery,
  useGetAlbumByIdQuery,
} = albumApi;
