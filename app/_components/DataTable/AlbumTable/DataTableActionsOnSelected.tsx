"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { ARTIST_ALBUM_STATUS_OPTIONS } from "@/app/constant";
import ConfirmDialog from "../../Dialog/ConfirmDialog";
import { Button } from "@/components/ui/button";

function DataTableActionsOnSelected<TData>({ table }: { table: Table<TData> }) {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setStatusDialogOpen(true);
  };

  const handleStatusConfirm = () => {
    console.log(`Changing status to: ${selectedStatus}`);
    console.log(`Selected rows:`, table.getSelectedRowModel().rows);
    setStatusDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting selected rows:", table.getSelectedRowModel().rows);
    setStatusDialogOpen(false);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Label>Change selected row to status:</Label>
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px] rounded-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {ARTIST_ALBUM_STATUS_OPTIONS.map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ConfirmDialog
          title="Confirm Status Change"
          description={`Are you sure you want to change the status of ${
            table.getSelectedRowModel().rows.length
          } selected items to "${selectedStatus}"? This action can be reversed later.`}
          onCancel={() => setStatusDialogOpen(false)}
          onConfirm={handleStatusConfirm}
          statusDialogOpen={statusDialogOpen}
          setStatusDialogOpen={setStatusDialogOpen}
        />
      </div>
      <div className="flex items-center gap-2">
        <ConfirmDialog
          title="Confirm Deletion"
          description={`Are you absolutely sure to delete all ${
            table.getSelectedRowModel().rows.length
          } selected items? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          asChild
        >
          <Button variant={"destructive"} className="rounded-full">
            Delete selected
          </Button>
        </ConfirmDialog>
      </div>
    </div>
  );
}
export default DataTableActionsOnSelected;
