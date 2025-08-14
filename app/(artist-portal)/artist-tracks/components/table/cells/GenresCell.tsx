import { Track } from "@/app/types/model";
import { Badge } from "@/components/ui/badge";
import { Row } from "@tanstack/react-table";
import { useMemo } from "react";

const GenresCell = ({ row }: { row: Row<Track> }) => {
  const genres = useMemo(() => row.original.genres || [], [row]);
  return (
    <div className="flex items-center justify-start gap-2">
      {genres &&
        genres.map((genre) => {
          return (
            <Badge
              key={genre}
              className="cursor-pointer rounded-full px-2 py-1 capitalize"
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </Badge>
          );
        })}
    </div>
  );
};
export default GenresCell;
