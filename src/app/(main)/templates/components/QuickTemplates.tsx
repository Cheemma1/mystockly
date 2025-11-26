import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";

interface Template {
  title: string;
  preview: string;
  category: string;
}

interface QuickTemplatesProps {
  onUseTemplate: (template: Template) => void;
}

const QuickTemplates = ({ onUseTemplate }: QuickTemplatesProps) => {
  const templates: Template[] = [
    {
      title: "New Customer Welcome",
      preview: "Welcome to our business family! 🎉",
      category: "Welcome",
    },
    {
      title: "Order Confirmation",
      preview: "Your order has been confirmed! ✅",
      category: "Orders",
    },
    {
      title: "Delivery Update",
      preview: "Your order is on the way! 🚚",
      category: "Delivery",
    },
    {
      title: "Payment Reminder",
      preview: "Gentle reminder about your pending payment",
      category: "Payment",
    },
    {
      title: "Thank You Message",
      preview: "Thank you for choosing us! 💕",
      category: "Gratitude",
    },
    {
      title: "Special Occasion",
      preview: "Celebrate with our special collection! 🎊",
      category: "Events",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-purple-600" />
          Quick Templates
        </CardTitle>
        <CardDescription>
          Ready-to-use message templates for common scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">
                    {template.title}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{template.preview}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onUseTemplate(template)}
                >
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickTemplates;
