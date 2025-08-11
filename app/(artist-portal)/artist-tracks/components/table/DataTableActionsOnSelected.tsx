"use client";
import { Table } from "@tanstack/react-table";
import { useTrackActions as useTrackAction } from "../../hooks/useTrackActions";
import DeleteSection from "./DeleteSection";
import StatusChangeSection from "./StatusChangeSection";
import AddToAlbumSection from "./AddToAlbumSection";
import useTrackActions from "@/hooks/useTrackActions";

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const { selectedStatus, selectedTracks, handleStatusChange } =
    useTrackAction(table);
  const { handleDeleteTracks, handleChangeMultipleStatus } = useTrackActions();

  return (
    <div className="flex w-full flex-1 items-center gap-6">
      <StatusChangeSection
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        onStatusConfirm={() => {
          handleChangeMultipleStatus({
            ids: selectedTracks.map((track) => track._id),
            status: selectedStatus!,
          });
        }}
      />

      <AddToAlbumSection selectedTracks={selectedTracks} />

      <DeleteSection
        onDeleteConfirm={() =>
          handleDeleteTracks(selectedTracks.map((track) => track._id))
        }
      />
    </div>
  );
}
export default DataTableActionsOnSelected;
