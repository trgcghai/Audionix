import { ApiResponse } from "@/app/types/api";
import { Track } from "@/app/types/model";
import { api } from "../api";
import {
  CreateTrackResponse,
  FindSimilarTrackParams,
  FindTrackByArtistParams,
  FindTrackByIdResponse,
  FindTrackParams,
  FindTrackResponse,
  UpdateMultipleStatusParams,
  UpdateMultipleStatusResponse,
  UpdateOneStatusParams,
} from "./type";

const trackApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTracks: builder.query<FindTrackResponse, FindTrackParams>({
        query: ({
          artist,
          current,
          genres,
          limit,
          sort,
          status,
          title,
          albums,
        }) => {
          return {
            url: `/tracks`,
            params: {
              current: current && current < 1 ? 1 : current,
              limit: limit && limit < 1 ? 10 : limit,
              title,
              artist,
              genres: (genres && genres.join(",")) || undefined,
              status: (status && status.join(",")) || undefined,
              sort,
              albums: (albums && albums.join(",")) || undefined,
            },
          };
        },
        providesTags: ["Tracks"],
      }),
      createTrack: builder.mutation<CreateTrackResponse, FormData>({
        query: (formData) => ({
          url: "/tracks",
          method: "POST",
          data: formData,
        }),
        invalidatesTags: ["Tracks"],
      }),
      deleteOneTrack: builder.mutation<void, string>({
        query: (trackId) => ({
          url: `/tracks/${trackId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Tracks"],
      }),
      deleteTracks: builder.mutation<void, string[]>({
        query: (ids) => ({
          url: `/tracks`,
          method: "DELETE",
          data: { ids },
        }),
        invalidatesTags: ["Tracks"],
      }),
      changeOneTrackStatus: builder.mutation<
        ApiResponse<Track>,
        UpdateOneStatusParams
      >({
        query: ({ trackId, status }) => ({
          url: `/tracks/${trackId}/status`,
          method: "PATCH",
          data: { status },
        }),
        invalidatesTags: ["Tracks"],
      }),
      changeTracksStatus: builder.mutation<
        UpdateMultipleStatusResponse,
        UpdateMultipleStatusParams
      >({
        query: ({ ids, status }) => ({
          url: `/tracks/status`,
          method: "PATCH",
          data: { ids, status },
        }),
        invalidatesTags: ["Tracks"],
      }),
      getTrackById: builder.query<FindTrackByIdResponse, string>({
        query: (id) => ({
          url: `/tracks/${id}`,
        }),
        providesTags: ["Tracks"],
      }),
      getSimilarTrack: builder.query<FindTrackResponse, FindSimilarTrackParams>(
        {
          query: ({ id, ...params }) => ({
            url: `/tracks/${id}/similar`,
            params,
          }),
          providesTags: ["Tracks"],
        },
      ),
      getTrackByArtist: builder.query<
        FindTrackResponse,
        FindTrackByArtistParams
      >({
        query: ({ artistId, ...params }) => ({
          url: `/artists/${artistId}/tracks`,
          params,
        }),
        providesTags: ["Tracks"],
      }),
      getMyCreatedTrack: builder.query<FindTrackResponse, FindTrackParams>({
        query: ({ current, genres, limit, sort, status, title, albums }) => {
          return {
            url: `/artists/me/tracks`,
            params: {
              current: current && current < 1 ? 1 : current,
              limit: limit && limit < 1 ? 10 : limit,
              title,
              genres: (genres && genres.join(",")) || undefined,
              status: (status && status.join(",")) || undefined,
              sort,
              albums: (albums && albums.join(",")) || undefined,
            },
          };
        },
        providesTags: ["Tracks"],
      }),
      updateTrack: builder.mutation({
        query: ({ trackId, formData }) => ({
          url: `/tracks/${trackId}`,
          method: "PUT",
          data: formData,
        }),
        invalidatesTags: ["Tracks"],
      }),
    };
  },
});

export const {
  useGetTracksQuery,
  useCreateTrackMutation,
  useDeleteOneTrackMutation,
  useDeleteTracksMutation,
  useChangeOneTrackStatusMutation,
  useChangeTracksStatusMutation,
  useGetTrackByIdQuery,
  useGetSimilarTrackQuery,
  useGetTrackByArtistQuery,
  useGetMyCreatedTrackQuery,
  useUpdateTrackMutation,
} = trackApi;
