"use client";
import { Button } from "@/components/ui/button";
import { List, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const sections = [
    { navTitle: "Features", links: "#features" },
    { navTitle: "How-It-Works", links: "#how-it-works" },
    { navTitle: "Pricing", links: "#pricing" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between p-6 ">
      <div className="text-2xl font-bold text-gray-900">
        My<span className="text-green-600">Stockly</span>
      </div>

      <div className="hidden md:flex items-center gap-4 ">
        {sections.map((item) => (
          <Link
            href={item.links}
            key={item.navTitle}
            className="text-base hover:text-green-600 text-gray-600"
          >
            {item.navTitle}
          </Link>
        ))}

        <Button
          variant="outline"
          className="text-green-600 border-green-600 cursor-pointer"
        >
          Login
        </Button>

        <Button className="text-white border-green-600 cursor-pointer bg-green-600">
          SignUp
        </Button>
      </div>

      <Menu
        className="cursor-pointer block md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="flex md:hidden gap-10 flex-col  bg-white absolute  left-0   top-0 w-[300px] h-full  pt-8 px-6  z-50 ">
          <X
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-4 top- 0 cursor-pointer"
          />
          <div className="flex  gap-10 flex-col  pt-20">
            {sections.map((item) => (
              <Link
                href={item.links}
                key={item.navTitle}
                className="text-base hover:text-green-600 text-gray-600"
              >
                {item.navTitle}
              </Link>
            ))}

            <Button
              variant="outline"
              className="text-green-600 border-green-600 cursor-pointer"
            >
              Login
            </Button>

            <Button className="text-white border-green-600 cursor-pointer bg-green-600">
              SignUp
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
