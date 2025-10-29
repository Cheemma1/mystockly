import DeleteCustomModal from "../../components/DeleteCustomModal";
import { Product } from "@/hooks/products/interface";
import { useDeleteProductMutation } from "@/hooks/products/useProducts";

interface DeleteProps {
  closeModal: () => void;
  product: Product | null;
}

const DeleteProductModal = ({ product }: DeleteProps) => {
  const { deleteProduct, isDeleting } = useDeleteProductMutation();

  const handleDelete = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!product?.id) return;

    deleteProduct(product.id);
  };

  return (
    <DeleteCustomModal
      entityName="product"
      itemLabel={product?.name}
      onConfirm={handleDelete}
      isDeleting={isDeleting}
    />
  );
};

export default DeleteProductModal;
