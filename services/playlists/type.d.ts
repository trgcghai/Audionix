import { ApiResponse, PaginatedResponse } from "@/app/types/api";
import { Playlist } from "@/app/types/model";

export type FindPlaylistResponse = ApiResponse<PaginatedResponse<Playlist>>;

export type FindPlaylistParams = {
  current?: number;
  limit?: number;
  title?: string;
  status?: string;
  sort?: string;
};

export type CreatePlaylistResponse = ApiResponse<{ result: Playlist }>;

export type AddTracksParams = {
  id: string;
  trackIds: string[];
};

export type AddTracksResponse = ApiResponse<{
  _id: string;
  result: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId?: string;
    upsertedCount?: number;
    matchedCount: number;
  };
}>;
