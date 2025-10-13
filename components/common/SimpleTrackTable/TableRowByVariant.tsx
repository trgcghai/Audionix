"use client";
import { Playlist, Track } from "@/app/types/model";
import TrackRow from "@/components/common/SimpleTrackTable/TrackRow";
import { useRouter } from "next/navigation";
import { SimpleTrackTablesVariant } from ".";

interface TableRowByVariantProps {
  index: number;
  track: Track | Playlist["tracks"][number];
  variant?: SimpleTrackTablesVariant;
  showAction?: boolean;
}

const TableRowByVariant = ({
  index,
  track,
  variant = "default",
  showAction = true,
}: TableRowByVariantProps) => {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/tracks/${track._id}`);
  };

  return (
    <TrackRow
      index={index}
      track={track}
      variant={variant}
      onClick={handleRowClick}
      showAction={showAction}
    />
  );
};

export default TableRowByVariant;
