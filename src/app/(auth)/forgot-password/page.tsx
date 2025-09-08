"use client";

import React, { useState } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPaswordMutation } from "@/hooks/auth/userAuth";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  // const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const { mutate: forgot, isPending } = useForgotPaswordMutation();
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    forgot(
      { email },
      {
        onSuccess: () => {
          toast.success("Reset email sent successfully!");
          // router.push("/update-password");
        },
        onError: (error) => {
          toast.error(error?.message || "Something went wrong");
        },
      }
    );
  };
  return (
    <div className="min-h-screen flex flex-col bg-ccc">
      <main className="flex-grow flex flex-col items-center justify-center px-4  pt-16 mb-6">
        <Card className="shadow-xl w-full max-w-md px-6 py-4 ">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl ">Reset Your Password</CardTitle>
            <CardDescription>
              Type in your email and we&apos;ll send you a link to reset your
              password
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleForgotPassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-700 cursor-pointer"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send reset email"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
