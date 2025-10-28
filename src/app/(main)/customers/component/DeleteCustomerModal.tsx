import { Button } from "@/components/ui/button";
import { Customer } from "@/hooks/customers/interface";
import { useDeleteCustomerMutation } from "@/hooks/customers/useCustomers";
import React from "react";

interface DeleteProps {
  closeModal: () => void;
  customer: Customer | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DeleteCustomerModal = ({ closeModal, customer }: DeleteProps) => {
  const { deleteCustomer, isDeleting } = useDeleteCustomerMutation();

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer?.id) return;

    deleteCustomer(customer.id);
  };

  return (
    <div className="text-center">
      <p className="font-normal mb-2">
        Are you sure you want to delete{" "}
        <span className="font-bold">{customer?.name}</span> from your customers?
      </p>

      <Button onClick={handleDelete} className="bg-blue-800 cursor-pointer">
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};

export default DeleteCustomerModal;
