import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-ccc">
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 mt-6 pt-16">
        <p className="text-gray-600 mb-2 text-1xl">
          Grow your business, boost your Sales
        </p>

        {/* Card */}
        <Card className="shadow-xl w-full max-w-md px-6 py-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription>
              Ready to track those sales and boost your business?
            </CardDescription>
          </CardHeader>

          {children}

          <p className="text-center text-sm text-gray-600 mt-6">
            Join thousands of entrepreneurs growing their business with{" "}
            <span className="font-semibold">MyStockly</span>
          </p>
        </Card>
      </main>
    </div>
  );
}
