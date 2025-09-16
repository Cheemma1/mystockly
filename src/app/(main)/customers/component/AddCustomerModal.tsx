import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddCustomerMutation } from "@/hooks/customers/useCustomers";
import { useState } from "react";
import { toast } from "sonner";

const AddCustomerModal = ({ closeModal }: { closeModal: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const { addCustomer, isAdding } = useAddCustomerMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.name.trim() || !formData.phone.trim()) {
        toast.error("Name and phone are required.");
        return;
      }

      await addCustomer(formData);
      closeModal(); // close on success
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Add customer error:", err);
      toast.error("Failed to add customer.");
    }
  };

  return (
    <div>
      {/* Form Fields */}

      <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
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
          type="submit"
          disabled={isAdding}
          className="bg-blue-700 cursor-pointer"
        >
          {" "}
          {isAdding ? "Adding Customer..." : "Add customer"}
        </Button>
      </form>
    </div>
  );
};

export default AddCustomerModal;
