"use client";

import { useState, useEffect } from "react";
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
import { User, CreditCard, Bell, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaystackButton from "@/components/PaystackButton";
import { useStore as useAuth } from "@/store/useAuthstore";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/hooks/auth/useProfile";

interface ProfileForm {
  display_name: string;
  phone: string;
  plan: string;
}

const Settings = () => {
  const { user } = useAuth();
  const { profile: userProfile, loading: isLoadingProfile } =
    useGetProfileQuery();
  const { updateProfile: updateProfileMutation, isUpdating } =
    useUpdateProfileMutation();

  const [profile, setProfile] = useState<ProfileForm>({
    display_name: "",
    phone: "",
    plan: "free",
  });

  useEffect(() => {
    if (userProfile) {
      setProfile({
        display_name: userProfile.display_name || "",
        phone: userProfile.phone || "",
        plan: userProfile.plan || "free",
      });
    }
  }, [userProfile]);

  const handleUpdateProfile = () => {
    updateProfileMutation({
      display_name: profile.display_name,
      phone: profile.phone,
      plan: profile.plan,
    });
  };

  const handleInputChange = (field: keyof ProfileForm, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const planFeatures = {
    free: [
      "Up to 50 customers",
      "Basic analytics",
      "Email support",
      "Order tracking",
      "Sales tracking",
    ],
    pro: [
      "100 customers",
      "Advanced analytics",
      "Priority support",
      "AI-powered insights",
      "Custom templates",
      "Export data",
    ],
    premium: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated support",
      "White-label options",
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account and business preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Business Profile</TabsTrigger>

          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Business Information
              </CardTitle>
              <CardDescription>
                Update your business details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display_name">Full Name</Label>
                  <Input
                    id="display_name"
                    value={user?.user_metadata?.display_name}
                    onChange={(e) =>
                      handleInputChange("display_name", e.target.value)
                    }
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>
              <Button onClick={handleUpdateProfile} disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Profile"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Plan
              </CardTitle>
              <CardDescription>
                Manage your subscription and billing information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold capitalize">
                    {profile.plan} Plan
                  </h3>
                  <p className="text-gray-600">
                    {profile.plan === "free" && "Perfect for getting started"}
                    {profile.plan === "pro" && "Great for growing businesses"}
                    {profile.plan === "premium" &&
                      "Advanced features for enterprises"}
                  </p>
                </div>
                <Badge
                  variant={profile.plan === "free" ? "secondary" : "default"}
                >
                  {profile.plan === "free" ? "Current" : "Active"}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Available Plans</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(planFeatures).map(([planName, features]) => (
                    <Card
                      key={planName}
                      className={`relative ${
                        profile.plan === planName ? "ring-2 ring-green-500" : ""
                      }`}
                    >
                      <CardHeader>
                        <CardTitle className="capitalize">{planName}</CardTitle>
                        <div className="text-2xl font-bold">
                          {planName === "free" && "₦0"}
                          {planName === "pro" && "₦5,000"}
                          {planName === "premium" && "₦15,000"}
                          <span className="text-sm font-normal text-gray-600">
                            /month
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        {profile.plan !== planName && planName !== "free" && (
                          <PaystackButton
                            plan={planName}
                            amount={planName === "pro" ? 5000 : 15000}
                            buttonText={`Upgrade to ${planName}`}
                            className="w-full mt-4"
                            email={user?.email || ""}
                            onSuccess={() => {
                              handleInputChange("plan", planName);
                              handleUpdateProfile();
                            }}
                          />
                        )}
                        {profile.plan !== planName && planName === "free" && (
                          <Button
                            className="w-full mt-4"
                            variant="outline"
                            onClick={() => {
                              handleInputChange("plan", planName);
                              handleUpdateProfile();
                            }}
                            disabled={isUpdating}
                          >
                            Downgrade to Free
                          </Button>
                        )}
                        {profile.plan === planName && (
                          <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-medium">
                            <CheckCircle className="h-4 w-4" />
                            Current Plan
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Plan changes take effect immediately.
                  You can upgrade or downgrade at any time.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about your business activity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">
                      Receive updates via email
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Alerts</p>
                    <p className="text-sm text-gray-600">
                      Get SMS for important updates
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-gray-600">
                      Summary of your business performance
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
