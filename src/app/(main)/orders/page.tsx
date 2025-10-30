/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock, Package, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Heading from "../components/Heading";
import PrimaryButton from "../components/PrimaryButton";
import CreateOrder from "./components/CreateOrder";
import SearchInput from "../components/SearchInput";
import { useGetOrdersQuery } from "@/hooks/orders/useOrder";
import { Order } from "@/hooks/orders/interface";
import OrderTable from "./components/OrderTable";
import CardIcon from "../components/CardIcon";

const OrderPage = () => {
  const [IsCreateOrder, setIsCreateOrder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [filteredOrder, setFilteredOrder] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { orders, loading } = useGetOrdersQuery();
  useEffect(() => {
    if (!searchTerm.trim() && hasSearched) {
      setFilteredOrder(orders);
      setHasSearched(false);
    }
  }, [searchTerm, hasSearched, orders]);

  const handleSearch = () => {
    setHasSearched(true);

    const search = searchTerm.trim().toLowerCase();
    if (!search) {
      setFilteredOrder(orders);
      return;
    }

    const result = orders.filter(
      (c) =>
        (c.id ?? "").toLowerCase().includes(search) ||
        (c.customer_name ?? "").toLowerCase().includes(search) ||
        (c.status ?? "").toLowerCase().includes(search)
    );

    setFilteredOrder(result);
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  ).length;
  const totalRevenue = orders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.total_amount, 0);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Heading
          headingText="Orders"
          paraText="Manage customer orders and track sales"
        />

        <Dialog open={IsCreateOrder} onOpenChange={setIsCreateOrder}>
          <DialogTrigger asChild>
            <PrimaryButton label="Create Order" icon={<Plus />} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogTitle>Create New Order</DialogTitle>

            <CreateOrder closeModal={() => setIsCreateOrder(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardIcon
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingCart}
          iconColor="#2563EB"
          iconBgColor="#EFF6FF"
          valueColor="#1F2937"
        />

        <CardIcon
          title="Pending Orders"
          value={pendingOrders}
          icon={Clock}
          iconColor="#EA580C"
          iconBgColor="#FFF7ED"
          valueColor="#EA580C"
        />

        <CardIcon
          title="Completed Orders"
          value={completedOrders}
          icon={Package}
          iconColor="#059669"
          iconBgColor="#ECFDF5"
          valueColor="#059669"
        />

        <CardIcon
          title="Total Revenue"
          value={totalRevenue}
          icon={ShoppingCart}
          iconColor="#059669"
          iconBgColor="#ECFDF5"
          valueColor="#059669"
        />
      </div>

      <div className="bg-white p-6 rounded-md ">
        <div className="mb-2">
          <h1 className=" md:text-2xl font-bold text-gray-900 mb-1">Orders</h1>
          <p>Manage customer orders and update status</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600" />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-6">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
              placeholder="Search orders by customer name or  status.."
            />

            <OrderTable
              orders={filteredOrder.length ? filteredOrder : orders}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
