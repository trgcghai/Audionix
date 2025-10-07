"use client";
import { Track } from "@/app/types/model";
import DeleteSection from "@/components/dataTable/DeleteSection";
import { useActionOnSelected } from "@/hooks/useActionOnSelected";
import useTrackActions from "@/hooks/useTrackActions";
import { Table } from "@tanstack/react-table";

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const { selectedItems: selectedTracks } = useActionOnSelected(table);
  const { handleDeleteTracks } = useTrackActions();

  return (
    <div className="flex w-full flex-1 items-center gap-6">
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
