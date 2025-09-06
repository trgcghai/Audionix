import { usePagination } from "@/app/(main)/search/hooks/usePagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/libs/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MyPaginationProps {
  current: number;
  totalPages: number;
  setCurrent: (page: number) => void;
}

const MyPagination = ({
  current,
  totalPages,
  setCurrent,
}: MyPaginationProps) => {
  const { getVisiblePages, handlePageChange } = usePagination(
    setCurrent,
    totalPages,
    current,
  );
  const visiblePages = getVisiblePages();

  return (
    <Pagination className="justify-end">
      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(current - 1);
            }}
            className={`mr-4 h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-full px-3 py-2 transition-all`}
          >
            <ChevronLeft className="h-5 w-5" />
          </PaginationLink>
        </PaginationItem>

        {visiblePages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis className="text-gray-400" />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
                isActive={current === page}
                className={cn(
                  "h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-full px-3 py-2 text-lg transition-all",
                  current === page
                    ? "bg-main-blue hover:bg-main-blue/80 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(current + 1);
            }}
            className={`ml-4 h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-full px-3 py-2 transition-all`}
          >
            <ChevronRight className="h-5 w-5" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default MyPagination;
