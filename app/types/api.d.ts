export type ApiResponse<T> = {
  statusCode: number;
  status: "success" | "error";
  data: T;
  metadata: {
    timestamp: string;
  };
};

export type ApiErrorResponse = {
  data: {
    statusCode: number;
    status: "success" | "error";
    error: string;
    message: string;
    metadata: {
      timestamp: string;
    };
  };
  status: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  totalItems: number;
  totalPages: number;
  current: number;
  limit: number;
};

export class DashboardStatsDto {
  totalUsers: number;
  totalTracks: number;
  totalLikes: number;
  userPlaylists: number;
  userGrowthPercentage: number;
  trackGrowthPercentage: number;
  likesGrowthPercentage: number;
  playlistGrowthPercentage: number;
}

export class UserRegistrationDataDto {
  date: string;
  users: number;
}

export class TopArtistDataDto {
  name: string;
  likes: number;
}

export class LikesDataDto {
  month: string;
  songs: number;
  albums: number;
}

export class PlaylistDataDto {
  month: string;
  count: number;
}
