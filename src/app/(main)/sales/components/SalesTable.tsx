import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { Sale } from "@/hooks/sales/interface";
import useFormatDate from "@/hooks/useFormatter";

interface SalesTableProps {
  sales: Sale[];
}

const SalesTable = ({ sales }: SalesTableProps) => {
  const formatDate = useFormatDate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (sales.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="font-medium">No sales recorded yet</p>
        <p className="text-sm mt-1">
          Sales will appear here when orders are completed
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Order Details</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>
                <div className="text-sm">
                  <p className="font-medium">{formatDate(sale.created_at)}</p>
                  <p className="text-gray-600">{formatTime(sale.created_at)}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {sale.orders?.customer_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </div>
                  <span className="font-medium">
                    {sale.orders?.customer_name || "Unknown Customer"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">
                    Order #{sale.order_id.substring(0, 8)}
                  </p>
                  {sale.orders?.order_items && (
                    <p className="text-sm text-gray-600">
                      {sale.orders.order_items.length} item(s)
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="font-bold text-green-600">
                  {formatCurrency(sale.amount)}
                </span>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Completed
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SalesTable;
