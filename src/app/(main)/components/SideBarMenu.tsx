"use client";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Users,
  TrendingUp,
  MessageSquare,
  FileText,
  BarChart3,
  Home,
  LogOut,
  Settings,
  Package,
  ShoppingCart,
} from "lucide-react";
import { useStore } from "@/store/useAuthstore";

interface SidebarContentProps {
  getIni: () => string;
  isOpen?: boolean;
  setIsOpen: (open: boolean) => void;
}

const SidebarContent = ({ getIni, setIsOpen }: SidebarContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useStore();

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await logout();
    router.push("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
    { id: "customers", label: "Customers", icon: Users, path: "/customers" },
    { id: "products", label: "Products", icon: Package, path: "/products" },
    { id: "orders", label: "Orders", icon: ShoppingCart, path: "/orders" },
    { id: "sales", label: "Sales", icon: TrendingUp, path: "/sales" },

    // {
    //   id: "templates",
    //   label: "Templates",
    //   icon: MessageSquare,
    //   path: "/templates",
    // },
    {
      id: "order-form",
      label: "Order Form",
      icon: FileText,
      path: "/order-form",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];
  return (
    <div className="flex flex-col h-full bg-white border-r">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">
          My<span className="text-blue-600">Stockly</span>
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start  cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {getIni()}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {user?.user_metadata?.display_name || "User"}
            </p>
            <p className="text-xs text-gray-600">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-100 cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
export default SidebarContent;
