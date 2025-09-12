import React from "react";

type Column<T> = {
  header: string;
  accessor: (item: T) => React.ReactNode;
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
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">
          {emptyMessage || "Nenhum dado disponível"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="p-3 text-left">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
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
    </div>
  );
};
