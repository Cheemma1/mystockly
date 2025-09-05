"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "../AuthLayout";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useSignUpMutation } from "@/hooks/auth/userAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [businessName, setBusinessName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate: SignUp, isPending, error } = useSignUpMutation();
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    SignUp(
      { email, password, businessName },
      {
        onSuccess: () => {
          toast.success("Account created successfully! check your email.");
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
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="business-name">Business Name</Label>
          <Input
            id="business-name"
            placeholder="Your Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>
        {error && <p className="text-red-500">{error.message}</p>}
      </form>

      <div className="flex items-center gap-2 my-4 px-6">
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
          {/* <Google size={20} /> */}
          SignUp with Google
        </Button>
      </div>

      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Log in
        </a>
      </p>
    </AuthLayout>
  );
}
