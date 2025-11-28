import React, { useMemo } from "react";
import CustomTable from "../../components/CustomTable";
import { Order } from "@/hooks/orders/interface";

import useFormatDate from "@/hooks/useFormatter";

interface CustomersProps {
  orders: Order[];
}

const OrderTable = ({ orders }: CustomersProps) => {
  const formatDate = useFormatDate();
  const headers = [
    "OrderID",
    "Customer",
    "Date",
    "Items",
    "Total",
    "Status",
    "Product",
  ];

  const tableData = useMemo(() => {
    return orders.map((c) => ({
      OrderID: `#${c.id.slice(-6)}`,
      Customer: c.customer_name,
      Items: c.order_items?.length || 0,
      Total: c.total_amount,
      Status: c.status,
      Product: c.product,
      Date: formatDate(c.created_at),
    }));
  }, [orders, formatDate]);
  return <CustomTable headers={headers} data={tableData} />;
};

export default OrderTable;
