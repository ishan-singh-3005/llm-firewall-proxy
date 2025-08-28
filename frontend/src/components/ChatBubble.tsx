import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { MessageCircle, X, Send, Shield, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  isBlocked?: boolean;
}

interface ChatBubbleProps {
  isProtected: boolean;
  position: 'left' | 'right';
}

export const ChatBubble = ({ isProtected, position }: ChatBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm your ${isProtected ? 'secure' : 'standard'} customer support assistant. How can I help you today?`,
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call backend API
      const url = isProtected
        ? "http://localhost:8000/chat_firewall"
        : "http://localhost:8000/chat_no_firewall";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: "Alice", prompt: inputValue })
      });
      let data: { isBlocked: boolean; response: string } = { isBlocked: false, response: "Error: No response" };
      try {
        data = await res.json();
      } catch (e) {
        data = { isBlocked: true, response: "Error: Invalid server response." };
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        isBlocked: data.isBlocked,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "Error: Unable to reach backend.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
          isBlocked: true,
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn(
      "fixed bottom-6 z-50",
      position === 'left' ? "left-6" : "right-6"
    )}>
      {/* Chat Window - Much Bigger */}
      {isOpen && (
        <Card className="w-96 h-[500px] mb-4 shadow-lg">
          <CardHeader className="flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              {isProtected ? (
                <Shield className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              )}
              <CardTitle className="text-base">
                {isProtected ? 'Protected' : 'Standard'} Support
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={isProtected ? "success" : "destructive"}
                className="text-xs px-2 py-1"
              >
                {isProtected ? 'Firewall ON' : 'Firewall OFF'}
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-6 h-6"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex flex-col h-[400px] p-4 pt-0">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  isBlocked={message.isBlocked}
                  isProtected={isProtected && !message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <span className="text-sm">Typing...</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                variant={isProtected ? "default" : "destructive"}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Trigger Button - Bigger */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        variant={isProtected ? "default" : "destructive"}
        className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      
      {/* Label */}
      <div className="text-sm text-center mt-2 font-medium">
        {isProtected ? (
          <span className="text-green-600">Protected</span>
        ) : (
          <span className="text-red-600">Standard</span>
        )}
      </div>
    </div>
  );
};