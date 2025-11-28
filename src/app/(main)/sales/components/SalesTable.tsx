import { useMemo } from "react";
import CustomTable from "../../components/CustomTable";
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

  // Define table headers
  const headers = [
    "Date & Time",
    "Customer",
    "Order Details",
    "Amount",
    "Status",
  ];

  // Transform sales data for CustomTable
  const tableData = useMemo(() => {
    return sales.map((sale) => ({
      "Date & Time": (
        <div className="text-sm min-w-[120px]">
          <p className="font-medium">{formatDate(sale.created_at)}</p>
          <p className="text-gray-600">{formatTime(sale.created_at)}</p>
        </div>
      ),
      Customer: (
        <div className="flex items-center space-x-2 min-w-[150px]">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {sale.orders?.customer_name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "U"}
          </div>
          <span className="font-medium truncate">
            {sale.orders?.customer_name || "Unknown Customer"}
          </span>
        </div>
      ),
      "Order Details": (
        <div className="min-w-[120px]">
          <p className="font-medium">Order #{sale.order_id.substring(0, 8)}</p>
          {sale.orders?.order_items && (
            <p className="text-sm text-gray-600">
              {sale.orders.order_items.length} item(s)
            </p>
          )}
        </div>
      ),
      Amount: (
        <span className="font-bold text-green-600 min-w-[100px] inline-block">
          {formatCurrency(sale.amount)}
        </span>
      ),
      Status: (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Completed
        </Badge>
      ),
    }));
  }, [sales, formatDate]);

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

  return <CustomTable headers={headers} data={tableData} />;
};

export default SalesTable;
