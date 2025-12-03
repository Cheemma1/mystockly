"use client";

import React, { useEffect, useMemo, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { Plus } from "lucide-react";
import Heading from "../components/Heading";

import AddCustomerModal from "./component/AddCustomerModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetCustomersQuery } from "@/hooks/customers/useCustomers";

import { Customer } from "@/hooks/customers/interface";

import CustomerStats from "./component/CustomerStats";
import CustomersTable from "./component/CustomersTable";
import DeleteCustomerModal from "./component/DeleteCustomerModal";
import EditModal from "./component/EditModal";
import SearchInput from "../components/SearchInput";

const CustomersPage = () => {
  const [IsAddCustomer, setIsAddCustomer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isDelete, setIsDelete] = useState<Customer | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  const { customers, loading } = useGetCustomersQuery();

  useEffect(() => {
    if (!searchTerm.trim() && hasSearched) {
      setFilteredCustomers(customers);
      setHasSearched(false);
    }
  }, [searchTerm, hasSearched, customers]);

  const stats = useMemo(() => {
    return {
      total: customers.length,
      newThisMonth: customers.filter(
        (c) => new Date(c.created_at).getMonth() === new Date().getMonth()
      ).length,
    };
  }, [customers]);

  const handleSearch = () => {
    setHasSearched(true);

    const search = searchTerm.trim().toLowerCase();
    if (!search) {
      setFilteredCustomers(customers);
      return;
    }

    const result = customers.filter(
      (c) =>
        (c.name ?? "").toLowerCase().includes(search) ||
        (c.email ?? "").toLowerCase().includes(search) ||
        (c.phone ?? "").toLowerCase().includes(search)
    );

    setFilteredCustomers(result);
  };

  //Called when "Edit" is clicked from the table
  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row  md:items-center md:justify-between  items-start gap-4">
        <Heading
          headingText="Customers"
          paraText="Manage your customer relationships and track their journey"
        />

        <Dialog open={IsAddCustomer} onOpenChange={setIsAddCustomer}>
          <DialogTrigger asChild>
            <PrimaryButton label="Add Customers" icon={<Plus />} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogTitle className="text-lg font-bold">
              Add New Customer
            </DialogTitle>

            <AddCustomerModal closeModal={() => setIsAddCustomer(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <CustomerStats total={stats.total} newThisMonth={stats.newThisMonth} />

      <div className="bg-white p-6 rounded-md ">
        <div>
          <h1 className=" md:text-2xl font-bold text-gray-900 mb-2">
            Customer Database
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600" />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-6">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
              placeholder="Search customers by name, phone, or email..."
            />

            {/* <div className="-mx-6 md:mx-0"> */}
            <CustomersTable
              customers={
                filteredCustomers.length ? filteredCustomers : customers
              }
              onDeleteClick={(customer) => setIsDelete(customer)}
              onEditClick={handleEditClick}
            />
            {/* </div> */}
          </div>
        )}
      </div>

      <Dialog
        open={!!isDelete}
        onOpenChange={(open) => !open && setIsDelete(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogTitle className="text-lg font-bold">
            Delete Customer
          </DialogTitle>
          <DeleteCustomerModal
            customer={isDelete}
            closeModal={() => setIsDelete(null)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
            <EditModal
              customerId={selectedCustomer.id}
              closeModal={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersPage;
