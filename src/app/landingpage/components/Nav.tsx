"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const sections = [
    { navTitle: "Features", links: "#features" },

    { navTitle: "Pricing", links: "#pricing" },
    { navTitle: "FAQ", links: "#faq" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between p-6 ">
      <div className="text-2xl font-bold text-gray-900">
        My<span className="text-blue">Stockly</span>
      </div>

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
        >
          Login
        </Button>

        <Button className="text-white border-blue cursor-pointer bg-blue">
          SignUp
        </Button>
      </div>

      <Menu
        className="cursor-pointer block md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="flex md:hidden gap-10 flex-col  bg-white fixed left-0   top-0 w-[300px]   pt-8 bottom-0 px-6  insert-0 h-svh ">
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
            >
              Login
            </Button>

            <Button className="text-white border-blue cursor-pointer bg-blue">
              SignUp
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
