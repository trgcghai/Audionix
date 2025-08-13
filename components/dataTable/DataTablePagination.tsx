import { PAGE_SIZE_OPTIONS } from "@/app/constant";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect } from "react";

interface DataTablePaginationProps {
  current: number;
  limit: number;
  setLimit: (limit: number) => void;
  totalPages: number;
  onGoToFirst: () => void;
  onGoToPrevious: () => void;
  onGoToNext: () => void;
  onGoToLast: (pages: number) => void;
}

export function DataTablePagination({
  current,
  limit,
  setLimit,
  totalPages,
  onGoToFirst,
  onGoToPrevious,
  onGoToNext,
  onGoToLast,
}: DataTablePaginationProps) {
  useEffect(() => {
    // Ensure the current page is within valid bounds
    if (current > totalPages) {
      onGoToLast(totalPages);
    }
  }, [current, onGoToLast, totalPages]);

  return (
    <div className="flex items-center justify-end space-x-6 lg:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={limit.toString()}
          onValueChange={(value) => {
            setLimit(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px] rounded-full">
            <SelectValue placeholder="Select page size" />
          </SelectTrigger>
          <SelectContent side="top">
            {PAGE_SIZE_OPTIONS.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        Page {current} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 rounded-full lg:flex"
          onClick={() => onGoToFirst()}
          disabled={current === 1}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-full"
          onClick={() => onGoToPrevious()}
          disabled={current === 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-full"
          onClick={() => onGoToNext()}
          disabled={current === totalPages}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 rounded-full lg:flex"
          onClick={() => onGoToLast(totalPages)}
          disabled={current === totalPages}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
