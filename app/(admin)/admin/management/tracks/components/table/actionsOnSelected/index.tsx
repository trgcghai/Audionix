"use client";
import { Track } from "@/app/types/model";
import DeleteSection from "@/components/dataTable/DeleteSection";
import { useActionOnSelected } from "@/hooks/useActionOnSelected";
import useTrackActions from "@/hooks/useTrackActions";
import { Table } from "@tanstack/react-table";
import AddToAlbumSection from "./AddToAlbumSection";
import StatusChangeSection from "./StatusChangeSection";

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const {
    selectedStatus,
    selectedItems: selectedTracks,
    handleStatusChange,
  } = useActionOnSelected(table);
  const { handleDeleteTracks, handleChangeMultipleStatus } = useTrackActions();

  return (
    <div className="flex w-full flex-1 items-center gap-6">
      <StatusChangeSection
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        onStatusConfirm={() => {
          handleChangeMultipleStatus({
            ids: selectedTracks.map((track) => (track as Track)._id),
            status: selectedStatus!,
          });
        }}
      />

      <AddToAlbumSection selectedTracks={selectedTracks as Track[]} />

      <DeleteSection
        onDeleteConfirm={() =>
          handleDeleteTracks(
            selectedTracks.map((track) => (track as Track)._id),
          )
        }
      />
    </div>
  );
}
export default DataTableActionsOnSelected;
