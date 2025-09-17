import { Playlist, Track } from "@/app/types/model";
import TrackRow from "@/components/common/SimpleTrackTable/TrackRow";
import { useRouter } from "next/navigation";
import { SimpleTrackTablesVariant } from ".";

interface TableRowByVariantProps {
  index: number;
  track: Track | Playlist["tracks"][number];
  variant?: SimpleTrackTablesVariant;
}

const TableRowByVariant = ({
  index,
  track,
  variant = "default",
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
    />
  );
};

export default TableRowByVariant;
