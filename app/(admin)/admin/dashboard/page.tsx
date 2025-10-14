"use client";

import ChartCardSkeleton from "@/app/(admin)/admin/dashboard/components/ChartCardSkeleton";
import StatCardSkeleton from "@/app/(admin)/admin/dashboard/components/StatCardSkeleton";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useGetDashboardDataQuery } from "@/services/dashboard/dashboardApi";
import { Heart, ListMusic, Music, Users } from "lucide-react";
import BarChartComponent from "./components/BarChart";
import ChartCard from "./components/ChartCard";
import LineChartComponent from "./components/LineChart";
import StatCard from "./components/StatCard";

export default function AdminDashboard() {
  // const {
  //   stats,
  //   userRegistrationData,
  //   topArtistsData,
  //   likesData,
  //   playlistData,
  // } = useDashboardData();

  const { data, isLoading, isError, error } = useGetDashboardDataQuery();

  const dashboardStats = data?.data?.stats || [];
  const realUserData = data?.data?.userRegistrationData || [];
  const realTopArtists = data?.data?.topArtistsData || [];
  const realLikesData = data?.data?.likesData || [];
  const realPlaylistData = data?.data?.playlistData || [];

  const statCards = [
    {
      title: "Total Users",
      value: dashboardStats.totalUsers,
      icon: Users,
    },
    {
      title: "Total Tracks",
      value: dashboardStats.totalTracks,
      icon: Music,
    },
    {
      title: "Total Likes",
      value: dashboardStats.totalLikes,
      icon: Heart,
    },
    {
      title: "User Playlists",
      value: dashboardStats.totalPlaylists,
      icon: ListMusic,
    },
  ];

  const chartConfigs = {
    users: {
      users: { label: "Users", color: "hsl(var(--chart-1))" },
    },
    playlists: {
      count: { label: "Playlists", color: "hsl(var(--chart-2))" },
    },
    artists: {
      likes: { label: "Likes", color: "hsl(var(--chart-3))" },
    },
    likes: {
      songs: { label: "Songs", color: "hsl(var(--chart-4))" },
      albums: { label: "Albums", color: "hsl(var(--chart-5))" },
    },
  };

  console.log(statCards);

  return (
    <div className="min-h-screen px-3">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-xl font-bold capitalize">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your music platform analytics
          </p>
        </div>

        {isError && (
          <ErrorMessage
            message={
              (error as ApiErrorResponse)?.data?.message ||
              "Failed to load dashboard data. Showing sample data."
            }
          />
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <StatCardSkeleton key={index} />
              ))
            : statCards.map((card) => (
                <StatCard
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                />
              ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {isLoading ? (
            <>
              <ChartCardSkeleton />
              <ChartCardSkeleton />
              <ChartCardSkeleton className="h-[400px]" />
              <ChartCardSkeleton className="h-[400px]" />
            </>
          ) : (
            <>
              <ChartCard
                title="User Registrations"
                description="Total registered users over time"
                config={chartConfigs.users}
                className="w-full"
              >
                <LineChartComponent
                  data={realUserData}
                  dataKey="users"
                  xAxisKey="date"
                />
              </ChartCard>
              <ChartCard
                title="User-Created Playlists"
                description="Number of playlists created by users"
                config={chartConfigs.playlists}
                className="w-full"
              >
                <LineChartComponent
                  data={realPlaylistData}
                  dataKey="count"
                  xAxisKey="month"
                />
              </ChartCard>
              <ChartCard
                title="Top 10 Most Liked Artists"
                description="Artists with the most followers and likes"
                config={chartConfigs.artists}
                className="h-[400px] w-full"
              >
                <BarChartComponent
                  data={realTopArtists}
                  dataKeys={["likes"]}
                  xAxisKey="name"
                  isVertical={true}
                />
              </ChartCard>
              <ChartCard
                title="Likes Overview"
                description="Total likes on songs and albums over time"
                config={chartConfigs.likes}
                className="h-[400px] w-full"
              >
                <BarChartComponent
                  data={realLikesData}
                  dataKeys={["songs", "albums"]}
                  xAxisKey="month"
                  colors={["var(--primary)", "var(--secondary)"]}
                />
              </ChartCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
