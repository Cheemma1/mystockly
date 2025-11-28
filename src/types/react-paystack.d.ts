declare module "react-paystack" {
  export interface PaystackProps {
    email: string;
    amount: number;
    publicKey: string;
    text?: string;
    onSuccess?: (reference: PaystackReference) => void;
    onClose?: () => void;
    metadata?: Record<string, unknown>;
    currency?: string;
    reference?: string;
    channels?: string[];
    className?: string;
  }

  export interface PaystackReference {
    reference: string;
    trans: string;
    status: string;
    message: string;
    transaction: string;
    trxref: string;
  }

  export const PaystackButton: React.ComponentType<PaystackProps>;
  export const usePaystackPayment: (
    config: PaystackProps
  ) => (
    onSuccess?: (reference: PaystackReference) => void,
    onClose?: () => void
  ) => void;
}
