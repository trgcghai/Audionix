import { api } from "@/services/api";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    followArtist: builder.mutation<void, string>({
      query: (artistId) => {
        return {
          url: `/users/me/following/artists`,
          method: "PUT",
          body: {
            artistId,
          },
        };
      },
      invalidatesTags: ["Artists"],
    }),
  }),
});

export const { useFollowArtistMutation } = userApi;
