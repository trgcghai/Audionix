"use client";
import { TrackStatusValues } from "@/app/constant";
import { Track } from "@/app/types/model";
import DeleteSection from "@/components/dataTable/DeleteSection";
import StatusChangeSection from "@/components/dataTable/StatusChangeSection";
import { useActionOnSelected } from "@/hooks/useActionOnSelected";
import useTrackActions from "@/hooks/useTrackActions";
import { Table } from "@tanstack/react-table";

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
        statusItems={TrackStatusValues}
        onStatusConfirm={() => {
          handleChangeMultipleStatus({
            ids: selectedTracks.map((track) => (track as Track)._id),
            status: selectedStatus!,
          });
        }}
      />

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
