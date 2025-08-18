import { ApiResponse, PaginatedResponse } from "@/app/types/api";
import { Artist } from "@/app/types/model";

export type FindArtistResponse = ApiResponse<PaginatedResponse<Artist>>;

export type FindMyFollowedArtistResponse = ApiResponse<{ artists: Artist[] }>;

export type FindArtistParams = {
  current?: number;
  limit?: number;
  name?: string;
  genres?: string[];
  sort?: string;
};

export type FindPopularArtistResponse = ApiResponse<
  (Artist & { totalFollowers: number })[]
>;
