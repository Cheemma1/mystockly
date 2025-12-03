import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationComponent } from "./Pagination";

interface TableProps {
  headers: string[];
  data: Record<string, React.ReactNode>[];
  itemsPerPage?: number;
  showPagination?: boolean;
}

const CustomTable = ({
  headers,
  data,
  itemsPerPage = 10,
  showPagination = true,
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = showPagination
    ? data.slice(startIndex, endIndex)
    : data;

  // Reset to page 1 when data changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate display range
  const displayStart = data.length === 0 ? 0 : startIndex + 1;
  const displayEnd = Math.min(endIndex, data.length);

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, i) => (
                <TableHead key={i} className="whitespace-nowrap">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <TableCell key={colIndex} className="whitespace-nowrap">
                      {row[header] ?? "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  className="text-center text-gray-500"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && data.length > 0 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-gray-600">
            Showing {displayStart} to {displayEnd} of {data.length} entries
          </div>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default CustomTable;
