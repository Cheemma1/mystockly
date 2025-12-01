// "use client";

// import dynamic from "next/dynamic";
// import { Button } from "@/components/ui/button";

// export interface PaystackReference {
//   reference: string;
//   trans: string;
//   status: string;
//   message: string;
//   transaction: string;
//   trxref: string;
// }

// interface PaystackButtonProps {
//   amount: number;
//   email: string;
//   plan?: string;
//   buttonText?: string;
//   className?: string;
//   onSuccess?: (reference: PaystackReference) => void;
//   onClose?: () => void;
// }

// // Dynamically import Paystack with no SSR
// const PaystackComponent = dynamic(
//   () => import("react-paystack").then((mod) => mod.PaystackButton),
//   {
//     ssr: false,
//     loading: () => (
//       <Button disabled className="w-full">
//         Loading...
//       </Button>
//     ),
//   }
// );

// const PaystackButton = ({
//   amount,
//   email,
//   plan,
//   buttonText = "Pay Now",
//   className,
//   onSuccess,
//   onClose,
// }: PaystackButtonProps) => {
//   const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

//   const componentProps = {
//     email,
//     amount: amount * 100, // Paystack expects amount in kobo
//     publicKey,
//     text: buttonText,
//     onSuccess: (reference: PaystackReference) => {
//       if (onSuccess) {
//         onSuccess(reference);
//       }
//     },
//     onClose: () => {
//       if (onClose) {
//         onClose();
//       }
//     },
//   };

//   if (!publicKey) {
//     return (
//       <Button disabled className={className} variant="destructive">
//         Missing Public Key
//       </Button>
//     );
//   }

//   return (
//     <PaystackComponent
//       {...componentProps}
//       className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${className}`}
//     />
//   );
// };

// export default PaystackButton;
"use client";

import { Button } from "@/components/ui/button";

export interface PaystackReference {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
}

interface PaystackButtonProps {
  amount: number;
  email: string;
  plan?: string;
  buttonText?: string;
  className?: string;
  onSuccess?: (reference: PaystackReference) => void;
  onClose?: () => void;
}

interface PaystackPopSetup {
  setup(options: {
    key: string;
    email: string;
    amount: number;
    plan?: string;
    callback: (response: PaystackReference) => void;
    onClose: () => void;
  }): { openIframe: () => void };
}

declare global {
  interface Window {
    PaystackPop: PaystackPopSetup;
  }
}

export default function PaystackButton({
  amount,
  email,
  plan,
  buttonText = "Pay Now",
  className,
  onSuccess,
  onClose,
}: PaystackButtonProps) {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";

  const pay = () => {
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: amount * 100,
      plan, // optional
      callback: (response: PaystackReference) => {
        onSuccess?.(response);
      },
      onClose: () => {
        onClose?.();
      },
    });

    handler.openIframe();
  };

  if (!publicKey) {
    return (
      <Button disabled className={className} variant="destructive">
        Missing Public Key
      </Button>
    );
  }

  return (
    <Button onClick={pay} className={className}>
      {buttonText}
    </Button>
  );
}
