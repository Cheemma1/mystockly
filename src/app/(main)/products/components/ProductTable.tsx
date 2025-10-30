import { useMemo } from "react";
import CustomTable from "../../components/CustomTable";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Product } from "@/hooks/products/interface";
import useFormatDate from "@/hooks/useFormatter";

interface CustomersProps {
  products: Product[];
  onDeleteClick: (c: Product) => void;
  onEditClick: (c: Product) => void;
}

const ProductTable = ({
  products,
  onDeleteClick,
  onEditClick,
}: CustomersProps) => {
  const formatDate = useFormatDate();
  const headers = [
    "ProductName",
    "Price",
    "Category",
    "description",
    "Quantity",
    "Action",
  ];

  const tableData = useMemo(() => {
    return products.map((c) => ({
      Price: c.price,
      ProductName: c.name,
      Quantity: c.stock_quantity,
      description: c.description || "--",
      Category: c.category,
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
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }));
  }, [products, onDeleteClick, onEditClick, formatDate]);
  return <CustomTable headers={headers} data={tableData} />;
};

export default ProductTable;
