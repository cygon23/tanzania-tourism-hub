import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  MapPin,
  Camera,
  Calendar,
  HelpCircle
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const quickSuggestions = [
  { text: "Best time to visit Serengeti?", icon: Calendar },
  { text: "Photo spots in Zanzibar", icon: Camera },
  { text: "Plan safari itinerary", icon: MapPin },
  { text: "Cultural attractions", icon: Sparkles },
];

const initialMessages: Message[] = [
  {
    id: "1",
    type: "bot",
    content: "Jambo! 🦁 Welcome to Tanzania Hub! I'm your AI travel assistant. I can help you discover amazing destinations, plan your safari, find the best photography spots, and answer any questions about Tanzania. How can I assist you today?",
    timestamp: new Date(),
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate chat button entrance
      gsap.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", delay: 1 }
      );

      // Floating animation
      gsap.to(buttonRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }, buttonRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(
        chatRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(content),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("serengeti")) {
      return "🌅 The Serengeti is magical! Best time to visit: June-July for river crossings, January-March for calving season. The endless plains offer incredible wildlife viewing year-round. Would you like specific lodging recommendations?";
    }
    
    if (input.includes("zanzibar")) {
      return "🏝️ Zanzibar is paradise! Stone Town's UNESCO heritage, pristine beaches, spice tours, and vibrant culture await. Best photography spots: Freddie Mercury House, spice plantations, and sunset at Kendwa Beach. Need beach recommendations?";
    }
    
    if (input.includes("safari") || input.includes("itinerary")) {
      return "🦁 Perfect! A 7-day safari could include: Tarangire (Day 1-2), Serengeti (Day 3-5), Ngorongoro Crater (Day 6-7). Each park offers unique wildlife experiences. What's your budget range and preferred travel style?";
    }
    
    if (input.includes("photo") || input.includes("camera")) {
      return "📸 Tanzania is a photographer's dream! Golden hour at Serengeti, Baobab trees in Tarangire, Crater rim views in Ngorongoro. Pro tip: Bring telephoto lens for wildlife and wide-angle for landscapes. Need specific camera settings advice?";
    }
    
    return "That's a great question! Tanzania offers incredible diversity - from Mount Kilimanjaro to pristine beaches, from wildlife safaris to cultural experiences. Could you be more specific about what interests you most? I'm here to help plan your perfect Tanzanian adventure! 🇹🇿";
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-safari to-ocean hover:from-safari-light hover:to-ocean-light shadow-lg z-40 transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-sunset rounded-full animate-pulse"></div>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] z-50 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]">
          <Card ref={chatRef} className="h-full flex flex-col border-2 border-border/50 shadow-2xl bg-background/95 backdrop-blur-lg">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-safari/10 to-ocean/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-safari to-ocean rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Tanzania AI Guide</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Online & Ready</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-muted/50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-safari to-ocean text-white"
                          : "bg-muted/50 text-foreground"
                      }`}
                    >
                      <div className="flex items-start space-x-2 mb-1">
                        {message.type === "bot" ? (
                          <Bot className="w-4 h-4 text-safari flex-shrink-0 mt-0.5" />
                        ) : (
                          <User className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                        )}
                        <span className="font-medium text-xs">
                          {message.type === "bot" ? "AI Guide" : "You"}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted/50 p-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-safari" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-safari rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-safari rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-safari rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="p-3 border-t border-border/50">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-sunset" />
                  <span className="text-xs font-medium text-muted-foreground">Quick Questions</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {quickSuggestions.map((suggestion, index) => {
                    const Icon = suggestion.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendMessage(suggestion.text)}
                        className="h-auto p-2 text-xs border-border/30 hover:border-safari/50 hover:bg-safari/5 justify-start"
                      >
                        <Icon className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{suggestion.text}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-border/50">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Tanzania..."
                  className="flex-1 text-sm"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(inputValue);
                    }
                  }}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  className="bg-safari hover:bg-safari-light px-3"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}