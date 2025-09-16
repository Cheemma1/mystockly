import { Button } from "@/components/ui/button";
import { Customer } from "@/hooks/customers/interface";
import React from "react";

interface DeleteProps {
  closeModal: () => void;
  customer: Customer | null;
}

const DeleteCustomerModal = ({ closeModal, customer }: DeleteProps) => {
  return (
    <div className="text-center">
      <p className="font-normal mb-2">
        Are you sure you want to delete{" "}
        <span className="font-bold">{customer?.name}</span> from your customers?
      </p>

      <Button onClick={closeModal} className="bg-blue-800 cursor-pointer">
        Delete
      </Button>
    </div>
  );
};

export default DeleteCustomerModal;
