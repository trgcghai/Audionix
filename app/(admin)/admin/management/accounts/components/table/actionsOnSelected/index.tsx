"use client";
import { ACCOUNT_STATUS_OPTIONS } from "@/app/constant";
import StatusChangeSection from "@/components/dataTable/StatusChangeSection";
import { useActionOnSelected } from "@/hooks/useActionOnSelected";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const { selectedIds } = useActionOnSelected(table);

  // Mock function to handle updating multiple accounts
  const handleUpdateStatusMany = (data: { ids: string[]; status: string }) => {
    console.log("Updating accounts status:", data.status, "for IDs:", data.ids);
    // Here you would normally call an API endpoint
  };

  return (
    <div className="flex w-full flex-1 items-center gap-6">
      <StatusChangeSection
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusItems={ACCOUNT_STATUS_OPTIONS}
        onStatusConfirm={() => {
          handleUpdateStatusMany({
            ids: selectedIds,
            status: selectedStatus!,
          });
        }}
        title="Change account status"
        dialogTitle="Change Account Status"
        dialogDescription="Are you sure you want to change the status of the selected accounts? This will affect their ability to log in."
      />
    </div>
  );
}

export default DataTableActionsOnSelected;
