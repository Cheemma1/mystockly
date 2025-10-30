import React, { useMemo } from "react";
import CustomTable from "../../components/CustomTable";
import { Order } from "@/hooks/orders/interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateOrderStatusMutation } from "@/hooks/orders/useOrder";
import useFormatDate from "@/hooks/useFormatter";

interface CustomersProps {
  orders: Order[];
}

const OrderTable = ({ orders }: CustomersProps) => {
  const { updateOrderStatus } = useUpdateOrderStatusMutation();

  const formatDate = useFormatDate();
  const headers = [
    "OrderID",
    "Customer",
    "Date",
    "Items",
    "Total",
    "Status",
    "product",
    "Action",
  ];

  const tableData = useMemo(() => {
    return orders.map((c) => ({
      OrderID: `#${c.id.slice(-6)}`,
      Customer: c.customer_name,
      Items: c.order_items?.length || 0,
      Total: c.total_amount,
      Status: c.status,
      Date: formatDate(c.created_at),
      Action: (
        <div className="flex justify-end gap-2">
          <Select
            value={c.status}
            onValueChange={(status) =>
              updateOrderStatus({ orderId: c.id, status })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    }));
  }, [orders, updateOrderStatus, formatDate]);
  return <CustomTable headers={headers} data={tableData} />;
};

export default OrderTable;
