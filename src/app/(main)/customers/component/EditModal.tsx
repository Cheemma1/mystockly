"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateCustomerMutation } from "@/hooks/customers/useCustomers";
import { supabase } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}
interface EditProps {
  closeModal: () => void;
  customerId: string;
}

const EditModal = ({ closeModal, customerId }: EditProps) => {
  const [formData, setFormData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const { updateCustomer, isUpdating } = useUpdateCustomerMutation();

  // Fetch single customer for prefilling
  const { data } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("name, email, phone, address, notes")
        .eq("id", customerId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!customerId,
  });

  //  Prefill the form when data arrives
  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomer({ id: customerId, data: formData });
  };

  return (
    <div className="text-center ">
      <form className="grid gap-4 py-4" onSubmit={handleUpdate}>
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Customer's full name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="customer@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+234 xxx xxx xxxx"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Customer address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
            placeholder="Any important notes about this customer..."
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
          />
        </div>

        <Button
          onClick={closeModal}
          disabled={isUpdating}
          className="bg-blue-800 cursor-pointer"
        >
          {isUpdating ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default EditModal;
