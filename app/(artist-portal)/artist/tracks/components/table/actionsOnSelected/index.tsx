"use client";
import { TRACK_STATUS_OPTIONS } from "@/app/constant";
import DeleteSection from "@/components/dataTable/DeleteSection";
import StatusChangeSection from "@/components/dataTable/StatusChangeSection";
import { useActionOnSelected } from "@/hooks/useActionOnSelected";
import useTrackActions from "@/hooks/useTrackActions";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const { selectedIds } = useActionOnSelected(table);
  const { handleDeleteTracks, handleChangeMultipleStatus } = useTrackActions();

  return (
    <div className="flex w-full flex-1 items-center gap-6">
      <StatusChangeSection
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusItems={TRACK_STATUS_OPTIONS}
        onStatusConfirm={() => {
          handleChangeMultipleStatus({
            ids: selectedIds,
            status: selectedStatus!,
          });
        }}
      />

      <DeleteSection onDeleteConfirm={() => handleDeleteTracks(selectedIds)} />
    </div>
  );
}
export default DataTableActionsOnSelected;
