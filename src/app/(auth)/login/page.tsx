/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import AuthLayout from "../AuthLayout";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
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
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              //   type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              className="text-base"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              //   onClick={() => setShowPassword(!showPassword)}
            >
              {/* {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )} */}
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
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
          Log in with Google
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
