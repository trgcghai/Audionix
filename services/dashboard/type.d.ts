import {
  ApiResponse,
  DashboardStatsDto,
  LikesDataDto,
  PlaylistDataDto,
  TopArtistDataDto,
  UserRegistrationDataDto,
} from "@/app/types/api";

export type DashboardResponse = ApiResponse<{
  stats: DashboardStatsDto;
  userRegistrationData: UserRegistrationDataDto[];
  topArtistsData: TopArtistDataDto[];
  likesData: LikesDataDto[];
  playlistData: PlaylistDataDto[];
}>;
