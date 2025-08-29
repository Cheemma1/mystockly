import { Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-32 bg-gray-900 text-white">
      <div className=" px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              My<span className="text-blue">Stockly</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering entrepreneurs with modern tools to track sales, manage
              customers, and grow their WhatsApp/Instagram businesses.
            </p>
            <div className="flex space-x-4">
              <Instagram />
              <Twitter />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue  transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between md:items-center">
          <p className="text-gray-400 text-sm">
            © 2025 MyStockly. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-400 text-sm">
              Contact: +234 (0) 8146629521 | mystockly@gmail.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
