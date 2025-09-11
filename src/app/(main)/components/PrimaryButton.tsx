import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
}

const PrimaryButton = ({ label, onClick, icon }: ButtonProps) => {
  return (
    <Button
      className="bg-blue-700 text-white cursor-pointer py-4"
      onClick={onClick}
    >
      {icon}
      {label}
    </Button>
  );
};

export default PrimaryButton;
