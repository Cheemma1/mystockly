import { Customer } from "@/hooks/customers/interface";
import { useDeleteCustomerMutation } from "@/hooks/customers/useCustomers";
import DeleteCustomModal from "../../components/DeleteCustomModal";

interface DeleteProps {
  closeModal: () => void;
  customer: Customer | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DeleteCustomerModal = ({ closeModal, customer }: DeleteProps) => {
  const { deleteCustomer, isDeleting } = useDeleteCustomerMutation();

  const handleDelete = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!customer?.id) return;

    deleteCustomer(customer.id);
  };

  return (
    <DeleteCustomModal
      entityName="customer"
      itemLabel={customer?.name}
      onConfirm={handleDelete}
      isDeleting={isDeleting}
    />
  );
};

export default DeleteCustomerModal;
