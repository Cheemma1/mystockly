"use client";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, MessageSquare, Star, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useGetOrderFormBySlugQuery } from "@/hooks/orderForm/useOrderForm";

const PublicOrderForm = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { orderForm, isLoading, error } = useGetOrderFormBySlugQuery(slug);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleWhatsAppOrder = (productName: string) => {
    if (!orderForm?.whatsapp) return;

    const message = `Hi! I'd like to order: ${productName}`;
    const whatsappUrl = `https://wa.me/${orderForm.whatsapp.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading order form...</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !orderForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Order Form Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The order form you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Go to Homepage
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formData = {
    businessName: orderForm.business_name,
    bussinessDescription: orderForm.business_description,

    products: orderForm.products || [],
    contactInfo: {
      whatsapp: orderForm.whatsapp,
      instagram: orderForm.instagram,
      location: orderForm.location,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="max-w-sm mx-auto bg-white border-4 border-gray-300 rounded-3xl w-fulloverflow-hidden shadow-lg">
          <CardContent className="p-6 md:p-8">
            {/* Business Header */}
            <div className="text-center space-y-4 mb-8">
              <div className="w-24 h-24 bg-blue-700 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {formData.businessName.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {formData.businessName}
              </h1>
              <p className="text-sm text-gray-600">
                {formData.bussinessDescription}
              </p>
              {formData.contactInfo.location && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <span className="flex gap-2">
                    <MapPin className="h-5 w-5 text-blue-800" />
                    {formData.contactInfo.location}
                  </span>
                </div>
              )}
            </div>

            {/* Products Section */}
            <div className="space-y-3 w-full">
              <h2 className="text-xl font-semibold text-gray-900">
                Our Products
              </h2>

              {formData.products.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 w-full">
                  <p className="text-gray-500 text-lg">
                    No products available at the moment.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Please check back later or contact us directly.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 w-full">
                  {formData.products.map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg p-3 space-y-2"
                    >
                      <div className="p-4 space-y-3">
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
                              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                            >
                              Order Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Section */}
            <div className="mt-8 bg-blue-50 rounded-lg p-4 space-y-4">
              <h3 className="font-bold text-xl text-blue-800">
                Ready to Order?
              </h3>
              <p className="text-blue-700">
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
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
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
                    className="cursor-pointer"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Instagram: {formData.contactInfo.instagram}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          {/* Footer */}
          <div className="text-center mt-2 text-sm text-gray-500">
            <p>
              Powered by{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                Mystockly
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PublicOrderForm;
