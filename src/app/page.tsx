import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <header className="container mx-auto px-4 py-16 text-center ">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Track Sales.
          <br />
          <span className="text-green-600">Boost Sales.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The modern business tool for entrepreneurs. Manage customers, track
          sales,and grow your WhatsApp/Instagram business with AI-powered
          insights.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg cursor-pointer"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-gray-300 text-gray-700 px-8 py-4 text-lg cursor-pointer"
          >
            Watch Demo
          </Button>
        </div>
      </header>
      {/* Features Grid */}
      <section id="features" className="py-12 bg-white ">
        <div className="px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Why Stockly Stands Out
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto text-center">
            Stockly simplifies customer management, sales tracking, and AI
            messaging in one place. Gain insights, save time, and grow your
            business faster.
          </p>
        </div>
        <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-12">
          <div className="bg-gradient-to-br from-green-50 to-orange-50  p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow  ">
            <Users className="h-10 w-10 text-green-600 mb-4 " />
            <h3 className="font-semibold text-gray-900 mb-2">
              Customer Management
            </h3>
            <p className="text-gray-600 text-sm">
              Track customer info, order history, and follow-ups
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-orange-50  p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <TrendingUp className="h-8 w-8 text-orange-500 mb-4 " />
            <h3 className="font-semibold text-gray-900 mb-2">Sales Tracking</h3>
            <p className="text-gray-600 text-sm">
              Record daily sales and monitor revenue growth
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-orange-50  p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <MessageSquare className="h-8 w-8 text-blue-500 mb-4 " />
            <h3 className="font-semibold text-gray-900 mb-2">AI Messages</h3>
            <p className="text-gray-600 text-sm">
              Generate WhatsApp & IG captions with AI
            </p>
          </div>

          <div className=" bg-gradient-to-br from-green-50 to-orange-50  p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <BarChart3 className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600 text-sm">
              View sales trends and business insights
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mt-24 px-4 md:px-0" id="how-it-works">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto text-center">
          Get started in just 3 simple steps and transform your business today
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Add Your Customers
            </h3>
            <p className="text-gray-600 text-sm">
              Import or manually add customer details with WhatsApp numbers and
              order history
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-500 font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Track Your Sales
            </h3>
            <p className="text-gray-600 text-sm">
              Record daily sales, track revenue, and monitor your business
              growth
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-500 font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Grow with AI</h3>
            <p className="text-gray-600 text-sm">
              Use AI to create follow-up messages and boost your customer
              engagement
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
