"use client";
import AdminPlaylistTable from "@/app/(admin)/admin/management/playlists/components/table";
import { AdminPlaylistColumns } from "@/app/(admin)/admin/management/playlists/components/table/Column";
import useAdminPlaylistManagement from "@/app/(admin)/hooks/useAdminPlaylistManagement";

const PlaylistsManagement = () => {
  const { playlists } = useAdminPlaylistManagement();
  return (
    <div>
      <AdminPlaylistTable data={playlists} columns={AdminPlaylistColumns} />
    </div>
  );
};
export default PlaylistsManagement;
