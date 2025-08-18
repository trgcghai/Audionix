import { api } from "@/services/api";
import {
  FindArtistParams,
  FindArtistResponse,
  FindMyFollowedArtistResponse,
  FindPopularArtistResponse,
} from "@/services/artists/type";

const artistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllArtists: builder.query<FindArtistResponse, FindArtistParams>({
      query: () => {
        return {
          url: "/artists",
          method: "GET",
        };
      },
      providesTags: ["Artists"],
    }),
    getMyFollowedArtists: builder.query<
      FindMyFollowedArtistResponse,
      FindArtistParams
    >({
      query: () => {
        return {
          url: "/users/me/following/artists",
          method: "GET",
        };
      },
      providesTags: ["Artists"],
    }),
    getPopularArtists: builder.query<
      FindPopularArtistResponse,
      { limit: number }
    >({
      query: ({ limit }) => {
        return {
          url: "/artists",
          method: "GET",
          params: {
            limit,
          },
        };
      },
      providesTags: ["Artists"],
    }),
  }),
});

export const {
  useGetAllArtistsQuery,
  useGetMyFollowedArtistsQuery,
  useGetPopularArtistsQuery,
} = artistApi;
