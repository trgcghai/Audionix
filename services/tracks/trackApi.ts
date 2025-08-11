import { ApiResponse } from "@/app/types/api";
import { api } from "../api";
import {
  CreateTrackResponse,
  FindTrackParams,
  FindTrackResponse,
  UpdateMultipleStatusParams,
  UpdateMultipleStatusResponse,
  UpdateOneStatusParams,
} from "./type";
import { Track } from "@/app/types/model";

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
          const urlParams = new URLSearchParams();
          if (current) urlParams.append("current", current.toString());
          if (limit) urlParams.append("limit", limit.toString());
          if (title) urlParams.append("title", title);
          if (artist) urlParams.append("artist", artist);
          if (genres) urlParams.append("genres", genres.join(","));
          if (status) urlParams.append("status", status);
          if (sort) urlParams.append("sort", sort);
          if (albums) urlParams.append("albums", albums.join(","));
          return { url: `/tracks?${urlParams.toString()}` };
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
} = trackApi;
