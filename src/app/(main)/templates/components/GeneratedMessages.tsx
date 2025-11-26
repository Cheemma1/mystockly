import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Copy, Send, Star } from "lucide-react";
import { toast } from "sonner";

export interface GeneratedMessage {
  id: string;
  title: string;
  message: string;
  tone: string;
  platform: string;
  type?: string;
}

interface GeneratedMessagesProps {
  messages: GeneratedMessage[];
}

const GeneratedMessages = ({ messages }: GeneratedMessagesProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Message copied to clipboard!");
  };

  const getToneColor = (tone: string) => {
    const colors: Record<string, string> = {
      friendly: "bg-blue-100 text-blue-800",
      professional: "bg-purple-100 text-purple-800",
      casual: "bg-green-100 text-green-800",
      formal: "bg-gray-100 text-gray-800",
    };
    return colors[tone.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.toLowerCase().includes("whatsapp")) return "💬";
    if (platform.toLowerCase().includes("instagram")) return "📸";
    return "📱";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          Your Generated Messages
        </CardTitle>
        <CardDescription>
          AI-generated messages ready to copy and send to your customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{msg.title}</h3>
                    <Badge className={getToneColor(msg.tone)}>{msg.tone}</Badge>
                    <span className="text-sm">
                      {getPlatformIcon(msg.platform)} {msg.platform}
                    </span>
                    {msg.type === "custom" && (
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200"
                      >
                        <Star className="h-3 w-3 mr-1" />
                        Fresh
                      </Badge>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(msg.message)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No messages yet
              </h3>
              <p className="text-gray-600">
                Generate your first AI-powered message using the form above!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneratedMessages;
