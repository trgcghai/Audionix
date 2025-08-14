import { CreateAlbumResponse } from "@/services/albums/type";
import { api } from "@/services/api";

const albumApi = api.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useCreateAlbumMutation } = albumApi;
