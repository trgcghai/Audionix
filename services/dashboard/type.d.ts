import {
  ApiResponse,
  DashboardStatsDto,
  PlaylistDataDto,
  TopArtistDataDto,
  UserRegistrationDataDto,
} from "@/app/types/api";

export type DashboardResponse = ApiResponse<{
  stats: DashboardStatsDto;
  userRegistrationData: UserRegistrationDataDto[];
  topArtistsData: TopArtistDataDto[];
  playlistData: PlaylistDataDto[];
}>;
