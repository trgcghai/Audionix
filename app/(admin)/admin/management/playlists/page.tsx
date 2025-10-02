"use client";
import DetailPlaylistDialog from "@/app/(admin)/admin/management/playlists/components/DetailPlaylistDialog";
import AdminPlaylistTable from "@/app/(admin)/admin/management/playlists/components/table";
import { AdminPlaylistColumns } from "@/app/(admin)/admin/management/playlists/components/table/Column";
import useAdminPlaylistManagement from "@/app/(admin)/hooks/useAdminPlaylistManagement";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { useDetailPlaylistSlice } from "@/store/slices/detailPlaylistSlice";

const PlaylistsManagement = () => {
  const { playlists, getPlaylistState } = useAdminPlaylistManagement();
  const { isOpen, playlist } = useDetailPlaylistSlice();
  return (
    <div className="h-full px-3">
      <div className="flex items-start gap-10">
        <div className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xl font-bold capitalize">Playlist Management</p>
          </div>

          {getPlaylistState.isLoading && <LoaderSpin fullScreen />}
          {getPlaylistState.isError && (
            <ErrorMessage
              message={
                (getPlaylistState.error as ApiErrorResponse)?.data?.message ||
                "An error occurred while fetching playlist data. Please try again later"
              }
            />
          )}
          {getPlaylistState.isSuccess && (
            <AdminPlaylistTable
              data={playlists}
              columns={AdminPlaylistColumns}
            />
          )}
        </div>

        {isOpen && playlist && <DetailPlaylistDialog />}
      </div>
    </div>
  );
};
export default PlaylistsManagement;
