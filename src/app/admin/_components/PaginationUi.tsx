/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const PaginationUi = ({ page, setPage, totalPage }: any) => {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
      >
        ← Trước
      </button>

      <span className="px-3 py-1">
        Trang {page} / {totalPage}
      </span>

      <button
        disabled={page === totalPage}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Sau →
      </button>
    </div>
  );
};

export default PaginationUi;
