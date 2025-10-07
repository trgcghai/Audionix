"use client";
import { useActionOnSelected } from "@/app/(artist-portal)/artist/albums/hooks/useActionOnSelected";
import DeleteSection from "@/components/dataTable/DeleteSection";
import useAlbumActions from "@/hooks/useAlbumActions";
import { Table } from "@tanstack/react-table";
import StatusChangeSection from "./StatusChangeSection";

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
