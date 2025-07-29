import { api } from "../api";
import {
  CreateTrackResponse,
  FindTrackParams,
  FindTrackResponse,
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
    };
  },
});

export const { useGetTracksQuery, useCreateTrackMutation } = trackApi;
