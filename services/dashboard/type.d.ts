import { ApiResponse } from "@/app/types/api";

export type DashboardResponse = ApiResponse<{
  stats: DashboardStatsDto;
  userRegistrationData: UserRegistrationDataDto[];
  topArtistsData: TopArtistDataDto[];
  likesData: LikesDataDto[];
  playlistData: PlaylistDataDto[];
}>;
