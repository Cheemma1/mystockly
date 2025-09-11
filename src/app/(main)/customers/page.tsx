import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import { Plus } from "lucide-react";
import Heading from "../components/Heading";
import { Card, CardContent } from "@/components/ui/card";

const CustomersPage = () => {
  const customerAnalytics = [
    {
      title: "Total customers",
      value: 4,
    },

    {
      title: "New This Month",
      value: 4,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex  items-center justify-between ">
        <Heading
          headingText="Customers"
          paraText="Manage your customer relationships and track their journey"
        />
        <PrimaryButton label="Add Customers" icon={<Plus />} />
      </div>

      <div className="flex md:flex-row flex-col  items-center gap-4 ">
        {customerAnalytics.map((item) => (
          <Card
            className="hover:shadow-lg transition-shadow w-full"
            key={item.title}
          >
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-600">{item.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
