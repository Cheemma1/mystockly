"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";

import {
  Eye,
  Edit,
  Copy,
  ExternalLink,
  MessageSquare,
  Star,
  Clock,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

const OrderForm = () => {
  // Sample form data
  const formData = {
    businessName: "Amaka's Traditional Wears",
    description:
      "Premium African fashion and accessories for the modern Nigerian",
    logo: "/placeholder.svg",
    products: [
      {
        id: 1,
        name: "Premium Ankara Dress",
        price: 15000,
        image: "/placeholder.svg",
        description:
          "Beautiful hand-crafted Ankara dress perfect for special occasions",
        inStock: true,
      },
      {
        id: 2,
        name: "Traditional Agbada Set",
        price: 45000,
        image: "/placeholder.svg",
        description: "Complete traditional Agbada set with cap and accessories",
        inStock: true,
      },
      {
        id: 3,
        name: "Kente Accessories Collection",
        price: 8000,
        image: "/placeholder.svg",
        description: "Beautiful Kente-inspired accessories and jewelry",
        inStock: false,
      },
    ],
    contactInfo: {
      whatsapp: "+234 803 123 4567",
      instagram: "@amakas_wears",
      location: "Onitsha Main Market, Anambra State",
    },
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // generate slug from business name
  const businessSlug = slugify(formData.businessName);

  // your correct public link
  const dynamicLink = `https://mystockly.vercel.app/order-form/${businessSlug}`;

  const copyFormLink = () => {
    navigator.clipboard.writeText(dynamicLink);
    toast("Link Copied! 📋 Order form link copied to clipboard");
  };

  const shareToWhatsApp = () => {
    const message = `Check out our products and place your order easily: ${dynamicLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Form</h1>
          <p className="text-gray-600 mt-1">
            Create and share your public order form with customers
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={copyFormLink}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button
            onClick={shareToWhatsApp}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Share on WhatsApp
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-600" />
              Customize Your Form
            </CardTitle>
            <CardDescription>
              Edit your business details and product information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input id="business-name" defaultValue={formData.businessName} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Business Description</Label>
              <textarea id="description" defaultValue={formData.description} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                id="whatsapp"
                defaultValue={formData.contactInfo.whatsapp}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="instagram">Instagram Handle</Label>
              <Input
                id="instagram"
                defaultValue={formData.contactInfo.instagram}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                defaultValue={formData.contactInfo.location}
              />
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-3">Products</h3>
              <div className="space-y-3">
                {formData.products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{product.name}</h4>
                      <Badge
                        variant={product.inStock ? "default" : "secondary"}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.description}
                    </p>
                    <p className="font-semibold text-blue-600">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-3">
                Add Product
              </Button>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              Live Preview
            </CardTitle>
            <CardDescription>
              This is how customers will see your order form
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mock Phone Frame */}
            <div className="max-w-sm mx-auto bg-white border-4 border-gray-300 rounded-3xl overflow-hidden shadow-lg">
              <div className="bg-gray-100 p-3 text-center text-xs text-gray-600">
                📱 Customer View
              </div>

              <div className="p-4 space-y-4">
                {/* Business Header */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold">
                    AW
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {formData.businessName}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {formData.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span>📍</span>
                    <span>{formData.contactInfo.location}</span>
                  </div>
                </div>

                {/* Products */}
                <div className="space-y-3">
                  <h2 className="font-semibold text-gray-900">Our Products</h2>
                  {formData.products.map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg p-3 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <span className="font-bold text-blue-600 text-sm">
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge
                          variant={product.inStock ? "default" : "secondary"}
                          className="text-xs"
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
                            size="sm"
                            className="text-xs h-7 bg-blue-600 hover:bg-blue-700"
                          >
                            Order Now
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Section */}
                <div className="bg-green-50 rounded-lg p-3 space-y-2">
                  <h3 className="font-semibold text-blue-800">
                    Ready to Order?
                  </h3>
                  <p className="text-sm text-blue-700">
                    Contact us to place your order or ask questions!
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs"
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      WhatsApp
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                    >
                      <Star className="h-3 w-3 mr-1" />
                      Instagram
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Full Screen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Card */}
      <Card>
        <CardHeader>
          <CardTitle>Form Performance</CardTitle>
          <CardDescription>
            Track how your order form is performing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-600">156</h3>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-xs text-green-600 mt-1">+12% this week</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-2xl font-bold text-green-600">23</h3>
              <p className="text-sm text-gray-600">Orders This Week</p>
              <p className="text-xs text-green-600 mt-1">+8% vs last week</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <h3 className="text-2xl font-bold text-orange-600">14.7%</h3>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-xs text-orange-600 mt-1">Above average</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-600">₦78,400</h3>
              <p className="text-sm text-gray-600">Revenue Generated</p>
              <p className="text-xs text-green-600 mt-1">+25% growth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderForm;
