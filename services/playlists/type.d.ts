import { ApiResponse, PaginatedResponse } from "@/app/types/api";
import { Playlist } from "@/app/types/model";

export type FindPlaylistResponse = ApiResponse<PaginatedResponse<Playlist>>;

export type FindPlaylistParams = {
  current?: number;
  limit?: number;
  title?: string;
  status?: string;
  sort?: string;
  owners?: string[];
};

export type CreatePlaylistResponse = ApiResponse<{ result: Playlist }>;

export type AddTracksParams = {
  id: string;
  trackIds: string[];
};

export type RemoveTracksParams = AddTracksParams;

export type AddMultipleTracksParams = {
  playlistIds: string[];
  trackIds: string[];
};

export type RemoveMultipleTracksParams = AddMultipleTracksParams;

export type AddTracksResponse = ApiResponse<{
  success: boolean;
  message: string;
  stats: {
    tracksAdded: number;
    playlistsModified: number;
    playlistsAttempted: number;
  };
}>;

export type RemoveTracksResponse = AddTracksResponse;

export type CheckTracksResponse = ApiResponse<{
  playlistId: string;
  playlistTitle: string;
  results: {
    trackId: string;
    inPlaylist: boolean;
  }[];
  summary: {
    total: number;
    inPlaylist: number;
    notInPlaylist: number;
  };
}>;

export type CheckTracksParams = {
  id: string;
  trackIds: string[];
};
