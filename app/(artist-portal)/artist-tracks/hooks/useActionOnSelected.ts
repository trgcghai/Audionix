"use client";
import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { Track } from "@/app/types/model";

export const useActionOnSelected = <TData>(table: Table<TData>) => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [addToAlbumDialogOpen, setAddToAlbumDialogOpen] = useState(false);

  const selectedTracks = table
    .getSelectedRowModel()
    .rows.map((row) => row.original) as Track[];

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleAddToAlbum = (albumId: string) => {
    console.log(`Adding tracks to album ${albumId}:`, selectedTracks);
    setAddToAlbumDialogOpen(false);
    // TODO: Implement actual add to album logic
  };

  return {
    selectedStatus,
    addToAlbumDialogOpen,
    selectedTracks,
    handleStatusChange,
    handleAddToAlbum,
    setAddToAlbumDialogOpen,
  };
};
