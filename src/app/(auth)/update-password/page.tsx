"use client";

import React, { useState } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePaswordMutation } from "@/hooks/auth/userAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UpdatePasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const { mutate: update, isPending } = useUpdatePaswordMutation();
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    update(
      { password },
      {
        onSuccess: () => {
          toast.success("Password successfully Updated!");
          router.push("/login");
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
            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
            <CardDescription>
              Please enter your new password below.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleForgotPassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="New password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-700 cursor-pointer"
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default UpdatePasswordPage;
