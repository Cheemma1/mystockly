"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, DollarSign, Package, Plus, TrendingUp } from "lucide-react";
import { useState } from "react";
import Heading from "../components/Heading";
import PrimaryButton from "../components/PrimaryButton";
import CardIcon from "../components/CardIcon";
import SearchInput from "../components/SearchInput";
import { useGetSalesQuery } from "@/hooks/sales/useSales";
import { useGetOrdersQuery } from "@/hooks/orders/useOrder";
import SalesTable from "./components/SalesTable";
import RecordSaleModal from "./components/RecordSaleModal";
import { Sale } from "@/hooks/sales/interface";

export default function SalesPage() {
  const [isRecordSale, setIsRecordSale] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);

  const { sales, loading: salesLoading } = useGetSalesQuery();
  const { orders, loading: ordersLoading } = useGetOrdersQuery();

  const loading = salesLoading || ordersLoading;

  const handleSearch = () => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) {
      setFilteredSales(sales);
      return;
    }

    const result = sales.filter(
      (sale) =>
        (sale.orders?.customer_name ?? "").toLowerCase().includes(search) ||
        (sale.order_id ?? "").toLowerCase().includes(search)
    );

    setFilteredSales(result);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate stats
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);

  const todaySales = sales
    .filter((sale) => {
      const saleDate = new Date(sale.created_at).toDateString();
      const today = new Date().toDateString();
      return saleDate === today;
    })
    .reduce((sum, sale) => sum + sale.amount, 0);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Heading
          headingText="Sales Tracker"
          paraText="Record and monitor your daily sales performance"
        />

        <Dialog open={isRecordSale} onOpenChange={setIsRecordSale}>
          <DialogTrigger asChild>
            <PrimaryButton label="Record Sale" icon={<Plus />} />
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Record New Sale</DialogTitle>
              <DialogDescription>
                Select a pending order to mark as completed and record the sale
              </DialogDescription>
            </DialogHeader>

            <RecordSaleModal closeModal={() => setIsRecordSale(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardIcon
          title="Total Sales"
          value={formatCurrency(totalSales)}
          icon={DollarSign}
          iconColor="#059669"
          iconBgColor="#ECFDF5"
          valueColor="#1F2937"
        />

        <CardIcon
          title="Today's Sales"
          value={formatCurrency(todaySales)}
          icon={TrendingUp}
          iconColor="#2563EB"
          iconBgColor="#EFF6FF"
          valueColor="#059669"
        />

        <CardIcon
          title="Total Orders"
          value={totalOrders}
          icon={Package}
          iconColor="#7C3AED"
          iconBgColor="#F5F3FF"
          valueColor="#1F2937"
        />

        <CardIcon
          title="Pending Orders"
          value={pendingOrders}
          icon={Calendar}
          iconColor="#EA580C"
          iconBgColor="#FFF7ED"
          valueColor="#EA580C"
        />
      </div>

      {/* Sales Table */}
      <div className="bg-white p-6 rounded-md">
        <div className="mb-2">
          <h1 className="md:text-2xl font-bold text-gray-900 mb-1">
            Recent Sales
          </h1>
          <p>Track your sales history and performance</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600" />
          </div>
        ) : (
          <>
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
              placeholder="Search sales by customer name or order ID"
            />

            <div className="mt-4">
              <SalesTable
                sales={filteredSales.length ? filteredSales : sales}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
