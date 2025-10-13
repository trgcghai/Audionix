import { useMemo } from "react";

// Sample data - replace with real API calls
const userRegistrationData = [
  { date: "2024-01", users: 1250 },
  { date: "2024-02", users: 1890 },
  { date: "2024-03", users: 2340 },
  { date: "2024-04", users: 2980 },
  { date: "2024-05", users: 3560 },
  { date: "2024-06", users: 4120 },
  { date: "2024-07", users: 4890 },
  { date: "2024-08", users: 5670 },
  { date: "2024-09", users: 6340 },
  { date: "2024-10", users: 7120 },
];

const topArtistsData = [
  { name: "Taylor Swift", likes: 45230 },
  { name: "The Weeknd", likes: 42150 },
  { name: "Drake", likes: 39870 },
  { name: "Billie Eilish", likes: 37640 },
  { name: "Ed Sheeran", likes: 35920 },
  { name: "Ariana Grande", likes: 33450 },
  { name: "Post Malone", likes: 31280 },
  { name: "Dua Lipa", likes: 29560 },
  { name: "Justin Bieber", likes: 27890 },
  { name: "Olivia Rodrigo", likes: 25670 },
];

const likesData = [
  { month: "Jan", songs: 12500, albums: 3200 },
  { month: "Feb", songs: 15800, albums: 4100 },
  { month: "Mar", songs: 18900, albums: 4800 },
  { month: "Apr", songs: 22300, albums: 5600 },
  { month: "May", songs: 26700, albums: 6400 },
  { month: "Jun", songs: 31200, albums: 7300 },
  { month: "Jul", songs: 35800, albums: 8200 },
  { month: "Aug", songs: 40500, albums: 9100 },
  { month: "Sep", songs: 45600, albums: 10200 },
  { month: "Oct", songs: 51200, albums: 11400 },
];

const playlistData = [
  { month: "Jan", count: 890 },
  { month: "Feb", count: 1120 },
  { month: "Mar", count: 1450 },
  { month: "Apr", count: 1780 },
  { month: "May", count: 2150 },
  { month: "Jun", count: 2560 },
  { month: "Jul", count: 2980 },
  { month: "Aug", count: 3420 },
  { month: "Sep", count: 3890 },
  { month: "Oct", count: 4380 },
];

export function useDashboardData() {
  const stats = useMemo(() => {
    const totalTracks = 125847;
    const totalUsers =
      userRegistrationData[userRegistrationData.length - 1].users;
    const totalLikes =
      likesData[likesData.length - 1].songs +
      likesData[likesData.length - 1].albums;
    const totalPlaylists = playlistData[playlistData.length - 1].count;

    return {
      totalTracks,
      totalUsers,
      totalLikes,
      totalPlaylists,
    };
  }, []);

  return {
    stats,
    userRegistrationData,
    topArtistsData,
    likesData,
    playlistData,
  };
}
