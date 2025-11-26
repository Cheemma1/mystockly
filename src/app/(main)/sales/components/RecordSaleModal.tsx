import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Package, CheckCircle } from "lucide-react";
import { useGetOrdersQuery } from "@/hooks/orders/useOrder";
import { useRecordSaleMutation } from "@/hooks/sales/useSales";
import { useUpdateOrderStatusMutation } from "@/hooks/orders/useOrder";

interface RecordSaleModalProps {
  closeModal: () => void;
}

const RecordSaleModal = ({ closeModal }: RecordSaleModalProps) => {
  const [selectedOrder, setSelectedOrder] = useState<string>("");
  const { orders } = useGetOrdersQuery();
  const { recordSaleAsync, isRecording } = useRecordSaleMutation();
  const { updateOrderStatusAsync, isUpdating } = useUpdateOrderStatusMutation();

  const pendingOrders = orders.filter((order) => order.status === "pending");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRecordSale = async () => {
    if (!selectedOrder) return;

    try {
      const order = orders.find((o) => o.id === selectedOrder);
      if (!order) return;

      // Record the sale
      await recordSaleAsync({
        order_id: order.id,
        amount: order.total_amount,
      });

      // Update order status to completed
      await updateOrderStatusAsync({
        orderId: order.id,
        status: "completed",
      });

      closeModal();
    } catch (error) {
      console.error("Error recording sale:", error);
    }
  };

  const selectedOrderData = orders.find((o) => o.id === selectedOrder);

  return (
    <div className="space-y-4">
      {pendingOrders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="font-medium">No pending orders to complete</p>
          <p className="text-sm mt-1">Create orders first to record sales</p>
        </div>
      ) : (
        <>
          <div>
            <Label htmlFor="order-select">Select Order to Complete</Label>
            <Select value={selectedOrder} onValueChange={setSelectedOrder}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose a pending order" />
              </SelectTrigger>
              <SelectContent>
                {pendingOrders.map((order) => (
                  <SelectItem key={order.id} value={order.id}>
                    {order.customer_name} - {formatCurrency(order.total_amount)}
                    <span className="ml-2 text-gray-500">
                      ({formatDate(order.created_at)})
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedOrderData && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                Order Details
              </h4>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Customer:</strong> {selectedOrderData.customer_name}
                </p>
                <p>
                  <strong>Total Amount:</strong>{" "}
                  {formatCurrency(selectedOrderData.total_amount)}
                </p>
                <p>
                  <strong>Items:</strong>{" "}
                  {selectedOrderData.order_items?.length || 0} item(s)
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {formatDate(selectedOrderData.created_at)}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              onClick={handleRecordSale}
              disabled={!selectedOrder || isRecording || isUpdating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {isRecording || isUpdating
                ? "Recording..."
                : "Complete Order & Record Sale"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecordSaleModal;
