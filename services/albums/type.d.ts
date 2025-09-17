import { PaginatedResponse } from "@/app/types/api";
import { Album, Track } from "@/app/types/model";

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

export type FindAlbumsAsOptionsResponse = ApiResponse<{
  options: { value: string; label: string }[];
}>;

export type AddTracksToAlbumsParams = {
  albumIds: string[];
  trackIds: string[];
};
export type RemoveTracksFromAlbumsParams = AddTracksToAlbumsParams;

export type AddTracksToAlbumsResponse = ApiResponse<{
  success: boolean;
  message: string;
  stats: {
    tracksAdded: number;
    albumsModified: number;
    albumsAttempted: number;
  };
}>;
export type RemoveTracksFromAlbumsResponse = AddTracksToAlbumsResponse;

export type FindTracksInAlbumResponse = ApiResponse<{
  _id: string;
  results: {
    time_added: string;
    _id: Track;
  }[];
}>;

export type UpdateAlbumResponse = ApiResponse<Album>;

export type UpdateAlbumParams = {
  albumId: string;
  data: FormData;
};
