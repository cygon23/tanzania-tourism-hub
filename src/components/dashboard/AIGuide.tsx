import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, MapPin } from "lucide-react";

const sampleQuestions = [
  "What's the best time to visit Serengeti?",
  "Tell me about Zanzibar's cultural attractions",
  "Plan a 7-day safari itinerary",
  "What wildlife can I see in Mikumi?",
  "Best photography spots in Tanzania",
];

const chatHistory = [
  {
    type: "bot",
    message: "Hello! I'm your AI Tanzania Tourism Guide. I can help you discover the best destinations, plan itineraries, and answer any questions about Tanzania. What would you like to know?",
    timestamp: "Just now"
  },
  {
    type: "user", 
    message: "What's the best time to visit the Serengeti?",
    timestamp: "2 minutes ago"
  },
  {
    type: "bot",
    message: "The best time to visit Serengeti depends on what you want to see! For the Great Migration, visit June-July (river crossings) or January-March (calving season). For general wildlife viewing with fewer crowds, April-May and November are excellent. The dry season (June-October) offers the best game viewing as animals gather around water sources.",
    timestamp: "2 minutes ago"
  }
];

export default function AIGuide() {
  const [message, setMessage] = useState("");

  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex flex-col space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          AI{" "}
          <span className="bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
            Tour Guide
          </span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Get personalized recommendations and insights about Tanzania from our AI assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col border-2 border-border/50">
            {/* Chat Header */}
            <div className="p-4 border-b border-border/50 bg-gradient-to-r from-safari/10 to-ocean/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-safari to-ocean rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Tanzania AI Guide</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Online & Ready to Help</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    chat.type === 'user' 
                      ? 'bg-gradient-to-r from-safari to-ocean text-white' 
                      : 'bg-muted/50 text-foreground'
                  }`}>
                    <div className="flex items-start space-x-2 mb-2">
                      {chat.type === 'bot' ? (
                        <Bot className="w-5 h-5 text-safari flex-shrink-0 mt-0.5" />
                      ) : (
                        <User className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      )}
                      <span className="font-medium text-sm">
                        {chat.type === 'bot' ? 'AI Guide' : 'You'}
                      </span>
                    </div>
                    <p className="leading-relaxed">{chat.message}</p>
                    <span className={`text-xs mt-2 block ${
                      chat.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {chat.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything about Tanzania tourism..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      // Handle send message
                      setMessage("");
                    }
                  }}
                />
                <Button className="bg-safari hover:bg-safari-light px-6">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <Card className="p-6 border-2 border-border/50">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-sunset" />
              <h3 className="font-semibold text-foreground">Popular Questions</h3>
            </div>
            <div className="space-y-2">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-3 border-border/30 hover:border-safari/50 hover:bg-safari/5"
                  onClick={() => setMessage(question)}
                >
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </div>
          </Card>

          {/* AI Capabilities */}
          <Card className="p-6 border-2 border-border/50">
            <div className="flex items-center space-x-2 mb-4">
              <Bot className="w-5 h-5 text-ocean" />
              <h3 className="font-semibold text-foreground">AI Capabilities</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Trip Planning", description: "Custom itineraries" },
                { label: "Wildlife Info", description: "Animal behaviors & habitats" },
                { label: "Cultural Insights", description: "Local customs & traditions" },
                { label: "Photography Tips", description: "Best spots & techniques" },
                { label: "Safety Guidance", description: "Travel safety & health tips" },
              ].map((capability, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Badge variant="outline" className="mt-1 border-safari/30 text-safari">
                    <MapPin className="w-3 h-3 mr-1" />
                  </Badge>
                  <div>
                    <div className="font-medium text-foreground text-sm">{capability.label}</div>
                    <div className="text-xs text-muted-foreground">{capability.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-6 border-2 border-border/50">
            <h3 className="font-semibold text-foreground mb-4">Today's Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Queries Answered</span>
                <span className="font-bold text-safari">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Avg Response Time</span>
                <span className="font-bold text-ocean">0.8s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Satisfaction Rate</span>
                <span className="font-bold text-sunset">98.5%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}