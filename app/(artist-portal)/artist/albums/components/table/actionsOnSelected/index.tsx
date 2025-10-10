"use client";
import { ALBUM_STATUS_OPTIONS } from "@/app/constant";
import DeleteSection from "@/components/dataTable/DeleteSection";
import StatusChangeSection from "@/components/dataTable/StatusChangeSection";
import { useActionOnSelected } from "@/hooks/useActionOnSelected";
import useAlbumActions from "@/hooks/useAlbumActions";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const { selectedIds } = useActionOnSelected(table);
  const { handleUpdateStatusMany, handleDeleteMultiple } = useAlbumActions();

  return (
    <div className="flex w-full flex-1 items-center gap-6">
      <StatusChangeSection
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusItems={ALBUM_STATUS_OPTIONS}
        onStatusConfirm={() => {
          handleUpdateStatusMany({
            ids: selectedIds,
            status: selectedStatus!,
          });
        }}
      />

      <DeleteSection
        onDeleteConfirm={() => {
          handleDeleteMultiple(selectedIds);
        }}
      />
    </div>
  );
}
export default DataTableActionsOnSelected;
