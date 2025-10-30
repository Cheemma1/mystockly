import React, { useMemo } from "react";
import CustomTable from "../../components/CustomTable";
import { Customer } from "@/hooks/customers/interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import useFormatDate from "@/hooks/useFormatter";

interface CustomersProps {
  customers: Customer[];
  onDeleteClick: (c: Customer) => void;
  onEditClick: (c: Customer) => void;
}

const CustomersTable = ({
  customers,
  onDeleteClick,
  onEditClick,
}: CustomersProps) => {
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]; // single name
    const first = parts[0][0];
    const last = parts[parts.length - 1][0];
    return (first + last).toUpperCase();
  };

  const formatDate = useFormatDate();
  const headers = ["Customer", "Email", "Phone", "Location", "Added", "Action"];

  const tableData = useMemo(() => {
    return customers.map((c) => ({
      Customer: (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 font-semibold rounded-full uppercase">
            {getInitials(c.name)}
          </div>
          {c.name}
        </div>
      ),

      Email: c.email,
      Phone: c.phone,
      Location: c.location,
      Added: formatDate(c.created_at),
      Action: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
              <MoreVertical className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => onEditClick(c)}
              className="cursor-pointer"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDeleteClick(c)}
              className="text-red-600 cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={() => onSendMessage(c)}
              className="cursor-pointer"
            >
              Send Message
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }));
  }, [customers, onDeleteClick, onEditClick, formatDate]);
  return <CustomTable headers={headers} data={tableData} />;
};

export default CustomersTable;
