import { Badge } from "@/components/ui/badge";
import formatStringCapital from "@/utils/formatStringCapital";
import { Row } from "@tanstack/react-table";
import { useMemo } from "react";

interface GenresCellProps<T> {
  row: Row<T>;
  // Accessor function to get genres from the row data
  getGenres: (data: T) => string[];
  // Optional custom formatter for genre text
  formatGenre?: (genre: string) => string;
  // Optional className for the Badge component
  badgeClassName?: string;
}

function GenresCell<T>({
  row,
  getGenres,
  formatGenre = (genre) => formatStringCapital(genre),
  badgeClassName = "cursor-pointer rounded-full px-2 py-1 capitalize",
}: GenresCellProps<T>) {
  const genres = useMemo(() => getGenres(row.original) || [], [row, getGenres]);

  return (
    <div className="flex flex-wrap items-center justify-start gap-2">
      {genres.map((genre) => (
        <Badge key={genre} className={badgeClassName}>
          {formatGenre(genre)}
        </Badge>
      ))}
    </div>
  );
}

export default GenresCell;
