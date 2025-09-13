import React, { useState, useMemo } from "react";
import { SortingIndicator } from "../SortingIndicator/SortingIndicator";
import { Pagination } from "./Pagination";

type Column<T> = {
  header: string;
  accessor: (item: T) => React.ReactNode;
  sortValue?: (item: T) => string | number;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
};

export const Table = <T,>({
  columns,
  data,
  onRowClick,
  emptyMessage,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    index: number;
    direction: "asc" | "desc";
  }>({
    index: 3,
    direction: "desc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    const { index, direction } = sortConfig;
    const col = columns[index];
    if (!col.sortValue) return data;

    return [...data].sort((a, b) => {
      const aVal = col.sortValue!(a);
      const bVal = col.sortValue!(b);
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig, columns]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (index: number) => {
    setSortConfig((prev) => {
      if (prev.index !== index) return { index, direction: "asc" };
      return { index, direction: prev.direction === "asc" ? "desc" : "asc" };
    });
    setCurrentPage(1);
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">{emptyMessage || "No data"}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="p-3 text-left cursor-pointer select-none"
                onClick={() => col.sortValue && handleSort(idx)}
              >
                {col.header}{" "}
                {sortConfig?.index === idx && (
                  <SortingIndicator direction={sortConfig.direction} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, idx) => (
            <tr
              key={idx}
              className={`${
                onRowClick ? "hover:bg-gray-50 cursor-pointer transition" : ""
              }`}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((col, cidx) => (
                <td key={cidx} className="p-3">
                  {col.accessor(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
