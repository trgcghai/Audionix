import { api } from "@/services/api";
import {
  FindArtistByIdResponse,
  FindArtistParams,
  FindArtistResponse,
  FindMyFollowedArtistResponse,
  FindPopularArtistResponse,
  FindSimilarArtistParams,
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
    getArtistById: builder.query<FindArtistByIdResponse, string>({
      query: (id) => {
        return {
          url: `/artists/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Artists"],
    }),
    getSimilarArtist: builder.query<
      FindArtistResponse,
      FindSimilarArtistParams
    >({
      query: ({ id, ...params }) => {
        return {
          url: `/artists/${id}/related-artists`,
          method: "GET",
          params,
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
  useGetArtistByIdQuery,
  useGetSimilarArtistQuery,
} = artistApi;
