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
      query: ({ limit, current, genres, name, sort }) => {
        return {
          url: "/artists",
          method: "GET",
          params: {
            limit: limit && limit < 1 ? 10 : limit,
            current: current && current < 1 ? 1 : current,
            genres: (genres && genres.join(",")) || undefined,
            name,
            sort,
          },
        };
      },
      providesTags: ["Artists"],
    }),
    getMyFollowedArtists: builder.query<
      FindMyFollowedArtistResponse,
      FindArtistParams
    >({
      query: ({ limit, current, genres, name, sort }) => {
        return {
          url: "/users/me/following/artists",
          method: "GET",
          params: {
            limit: limit && limit < 1 ? 10 : limit,
            current: current && current < 1 ? 1 : current,
            genres: (genres && genres.join(",")) || undefined,
            name,
            sort,
          },
        };
      },
      providesTags: ["Artists"],
    }),
    getPopularArtists: builder.query<
      FindPopularArtistResponse,
      FindArtistParams
    >({
      query: ({ limit, current, genres, name, sort }) => {
        return {
          url: "/artists/popular",
          method: "GET",
          params: {
            limit: limit && limit < 1 ? 10 : limit,
            current: current && current < 1 ? 1 : current,
            genres: (genres && genres.join(",")) || undefined,
            name,
            sort,
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
      query: ({ id, current, genres, limit, name, sort }) => {
        return {
          url: `/artists/${id}/similar`,
          method: "GET",
          params: {
            limit: limit && limit < 1 ? 10 : limit,
            current: current && current < 1 ? 1 : current,
            genres: (genres && genres.join(",")) || undefined,
            name,
            sort,
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
  useGetArtistByIdQuery,
  useGetSimilarArtistQuery,
} = artistApi;
