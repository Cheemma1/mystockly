"use client";

import { useState } from "react";

import Heading from "../components/Heading";

import AIMessageForm from "./components/AIMessageForm";
import GeneratedMessages, {
  GeneratedMessage,
} from "./components/GeneratedMessages";

import { toast } from "sonner";

export default function TemplatesPage() {
  const [generatedMessages, setGeneratedMessages] = useState<
    GeneratedMessage[]
  >([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (data: {
    goal: string;
    audience: string;
    productContext: string;
  }) => {
    setIsGenerating(true);

    try {
      console.log("Sending request to API with data:", data);

      const response = await fetch("/api/generate-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error(errorData.error || "Failed to generate messages");
      }

      const result = await response.json();
      console.log("API result:", result);

      const newMessages: GeneratedMessage[] = result.messages.map(
        (
          msg: {
            title: string;
            message: string;
            tone: string;
            platform: string;
          },
          index: number
        ) => ({
          id: (Date.now() + index).toString(),
          title: msg.title,
          message: msg.message,
          tone: msg.tone,
          platform: msg.platform,
          type: "custom",
        })
      );

      setGeneratedMessages((prev) => [...newMessages, ...prev]);

      toast.success(`Generated ${newMessages.length} messages successfully!`);
    } catch (error) {
      console.error("Error generating messages:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate messages. Please check your API key."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Heading
        headingText="AI Message Generator"
        paraText="Create engaging WhatsApp and Instagram messages with AI assistance"
      />

      {/* AI Message Generator Form */}
      <AIMessageForm onGenerate={handleGenerate} isGenerating={isGenerating} />

      {/* Generated Messages */}
      <GeneratedMessages messages={generatedMessages} />

      {/* Quick Templates */}
    </div>
  );
}
