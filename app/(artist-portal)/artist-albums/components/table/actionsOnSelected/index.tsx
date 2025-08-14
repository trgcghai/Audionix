"use client";
import { Table } from "@tanstack/react-table";
import DeleteSection from "./DeleteSection";
import StatusChangeSection from "./StatusChangeSection";
import { useActionOnSelected } from "@/app/(artist-portal)/artist-albums/hooks/useActionOnSelected";
import useAlbumActions from "@/hooks/useAlbumActions";

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const { selectedStatus, selectedAlbums, handleStatusChange } =
    useActionOnSelected(table);
  const { handleUpdateStatusMany, handleDeleteMultiple } = useAlbumActions();

  return (
    <div className="flex w-full flex-1 items-center gap-6">
      <StatusChangeSection
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        onStatusConfirm={() => {
          handleUpdateStatusMany({
            ids: selectedAlbums.map((album) => album._id),
            status: selectedStatus!,
          });
        }}
      />

      <DeleteSection
        onDeleteConfirm={() => {
          handleDeleteMultiple(selectedAlbums.map((album) => album._id));
        }}
      />
    </div>
  );
}
export default DataTableActionsOnSelected;
