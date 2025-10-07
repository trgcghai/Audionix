"use client";
import { Album } from "@/app/types/model";
import DeleteSection from "@/components/dataTable/DeleteSection";
import { useActionOnSelected } from "@/hooks/useActionOnSelected";
import useAlbumActions from "@/hooks/useAlbumActions";
import { Table } from "@tanstack/react-table";
import StatusChangeSection from "./StatusChangeSection";

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const {
    selectedStatus,
    selectedItems: selectedAlbums,
    handleStatusChange,
  } = useActionOnSelected(table);
  const { handleUpdateStatusMany, handleDeleteMultiple } = useAlbumActions();

  return (
    <div className="flex w-full flex-1 items-center gap-6">
      <StatusChangeSection
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        onStatusConfirm={() => {
          handleUpdateStatusMany({
            ids: selectedAlbums.map((album) => (album as Album)._id),
            status: selectedStatus!,
          });
        }}
      />

      <DeleteSection
        onDeleteConfirm={() => {
          handleDeleteMultiple(
            selectedAlbums.map((album) => (album as Album)._id),
          );
        }}
      />
    </div>
  );
}
export default DataTableActionsOnSelected;
