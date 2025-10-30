/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useGetProductsQuery } from "@/hooks/products/useProducts";

import { toast } from "sonner";
import { useCreateOrderMutation } from "@/hooks/orders/useOrder";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCustomersQuery } from "@/hooks/customers/useCustomers";
import { Button } from "@/components/ui/button";

const CreateOrder = ({ closeModal }: { closeModal: () => void }) => {
  const { products } = useGetProductsQuery();
  const { createOrder, isCreating } = useCreateOrderMutation();

  const { customers } = useGetCustomersQuery();
  const [selectedProducts, setSelectedProducts] = useState<
    { id: string; quantity: number }[]
  >([]);
  const [orderForm, setOrderForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_id: "",
  });

  const handleCreateOrder = async () => {
    if (selectedProducts.length === 0 || !orderForm.customer_name) {
      toast.error("Please select products and enter a customer name");
      return;
    }

    try {
      const orderItems = selectedProducts.map((sp) => {
        const product = products.find((p) => p.id === sp.id);
        if (!product) throw new Error("Product not found");

        return {
          product_id: product.id,
          product_name: product.name,
          quantity: sp.quantity,
          unit_price: product.price,
          total_price: product.price * sp.quantity,
        };
      });

      await createOrder({
        customer_name: orderForm.customer_name,
        customer_email: orderForm.customer_email,
        customer_phone: orderForm.customer_phone,
        customer_id: orderForm.customer_id || undefined,
        items: orderItems,
      });

      toast.success("Order created successfully");
      closeModal();
      // Reset state after creation
      setSelectedProducts([]);
      setOrderForm({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        customer_id: "",
      });
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast.error(error.message || "Failed to create order");
    }
  };

  const addProductToOrder = (productId: string) => {
    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.id === productId);
      if (existing) {
        return prev.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeProductFromOrder = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateProductQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeProductFromOrder(productId);
      return;
    }
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity } : p))
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="customer-name">Customer Name *</Label>
        <Input
          id="customer-name"
          value={orderForm.customer_name}
          onChange={(e) =>
            setOrderForm({ ...orderForm, customer_name: e.target.value })
          }
          placeholder="Enter customer name"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="customer-phone">Phone</Label>
        <Input
          id="customer-phone"
          value={orderForm.customer_phone}
          onChange={(e) =>
            setOrderForm({ ...orderForm, customer_phone: e.target.value })
          }
          placeholder="Enter phone number"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="customer-email">Email</Label>
        <Input
          id="customer-email"
          type="email"
          value={orderForm.customer_email}
          onChange={(e) =>
            setOrderForm({ ...orderForm, customer_email: e.target.value })
          }
          placeholder="Enter email address"
        />
      </div>
      {customers.length > 0 && (
        <div className="grid gap-2">
          <Label htmlFor="existing-customer">Or Select Existing Customer</Label>
          <Select
            value={orderForm.customer_id}
            onValueChange={(value) => {
              const customer = customers.find((c) => c.id === value);
              if (customer) {
                setOrderForm({
                  customer_name: customer.name,
                  customer_email: customer.email || "",
                  customer_phone: customer.phone || "",
                  customer_id: customer.id,
                });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select existing customer" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {customers.map((customer) => (
                <SelectItem
                  key={customer.id}
                  value={customer.id}
                  className="w-full"
                >
                  {customer.name} - {customer.phone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Product list */}
      <div className="space-y-2">
        <h3 className="font-medium">Products</h3>
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between border rounded-md p-2"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">₦{p.price}</p>
            </div>
            <button
              onClick={() => addProductToOrder(p.id)}
              className="bg-blue-600 text-white px-3 py-1 rounded-md"
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Selected products summary */}
      {selectedProducts.length > 0 && (
        <div className="mt-4 border-t pt-3">
          <h4 className="font-medium mb-2">Selected Products</h4>
          {selectedProducts.map((sp) => {
            const product = products.find((p) => p.id === sp.id);
            if (!product) return null;
            return (
              <div
                key={sp.id}
                className="flex items-center justify-between py-1"
              >
                <span>{product.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateProductQuantity(sp.id, sp.quantity - 1)
                    }
                    className="px-2 border rounded"
                  >
                    -
                  </button>
                  <span>{sp.quantity}</span>
                  <button
                    onClick={() =>
                      updateProductQuantity(sp.id, sp.quantity + 1)
                    }
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeProductFromOrder(sp.id)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create order button */}
      <Button
        onClick={handleCreateOrder}
        disabled={isCreating}
        className="mt-4 bg-blue-700 text-white w-full py-2 rounded-md disabled:opacity-50 cursor-pointer"
      >
        {isCreating ? "Creating order..." : "Create Order"}
      </Button>
    </div>
  );
};
export default CreateOrder;
