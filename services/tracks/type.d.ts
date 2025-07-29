import { ApiResponse, PaginatedResponse } from "@/app/types/api";
import { Track } from "@/app/types/model";

export type FindTrackResponse = ApiResponse<PaginatedResponse<Track>>;

export type FindTrackParams = {
  current?: number;
  limit?: number;
  title?: string;
  artist?: string;
  genres?: string[];
  status?: string;
  sort?: string;
  albums?: string[];
};

export type CreateTrackResponse = ApiResponse<{ result: Track }>;
