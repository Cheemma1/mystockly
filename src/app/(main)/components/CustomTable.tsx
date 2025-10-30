// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// interface TableProps {
//   headers: string[];
//   data: Record<string, React.ReactNode>[];
// }

// const CustomTable = ({ headers, data }: TableProps) => {
//   return (
//     <div className=" rounded-md border w-full overflow-auto">
//       <Table className="">
//         <TableHeader>
//           <TableRow>
//             {headers.map((header, i) => (
//               <TableHead key={i} className="whitespace-nowrap">
//                 {header}
//               </TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.length > 0 ? (
//             data.map((row, rowIndex) => (
//               <TableRow key={rowIndex}>
//                 {headers.map((header, colIndex) => (
//                   <TableCell key={colIndex} className="whitespace-nowrap">
//                     {row[header] ?? "-"}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell
//                 colSpan={headers.length}
//                 className="text-center text-gray-500"
//               >
//                 No data available
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default CustomTable;

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// interface TableProps {
//   headers: string[];
//   data: Record<string, React.ReactNode>[];
//   hideOnMobile?: string[]; // Column names to hide on mobile
// }

// const CustomTable = ({ headers, data, hideOnMobile = [] }: TableProps) => {
//   return (
//     <div className="w-full overflow-x-auto border rounded-md">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             {headers.map((header, i) => (
//               <TableHead
//                 key={i}
//                 className={`whitespace-nowrap ${
//                   hideOnMobile.includes(header) ? "hidden md:table-cell" : ""
//                 }`}
//               >
//                 {header}
//               </TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.length > 0 ? (
//             data.map((row, rowIndex) => (
//               <TableRow key={rowIndex}>
//                 {headers.map((header, colIndex) => (
//                   <TableCell
//                     key={colIndex}
//                     className={`whitespace-nowrap ${
//                       hideOnMobile.includes(header)
//                         ? "hidden md:table-cell"
//                         : ""
//                     }`}
//                   >
//                     {row[header] ?? "-"}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell
//                 colSpan={headers.length}
//                 className="text-center text-gray-500"
//               >
//                 No data available
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default CustomTable;

interface TableProps {
  headers: string[];
  data: Record<string, React.ReactNode>[];
}

const CustomTable = ({ headers, data }: TableProps) => {
  return (
    // <div className="w-full overflow-x-auto border rounded-lg">
    <table className="w-full border-collapse">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header, i) => (
            <th
              key={i}
              className={`px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap border-b `}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-3 text-sm whitespace-nowrap `}
                >
                  {row[header] ?? "-"}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={headers.length}
              className="px-4 py-8 text-center text-gray-500"
            >
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
    // </div>
  );
};
export default CustomTable;
