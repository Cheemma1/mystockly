"use client";

import { PaystackButton as Paystack } from "react-paystack";
import { Button } from "@/components/ui/button";

interface PaystackButtonProps {
  amount: number;
  email: string;
  plan?: string;
  buttonText?: string;
  className?: string;
  onSuccess?: (reference: any) => void;
  onClose?: () => void;
}

const PaystackButton = ({
  amount,
  email,
  plan,
  buttonText = "Pay Now",
  className,
  onSuccess,
  onClose,
}: PaystackButtonProps) => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  const componentProps = {
    email,
    amount: amount * 100, // Paystack expects amount in kobo
    publicKey,
    text: buttonText,
    onSuccess: (reference: any) => {
      if (onSuccess) {
        onSuccess(reference);
      }
    },
    onClose: () => {
      if (onClose) {
        onClose();
      }
    },
  };

  if (!publicKey) {
    return (
      <Button disabled className={className} variant="destructive">
        Missing Public Key
      </Button>
    );
  }

  // @ts-ignore - react-paystack types might be tricky with the component usage
  return (
    <Paystack
      {...componentProps}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${className}`}
    />
  );
};

export default PaystackButton;
