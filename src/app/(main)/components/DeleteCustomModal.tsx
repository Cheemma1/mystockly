import { Button } from "@/components/ui/button";

interface DeleteCustomProps {
  entityName?: string;
  itemLabel?: string;
  isDeleting: boolean;
  onConfirm: (e?: React.FormEvent) => void;
}

const DeleteCustomModal = ({
  entityName,
  itemLabel,
  isDeleting = false,
  onConfirm,
}: DeleteCustomProps) => {
  return (
    <div className="text-center">
      <p className="font-normal mb-2">
        Are you sure you want to delete{" "}
        <span className="font-bold">{itemLabel}</span> from {entityName}
      </p>

      <Button onClick={onConfirm} className="bg-blue-800 cursor-pointer">
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};

export default DeleteCustomModal;
