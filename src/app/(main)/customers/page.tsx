/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { Plus, Search } from "lucide-react";
import Heading from "../components/Heading";

import AddCustomerModal from "./component/AddCustomerModal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetCustomersQuery } from "@/hooks/customers/useCustomers";

import { Customer } from "@/hooks/customers/interface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomerStats from "./component/CustomerStats";
import CustomersTable from "./component/CustomersTable";
import DeleteCustomerModal from "./component/DeleteCustomerModal";

const CustomersPage = () => {
  const [IsAddCustomer, setIsAddCustomer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isDelete, setIsDelete] = useState<Customer | null>(null);
  const [isEdit, setIsEdit] = useState<Customer | null>(null);
  const [openSendMessageModal, setOpenSendMessageModal] =
    useState<Customer | null>(null);

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row  md:items-center md:justify-between ">
        <Heading
          headingText="Customers"
          paraText="Manage your customer relationships and track their journey"
        />

        <Dialog open={IsAddCustomer} onOpenChange={setIsAddCustomer}>
          <DialogTrigger asChild>
            <PrimaryButton label="Add Customers" icon={<Plus />} />
          </DialogTrigger>
          <DialogContent className="max-w-lg">
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
          <h1 className=" md:text-3xl font-bold text-gray-900 mb-2">
            Customer Database
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600" />
          </div>
        ) : (
          <>
            <div className="flex w-full sm:w-auto border rounded-md overflow-hidden mb-6">
              <Input
                placeholder="Search customers by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent rounded-none rounded-l-md "
              />
              <Button
                className="bg-blue-700 rounded-none rounded-r-md px-4"
                onClick={handleSearch}
              >
                <Search />
              </Button>
            </div>

            <div className=" max-w-[300px] border border-red-500">
              <CustomersTable
                customers={
                  filteredCustomers.length ? filteredCustomers : customers
                }
                onDeleteClick={(customer) => setIsDelete(customer)}
                onEditClick={(customer) => setIsEdit(customer)}
                onSendMessage={(customer) => setOpenSendMessageModal(customer)}
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
            Delete Customer
          </DialogTitle>
          <DeleteCustomerModal
            customer={isDelete}
            closeModal={() => setIsDelete(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersPage;
