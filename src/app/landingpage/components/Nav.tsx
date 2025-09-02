"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Nav() {
  const router = useRouter();
  const sections = [
    { navTitle: "", links: "#features" },

    { navTitle: "Features", links: "#features" },

    { navTitle: "Pricing", links: "#pricing" },
    { navTitle: "FAQ", links: "#faq" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between p-6 fixed top-0 right-0 left-0 z-50 bg-white shadow-md">
      <Link className="text-2xl font-bold text-gray-900 " href="/">
        My<span className="text-blue">Stockly</span>
      </Link>

      <div className="hidden md:flex items-center gap-4 ">
        {sections.map((item) => (
          <Link
            href={item.links}
            key={item.navTitle}
            className="text-base hover:text-blue text-gray-600"
          >
            {item.navTitle}
          </Link>
        ))}

        <Button
          variant="outline"
          className="text-blue border-blue cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>

        <Button
          className="text-white border-blue cursor-pointer bg-blue"
          onClick={() => router.push("/signup")}
        >
          SignUp
        </Button>
      </div>

      <Menu
        className="cursor-pointer block md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="flex md:hidden gap-10 flex-col  bg-white fixed left-0   top-0 w-[300px]   pt-8 bottom-0 px-6  insert-0 h-svh z-10">
          <X
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-4 top- 0 cursor-pointer"
          />
          <div className="flex  gap-10 flex-col  pt-20">
            {sections.map((item) => (
              <Link
                href={item.links}
                key={item.navTitle}
                className="text-base hover:text-blue text-gray-600"
              >
                {item.navTitle}
              </Link>
            ))}

            <Button
              variant="outline"
              className="text-blue border-blue cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>

            <Button
              className="text-white border-blue cursor-pointer bg-blue"
              onClick={() => router.push("/signup")}
            >
              SignUp
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
