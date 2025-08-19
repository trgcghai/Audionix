import { ApiResponse, PaginatedResponse } from "@/app/types/api";
import { Track } from "@/app/types/model";

export type FindTrackResponse = ApiResponse<PaginatedResponse<Track>>;

export type FindTrackByIdResponse = ApiResponse<Track>;

export type FindTrackParams = {
  current?: number;
  limit?: number;
  title?: string;
  artist?: string;
  genres?: string[];
  status?: string[];
  sort?: string;
  albums?: string[];
};

export type CreateTrackResponse = ApiResponse<{ result: Track }>;

export type UpdateOneStatusParams = {
  trackId: string;
  status: string;
};

export type UpdateMultipleStatusParams = {
  ids: string[];
  status: string;
};

export type UpdateMultipleStatusResponse = ApiResponse<{
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  successfulUpdates: {
    id: string;
    title: string;
    newStatus: TrackStatus;
  }[];
  failedUpdates: {
    id: string;
    reason: string;
  }[];
  message: string;
}>;
