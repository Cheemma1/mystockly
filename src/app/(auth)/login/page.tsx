"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import AuthLayout from "../AuthLayout";
import { useLoginMutation } from "@/hooks/auth/userAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLoginMutation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Logged in successfully!.");
          router.push("/dashboard");
        },
        onError: (error) => {
          toast.error(error?.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <AuthLayout>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-base"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      {/* <div className="flex items-center gap-2 my-4 px-6">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="text-xs text-gray-500">OR</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <div className="">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-gray-300 cursor-pointer"
          //   onClick={handleGoogleLogin}
        >
          Log in with Google
        </Button>
      </div> */}

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-700 underline">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
