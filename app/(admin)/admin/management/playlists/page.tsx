"use client";
import DetailPlaylistDialog from "@/app/(admin)/admin/management/playlists/components/DetailPlaylistDialog";
import AdminPlaylistTable from "@/app/(admin)/admin/management/playlists/components/table";
import { AdminPlaylistColumns } from "@/app/(admin)/admin/management/playlists/components/table/Column";
import useAdminPlaylistManagement from "@/app/(admin)/hooks/useAdminPlaylistManagement";
import { useDetailPlaylistSlice } from "@/store/slices/detailPlaylistSlice";

const PlaylistsManagement = () => {
  const { playlists } = useAdminPlaylistManagement();
  const { isOpen, playlist } = useDetailPlaylistSlice();
  return (
    <div>
      <AdminPlaylistTable data={playlists} columns={AdminPlaylistColumns} />
      {isOpen && playlist && <DetailPlaylistDialog />}
    </div>
  );
};
export default PlaylistsManagement;
