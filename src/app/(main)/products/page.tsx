"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Package, Plus, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Heading from "../components/Heading";
import PrimaryButton from "../components/PrimaryButton";
import { useGetProductsQuery } from "@/hooks/products/useProducts";
import AddProductModal from "./components/AddProductModal";
import ProductTable from "./components/ProductTable";
import SearchInput from "../components/SearchInput";
import { Product } from "@/hooks/products/interface";
import DeleteProductModal from "./components/DeleteProductModal";
import EditProductModal from "./components/EditProductModal";
const ProductsPage = () => {
  const { products, isLoading } = useGetProductsQuery();
  const [IsAddProduct, setIsAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isDelete, setIsDelete] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);

  useEffect(() => {
    if (!searchTerm.trim() && hasSearched) {
      setFilteredProduct(products);
      setHasSearched(false);
    }
  }, [searchTerm, hasSearched, products]);

  const handleSearch = () => {
    setHasSearched(true);

    const search = searchTerm.trim().toLowerCase();
    if (!search) {
      setFilteredProduct(products);
      return;
    }

    const result = products.filter(
      (c) =>
        (c.name ?? "").toLowerCase().includes(search) ||
        (c.category ?? "").toLowerCase().includes(search)
    );

    setFilteredProduct(result);
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * (product.stock_quantity || 0),
    0
  );
  const lowStockProducts = products.filter(
    (product) => (product.stock_quantity || 0) <= 5
  ).length;

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row  md:items-center md:justify-between ">
        <Heading
          headingText=" Product Inventory "
          paraText="Manage your products and track inventory"
        />

        <Dialog open={IsAddProduct} onOpenChange={setIsAddProduct}>
          <DialogTrigger asChild>
            <PrimaryButton label="Add Product" icon={<Plus />} />
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your inventory.
              </DialogDescription>
            </DialogHeader>

            <AddProductModal closeModal={() => setIsAddProduct(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalProducts}
                </p>
              </div>
              <div className="p-2 bg-blue-50 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inventory Value</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalValue)}
                </p>
              </div>
              <div className="p-2 bg-green-50 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-orange-600">
                  {lowStockProducts}
                </p>
              </div>
              <div className="p-2 bg-orange-50 rounded-full">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-md ">
        <div>
          <h1 className=" md:text-3xl font-bold text-gray-900 mb-2">
            Products Database
          </h1>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600" />
          </div>
        ) : (
          <>
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
              placeholder="search product by name"
            />

            <div className=" ">
              <ProductTable
                products={filteredProduct.length ? filteredProduct : products}
                onDeleteClick={(product) => setIsDelete(product)}
                onEditClick={handleEditClick}
              />
            </div>
          </>
        )}
      </div>

      <Dialog
        open={!!isDelete}
        onOpenChange={(open) => !open && setIsDelete(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogTitle className="text-lg font-bold">
            Delete Product
          </DialogTitle>
          <DeleteProductModal
            product={isDelete}
            closeModal={() => setIsDelete(null)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <EditProductModal
              productId={selectedProduct.id}
              closeModal={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
