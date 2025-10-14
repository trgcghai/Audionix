import { api } from "@/services/api";
import { DashboardResponse } from "@/services/dashboard/type";

const dashboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDashboardData: build.query<DashboardResponse, void>({
      query: () => ({
        url: "/dashboard/stats",
      }),
      providesTags: [
        "Accounts",
        "Tracks",
        "Playlists",
        "Albums",
        "Artists",
        "User",
      ],
    }),
  }),
});

export default dashboardApi;

export const { useGetDashboardDataQuery } = dashboardApi;
