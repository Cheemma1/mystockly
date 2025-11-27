import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface AIMessageFormProps {
  onGenerate: (data: {
    goal: string;
    audience: string;
    productContext: string;
  }) => void;
  isGenerating: boolean;
}

const AIMessageForm = ({ onGenerate, isGenerating }: AIMessageFormProps) => {
  const [messageGoal, setMessageGoal] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [productContext, setProductContext] = useState("");

  const handleSubmit = () => {
    if (!messageGoal.trim()) {
      toast.error("Please enter a message goal");
      return;
    }

    onGenerate({
      goal: messageGoal,
      audience: targetAudience,
      productContext: productContext,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Generate AI-Powered Messages
        </CardTitle>
        <CardDescription>
          Tell us your goal and we&apos;ll create personalized messages for your
          customers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="goal">
              What&apos;s the goal of your message? *
            </Label>
            <textarea
              id="goal"
              placeholder="e.g., Follow up with a customer who bought last week, Promote weekend sale, Introduce new product collection..."
              value={messageGoal}
              onChange={(e) => setMessageGoal(e.target.value)}
              className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="audience">Target Audience (Optional)</Label>
              <Input
                id="audience"
                placeholder="e.g., Young professionals, Mothers, Wedding guests..."
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="product">
                Product/Service Context (Optional)
              </Label>
              <Input
                id="product"
                placeholder="e.g., Ankara dresses, Traditional wear, Accessories..."
                value={productContext}
                onChange={(e) => setProductContext(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isGenerating}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating Messages...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Messages
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIMessageForm;
