import {
  CreateAlbumResponse,
  FindAlbumsParams,
  FindAlbumsResponse,
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
    createAlbum: builder.mutation<CreateAlbumResponse, FormData>({
      query: (formData) => ({
        url: "/albums",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Albums"],
    }),
  }),
});

export const { useCreateAlbumMutation, useGetAlbumsQuery } = albumApi;
