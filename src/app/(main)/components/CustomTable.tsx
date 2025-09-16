import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableProps {
  headers: string[];
  data: Record<string, React.ReactNode>[];
}

const CustomTable = ({ headers, data }: TableProps) => {
  return (
    <div className=" rounded-md border w-full overflow-auto">
      <Table className="">
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
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
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
  );
};

export default CustomTable;
