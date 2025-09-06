const usePagination = (
  onPageChange: (page: number) => void,
  totalPages: number,
  currentPage: number,
) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Tính toán các trang cần hiển thị
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      // Nếu tổng số trang <= 5, hiển thị tất cả
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];

    // Luôn hiển thị trang đầu
    pages.push(1);

    // Tính toán 3 trang giữa (current - 1, current, current + 1)
    const startMiddle = Math.max(2, currentPage - 1);
    const endMiddle = Math.min(totalPages - 1, currentPage + 1);

    // Nếu có khoảng cách giữa trang đầu và trang giữa đầu tiên
    if (startMiddle > 2) {
      pages.push("ellipsis");
    }

    // Thêm các trang giữa
    for (let i = startMiddle; i <= endMiddle; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Nếu có khoảng cách giữa trang giữa cuối cùng và trang cuối
    if (endMiddle < totalPages - 1) {
      pages.push("ellipsis");
    }

    // Luôn hiển thị trang cuối (nếu totalPages > 1)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return {
    handlePageChange,
    getVisiblePages,
  };
};
export { usePagination };
