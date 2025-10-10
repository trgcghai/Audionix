"use client";
import DeleteSection from "@/components/dataTable/DeleteSection";
import { useActionOnSelected } from "@/hooks/useActionOnSelected";
import useTrackActions from "@/hooks/useTrackActions";
import { Table } from "@tanstack/react-table";

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const { selectedIds } = useActionOnSelected(table);
  const { handleDeleteTracks } = useTrackActions();

  return (
    <div className="flex w-full flex-1 items-center gap-6">
      <DeleteSection onDeleteConfirm={() => handleDeleteTracks(selectedIds)} />
    </div>
  );
}
export default DataTableActionsOnSelected;
