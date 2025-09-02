import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
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
          <span className="text-blue-600">Boost Sales.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The modern business tool for entrepreneurs. Manage customers, track
          sales,and grow your business with AI-powered insights.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-600 text-white px-8 py-4 text-lg cursor-pointer"
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
            MyStockly simplifies customer management, sales tracking, and AI
            messaging in one place. Gain insights, save time, and grow your
            business faster.
          </p>
        </div>
        <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-12">
          <div className="bg-ccc shadow-md hover:shadow-lg transition-shadow p-6 ">
            <Users className="h-10 w-10 text-blue-600 mb-4 " />
            <h3 className="font-semibold text-gray-900 mb-2">
              Customer Management
            </h3>
            <p className="text-gray-600 text-sm">
              Track customer info, order history, and follow-ups
            </p>
          </div>

          <div className="bg-ccc p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <TrendingUp className="h-8 w-8 text-orange-500 mb-4 " />
            <h3 className="font-semibold text-gray-900 mb-2">Sales Tracking</h3>
            <p className="text-gray-600 text-sm">
              Record daily sales and monitor revenue growth
            </p>
          </div>

          <div className="bg-ccc p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <MessageSquare className="h-8 w-8 text-blue-500 mb-4 " />
            <h3 className="font-semibold text-gray-900 mb-2">AI Messages</h3>
            <p className="text-gray-600 text-sm">
              Generate WhatsApp & IG captions with AI
            </p>
          </div>

          <div className=" bg-ccc p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <BarChart3 className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600 text-sm">
              View sales trends and business insights
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      {/* <section className="mt-24 px-4 md:px-0" id="how-it-works">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto text-center">
          Get started in just 3 simple steps and transform your business today
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue font-bold text-xl">1</span>
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
      </section> */}

      <section className="mt-24">
        <div className="px-4 md:px-0 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 ">
            Real Business, Real Result.
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of business owners who are already growing with
            MyStockly.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 px-6 ">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm mb-4">
              &quot; Mystockly helped me organize my WhatsApp business. Now I
              know exactly who my best customers are and when to follow
              up!&quot;
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-500 font-bold text-sm">AO</span>
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-900 text-sm">
                  Adaora Okafor
                </p>
                <p className="text-gray-500 text-xs">Fashion Vendor,Onitsha</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm mb-4">
              &quot; The AI message feature is amazing! It helps me create
              professional follow-ups that actually get responses.&quot;
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-500 font-bold text-sm">CU</span>
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-900 text-sm">
                  Chioma Udeh
                </p>
                <p className="text-gray-500 text-xs">Beauty Products , Lagos</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex mb-3"></div>
            <p className="text-gray-600 text-sm mb-4">
              &quot; My sales increased by 40% after using Mystockly for just 2
              months. The analytics helped me understand my business
              better.&quot;
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-500 font-bold text-sm">EO</span>
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-900 text-sm">
                  Emeka Onwuka
                </p>
                <p className="text-gray-500 text-xs">Electronics, Abuja</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mt-24" id="pricing">
        <div className="px-4 md:px-0 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Plans to power your business
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose a plan that fits your business size and budget
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:max-w-4xl mx-auto px-4 md:px-0">
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Starter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Perfect for new businesses
            </p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">Free</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                Up to 100 customers
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                Basic sales tracking
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />5 AI
                messages/month
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                Order form
              </li>
            </ul>
            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-ccc cursor-pointer"
            >
              Choose Starter
            </Button>
          </div>

          <div className="bg-ccc p-6 rounded-xl shadow-lg border-2 border-blue-600 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Pro</h3>
            <p className="text-gray-600 text-sm mb-4">
              Best for growing businesses
            </p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">₦5,000</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                Up to 1,000 customers
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                Advanced analytics
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                Unlimited AI messages
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />5 order
                forms
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                WhatsApp integration
              </li>
            </ul>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
              Choose Pro
            </Button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Enterprise</h3>
            <p className="text-gray-600 text-sm mb-4">
              For established businesses
            </p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">₦10,000</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                Unlimited customers
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                Advanced AI features
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                Priority support
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                Unlimited Order Form
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                WhatsApp integration
              </li>
            </ul>
            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-ccc cursor-pointer"
            >
              Choose Enterprise
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
