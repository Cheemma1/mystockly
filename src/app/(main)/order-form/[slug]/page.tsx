"use client";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, MessageSquare, Star, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

// This would normally come from your database/API
// For now, using mock data structure
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

interface OrderFormData {
  businessName: string;
  bussinessDescription: string;
  logo: string;
  products: Product[];
  contactInfo: {
    whatsapp: string;
    instagram: string;
    location: string;
  };
}

const PublicOrderForm = () => {
  const params = useParams();
  const slug = params.slug as string;

  // TODO: Fetch order form data based on slug from your database
  // For now, showing a placeholder
  const formData: OrderFormData = {
    businessName: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    bussinessDescription: "Welcome to our store! Browse our products below.",
    logo: "",
    products: [],
    contactInfo: {
      whatsapp: "",
      instagram: "",
      location: "",
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleWhatsAppOrder = (productName: string) => {
    const message = `Hi! I'd like to order: ${productName}`;
    const whatsappUrl = `https://wa.me/${formData.contactInfo.whatsapp.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-xl">
          <CardContent className="p-6 md:p-8">
            {/* Business Header */}
            <div className="text-center space-y-4 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {formData.businessName.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {formData.businessName}
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {formData.bussinessDescription}
              </p>
              {formData.contactInfo.location && (
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{formData.contactInfo.location}</span>
                </div>
              )}
            </div>

            {/* Products Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Our Products</h2>

              {formData.products.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-gray-500 text-lg">
                    No products available at the moment.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Please check back later or contact us directly.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {formData.products.map((product) => (
                    <Card
                      key={product.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">
                            {product.name}
                          </h3>
                          <span className="font-bold text-blue-600 text-lg">
                            {formatCurrency(product.price)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center pt-2">
                          <Badge
                            variant={product.inStock ? "default" : "secondary"}
                          >
                            {product.inStock ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Available
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3 mr-1" />
                                Out of Stock
                              </>
                            )}
                          </Badge>
                          {product.inStock && (
                            <Button
                              onClick={() => handleWhatsAppOrder(product.name)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Order Now
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Section */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-xl text-gray-900">
                Ready to Order?
              </h3>
              <p className="text-gray-700">
                Contact us to place your order or ask questions!
              </p>
              <div className="flex flex-wrap gap-3">
                {formData.contactInfo.whatsapp && (
                  <Button
                    onClick={() =>
                      window.open(
                        `https://wa.me/${formData.contactInfo.whatsapp.replace(
                          /[^0-9]/g,
                          ""
                        )}`,
                        "_blank"
                      )
                    }
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp: {formData.contactInfo.whatsapp}
                  </Button>
                )}
                {formData.contactInfo.instagram && (
                  <Button
                    onClick={() =>
                      window.open(
                        `https://instagram.com/${formData.contactInfo.instagram.replace(
                          "@",
                          ""
                        )}`,
                        "_blank"
                      )
                    }
                    variant="outline"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Instagram: {formData.contactInfo.instagram}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Powered by{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Mystockly
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicOrderForm;
