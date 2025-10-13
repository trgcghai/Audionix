"use client";

import { Heart, ListMusic, Music, Users } from "lucide-react";
import BarChartComponent from "./components/BarChart";
import ChartCard from "./components/ChartCard";
import LineChartComponent from "./components/LineChart";
import StatCard from "./components/StatCard";
import { useDashboardData } from "./hooks/useDashboardData";

export default function AdminDashboard() {
  const {
    stats,
    userRegistrationData,
    topArtistsData,
    likesData,
    playlistData,
  } = useDashboardData();

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      change: "+12.5% from last month",
    },
    {
      title: "Total Tracks",
      value: stats.totalTracks,
      icon: Music,
      change: "+8.2% from last month",
    },
    {
      title: "Total Likes",
      value: stats.totalLikes,
      icon: Heart,
      change: "+15.3% from last month",
    },
    {
      title: "User Playlists",
      value: stats.totalPlaylists,
      icon: ListMusic,
      change: "+18.7% from last month",
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

  return (
    <div className="min-h-screen px-3">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-xl font-bold capitalize">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your music platform analytics
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              change={card.change}
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* User Registration Chart */}
          <ChartCard
            title="User Registrations"
            description="Total registered users over time"
            config={chartConfigs.users}
          >
            <LineChartComponent
              data={userRegistrationData}
              dataKey="users"
              xAxisKey="date"
            />
          </ChartCard>

          {/* Playlist Growth Chart */}
          <ChartCard
            title="User-Created Playlists"
            description="Number of playlists created by users"
            config={chartConfigs.playlists}
          >
            <LineChartComponent
              data={playlistData}
              dataKey="count"
              xAxisKey="month"
            />
          </ChartCard>

          {/* Top Artists Chart */}
          <ChartCard
            title="Top 10 Most Liked Artists"
            description="Artists with the most followers and likes"
            config={chartConfigs.artists}
            className="h-[400px] w-full"
          >
            <BarChartComponent
              data={topArtistsData}
              dataKeys={["likes"]}
              xAxisKey="name"
              isVertical={true}
            />
          </ChartCard>

          {/* Likes Chart */}
          <ChartCard
            title="Likes Overview"
            description="Total likes on songs and albums over time"
            config={chartConfigs.likes}
            className="h-[350px] w-full"
          >
            <BarChartComponent
              data={likesData}
              dataKeys={["songs", "albums"]}
              xAxisKey="month"
              colors={["var(--primary)", "var(--secondary)"]}
            />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
