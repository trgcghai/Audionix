"use client";
import { useActionOnSelected } from "@/app/(artist-portal)/artist/tracks/hooks/useActionOnSelected";
import useTrackActions from "@/hooks/useTrackActions";
import { Table } from "@tanstack/react-table";
import DeleteSection from "./DeleteSection";

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
