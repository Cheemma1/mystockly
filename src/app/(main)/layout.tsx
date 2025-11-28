// app/dashboard/layout.tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useStore } from "@/store/useAuthstore";
import SidebarContent from "./components/SideBarMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getUserInitials = () => {
    const displayName = user?.user_metadata?.display_name || "";
    const parts = displayName.trim().split(" ");

    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    return displayName.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 fixed left-0 top-0 h-full">
        <SidebarContent
          getIni={getUserInitials}
          isOpen={isMobileMenuOpen}
          setIsOpen={setIsMobileMenuOpen}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          {/* Accessibility: Hidden title and description for screen readers */}
          <SheetTitle className="sr-only">Main Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Mobile sidebar menu
          </SheetDescription>

          <SidebarContent
            getIni={getUserInitials}
            isOpen={isMobileMenuOpen}
            setIsOpen={setIsMobileMenuOpen}
          />
        </SheetContent>
      </Sheet>

      <div className="flex-1 lg:ml-64 overflow-x-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b p-4 flex items-center justify-between">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <Menu className="h-6 w-6 cursor-pointer" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <h1 className="text-xl font-bold text-gray-900">
            My<span className="text-blue-600">Stockly</span>
          </h1>

          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {getUserInitials()}
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 md:p-6 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}
