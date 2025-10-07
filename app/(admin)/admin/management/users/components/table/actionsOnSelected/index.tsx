"use client";
import { useActionOnSelected } from "@/app/(artist-portal)/artist/tracks/hooks/useActionOnSelected";
import DeleteSection from "@/components/dataTable/DeleteSection";
import useTrackActions from "@/hooks/useTrackActions";
import { Table } from "@tanstack/react-table";

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const { selectedTracks } = useActionOnSelected(table);
  const { handleDeleteTracks } = useTrackActions();

  return (
    <div className="flex w-full flex-1 items-center gap-6">
      <DeleteSection
        onDeleteConfirm={() =>
          handleDeleteTracks(selectedTracks.map((track) => track._id))
        }
      />
    </div>
  );
}
export default DataTableActionsOnSelected;
