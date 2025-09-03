import { PaginatedResponse } from "@/app/types/api";
import { Album } from "@/app/types/model";

export type CreateAlbumResponse = ApiResponse<Album>;

export type FindAlbumsResponse = ApiResponse<PaginatedResponse<Album>>;

export type FindAlbumsByIdResponse = ApiResponse<Album>;

export type FindAlbumsParams = {
  current?: number;
  limit?: number;
  title?: string;
  genres?: string[];
  status?: string[];
  sort?: string;
};

export type FindAlbumByArtistParams = {
  artistId: string;
} & FindAlbumsParams;

export type UpdateStatusOneParams = { albumId: string; status: string };

export type UpdateStatusManyParams = { ids: string[]; status: string };

export type FindMyFollowedAlbumsResponse = ApiResponse<{ albums: Album[] }>;
