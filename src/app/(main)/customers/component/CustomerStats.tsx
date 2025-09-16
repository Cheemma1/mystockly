import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface CustomerStatsProps {
  total: number;
  newThisMonth: number;
}

const CustomerStats = ({ total, newThisMonth }: CustomerStatsProps) => {
  const stats = [
    { title: "Total Customers", value: total },
    { title: "New This Month", value: newThisMonth },
  ];

  return (
    <div className="flex md:flex-row flex-col  items-center gap-4 ">
      {stats.map((item) => (
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
  );
};

export default CustomerStats;
