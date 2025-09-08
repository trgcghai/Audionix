import { ApiResponse, PaginatedResponse } from "@/app/types/api";
import { Artist } from "@/app/types/model";

export type FindArtistResponse = ApiResponse<PaginatedResponse<Artist>>;

export type FindArtistByIdResponse = ApiResponse<Artist>;

export type FindMyFollowedArtistResponse = ApiResponse<{ artists: Artist[] }>;

export type FindArtistParams = {
  current?: number;
  limit?: number;
  name?: string;
  genres?: string[];
  sort?: string;
};

export type FindPopularArtistResponse = ApiResponse<{
  items: (Artist & { totalFollowers: number })[];
}>;

export type FindSimilarArtistParams = {
  id: string;
} & FindArtistParams;

export type UpdateArtistResponse = ApiResponse<{ result: Artist }>;

export type UpdateArtistParams = {
  id: string;
  formData: FormData;
};
