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
import { MapPin, Package, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useState } from "react";
import { useGetProductsQuery } from "@/hooks/products/useProducts";

const OrderForm = () => {
  const { products: availableProducts, isLoading: productsLoading } =
    useGetProductsQuery();
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const [formData, setFormData] = useState({
    businessName: "",
    bussinessDescription: "",
    logo: "",
    products: [] as Array<{
      id: string;
      name: string;
      price: number;
      image: string;
      description: string;
      inStock: boolean;
    }>,
    contactInfo: {
      whatsapp: "",
      instagram: "",
      location: "",
    },
  });
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();

    toast("Changes saved successfully!");
    console.log(formData);
  };

  const handleAddProduct = () => {
    const selectedProduct = availableProducts.find(
      (p) => p.id === selectedProductId
    );

    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }

    // Check if product already exists in form
    if (formData.products.some((p) => p.id === selectedProduct.id)) {
      toast.error("Product already added to order form");
      return;
    }

    setFormData({
      ...formData,
      products: [
        ...formData.products,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          image: "",
          description: selectedProduct.description || "",
          inStock: (selectedProduct.stock_quantity || 0) > 0,
        },
      ],
    });

    setSelectedProductId("");
    setOpen(false);
    toast.success("Product added to order form!");
  };

  const handleRemoveProduct = (productId: string) => {
    setFormData({
      ...formData,
      products: formData.products.filter((p) => p.id !== productId),
    });
    toast.success("Product removed from order form");
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested contactInfo fields
    if (name === "whatsapp" || name === "instagram" || name === "location") {
      setFormData({
        ...formData,
        contactInfo: {
          ...formData.contactInfo,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  // Sample form data
  // const formData = {
  //   businessName: "Amaka's Traditional Wears",
  //   description:
  //     "Premium African fashion and accessories for the modern Nigerian",
  //   logo: "/placeholder.svg",
  //   products: [
  //     {
  //       id: 1,
  //       name: "Premium Ankara Dress",
  //       price: 15000,
  //       image: "/placeholder.svg",
  //       description:
  //         "Beautiful hand-crafted Ankara dress perfect for special occasions",
  //       inStock: true,
  //     },
  //     {
  //       id: 2,
  //       name: "Traditional Agbada Set",
  //       price: 45000,
  //       image: "/placeholder.svg",
  //       description: "Complete traditional Agbada set with cap and accessories",
  //       inStock: true,
  //     },
  //     {
  //       id: 3,
  //       name: "Kente Accessories Collection",
  //       price: 8000,
  //       image: "/placeholder.svg",
  //       description: "Beautiful Kente-inspired accessories and jewelry",
  //       inStock: false,
  //     },
  //   ],
  //   contactInfo: {
  //     whatsapp: "+234 803 123 4567",
  //     instagram: "@amakas_wears",
  //     location: "Onitsha Main Market, Anambra State",
  //   },
  // };

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Product from Inventory</DialogTitle>
            <DialogDescription>
              Select a product from your inventory to add to the order form
            </DialogDescription>
          </DialogHeader>

          {productsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : availableProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No products available in inventory.</p>
              <p className="text-sm mt-2">
                Please add products first in the Products page.
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="product-select">Select Product</Label>
                <select
                  id="product-select"
                  className="w-full p-2 border rounded-md"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                >
                  <option value="">-- Select a product --</option>
                  {availableProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {formatCurrency(product.price)}
                      {(product.stock_quantity || 0) <= 0
                        ? " (Out of Stock)"
                        : ""}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProductId &&
                (() => {
                  const selected = availableProducts.find(
                    (p) => p.id === selectedProductId
                  );
                  return selected ? (
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="font-semibold mb-2">Product Details</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Name:</span>{" "}
                          {selected.name}
                        </p>
                        <p>
                          <span className="font-medium">Price:</span>{" "}
                          {formatCurrency(selected.price)}
                        </p>
                        <p>
                          <span className="font-medium">Category:</span>{" "}
                          {selected.category || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Stock:</span>{" "}
                          {selected.stock_quantity || 0} units
                        </p>
                        {selected.description && (
                          <p>
                            <span className="font-medium">Description:</span>{" "}
                            {selected.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : null;
                })()}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddProduct}
              disabled={!selectedProductId || productsLoading}
            >
              Add to Order Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                name="businessName"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={handleOnChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bussinessDescription">Business Description</Label>
              <textarea
                id="bussinessDescription"
                name="bussinessDescription"
                placeholder="Describe your business"
                className="w-full p-2 border rounded-md min-h-[80px]"
                value={formData.bussinessDescription}
                onChange={handleOnChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                placeholder="e.g., +234 803 123 4567"
                value={formData.contactInfo.whatsapp}
                onChange={handleOnChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="instagram">Instagram Handle</Label>
              <Input
                id="instagram"
                name="instagram"
                placeholder="e.g., @yourbusiness"
                value={formData.contactInfo.instagram}
                onChange={handleOnChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Your business location"
                value={formData.contactInfo.location}
                onChange={handleOnChange}
              />
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-3">Products</h3>
              {formData.products.length === 0 ? (
                <div className="text-center py-6 text-gray-500 border-2 border-dashed rounded-lg">
                  <Package className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">No products added yet</p>
                  <p className="text-xs mt-1">
                    Click the button below to add products
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{product.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={product.inStock ? "default" : "secondary"}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveProduct(product.id)}
                          >
                            ×
                          </Button>
                        </div>
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
              )}

              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={() => setOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleSaveChanges}
            >
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
                    {formData.businessName.charAt(0).toUpperCase()}
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {formData.businessName}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {formData.bussinessDescription}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span>
                      <MapPin className="h-4 w-4" />
                    </span>
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
      {/* <Card>
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
          </div> */}
      {/* </CardContent>
      </Card> */}
    </div>
  );
};

export default OrderForm;
