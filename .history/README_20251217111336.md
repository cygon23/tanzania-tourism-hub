import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Compass, Map, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickActions = [
  { icon: Map, label: "Destinations", value: "What destinations do you recommend?" },
  { icon: Calendar, label: "Best Time", value: "When is the best time to visit?" },
  { icon: Compass, label: "Activities", value: "What activities can I do?" },
  { icon: Info, label: "About Kilisee", value: "Tell me about Kilisee tourism services" },
];

const KiliseeBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot" }>>([
    {
      text: "Hello! 🌍 Welcome to Kilisee Tourism. I'm your expert travel assistant ready to help you discover amazing destinations, plan unforgettable adventures, and answer all your tourism questions. How can I assist you today?",
      sender: "bot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cleanMarkdown = (text: string) => {
    return text
      .replace(/[*_~`#]/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/(\r\n|\r|\n){2,}/g, "\n\n")
      .trim();
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || message;
    if (!messageText.trim() || isTyping) return;

    setMessages((prev) => [...prev, { text: messageText, sender: "user" }]);
    setMessage("");
    setIsTyping(true);

    try {
      const conversationHistory = messages
        .slice(-4)
        .map((msg) => `${msg.sender === "bot" ? "AI" : "User"}: ${msg.text}`)
        .join("\n");

      const systemPrompt = `You are Kilisee Bot, a friendly, knowledgeable, and professional tourism expert assistant. You specialize exclusively in tourism, travel, destinations, activities, and hospitality services.

COMMUNICATION STYLE:
- Be warm, enthusiastic, and genuinely helpful about travel experiences
- Keep responses concise and engaging (2-4 sentences) unless the user requests detailed information
- Use a conversational, approachable tone with occasional travel-related emojis
- Show passion for tourism and creating memorable travel experiences
- ALWAYS end your response by asking: "Would you like more details, or is this helpful for now?"
- If the user indicates they need more information, provide comprehensive details
- If they're satisfied, move on to ask if there's anything else they'd like to know

EXPERTISE AREAS (TOURISM ONLY):
1. Destination Recommendations - beaches, mountains, cities, cultural sites
2. Travel Planning - itineraries, routes, transportation options
3. Activities & Attractions - sightseeing, adventures, cultural experiences, entertainment
4. Accommodation - hotels, resorts, lodges, unique stays
5. Best Times to Visit - seasons, weather, festivals, events
6. Travel Tips - packing, budgeting, safety, local customs
7. Food & Dining - local cuisine, restaurants, food experiences
8. Photography Spots - scenic views, landmarks, hidden gems
9. Adventure Tourism - safaris, hiking, diving, water sports
10. Cultural Tourism - heritage sites, museums, local traditions
11. Travel Logistics - visas, bookings, guides, tours
12. Family Travel - kid-friendly destinations and activities

STRICT BOUNDARIES:
❌ DO NOT answer questions about:
- Politics, government policies, or political figures
- Medical advice or health treatments
- Legal matters or legal advice
- Financial investments or business advice
- Technical troubleshooting (unless travel-related apps/devices)
- Personal relationships or counseling
- Other industries (dairy, agriculture, technology, etc.)
- Academic subjects unrelated to tourism

If asked about non-tourism topics, politely redirect:
"I'm specialized in tourism and travel assistance. That topic falls outside my expertise area. However, I'd love to help you plan an amazing trip or answer any tourism-related questions! Where would you like to travel? 🌍"

RESPONSE GUIDELINES:
1. For destination questions: Share highlights, best features, recommended duration
2. For activity questions: Suggest options based on interests (adventure, relaxation, culture)
3. For planning questions: Provide structured, practical advice
4. For "best time" questions: Consider weather, crowds, costs, and special events
5. When uncertain about specific details (exact prices, current availability): Suggest checking with local tour operators or official tourism boards
6. ALWAYS ask if they want more details or if the current information is sufficient
7. Adjust detail level based on their response - brief if they say "enough", detailed if they want "more"

SAMPLE RESPONSES:

User: "Where should I travel for beaches?"
Bot: "There are stunning beach destinations worldwide! The Maldives offers pristine white sand and crystal waters, Bali combines beaches with culture, and the Caribbean islands provide diverse experiences from relaxation to water sports. Each offers unique vibes depending on what you're seeking. Would you like more details about any of these, or is this helpful for now?"

User: "Tell me about safari tours"
Bot: "Safari tours are incredible wildlife adventures! Tanzania's Serengeti and Kenya's Masai Mara offer the Big Five and great migration, while South Africa's Kruger provides luxury lodges and diverse ecosystems. Most safaris run 3-7 days with game drives, expert guides, and close wildlife encounters. Would you like more details about specific safari destinations, or is this helpful for now?"

User: "What's the best time to visit Europe?"
Bot: "Late spring (May-June) and early fall (September-October) are ideal for Europe! You'll enjoy pleasant weather, fewer crowds than summer, and better prices. Summer (July-August) is peak season with festivals but more tourists. Winter offers Christmas markets and skiing but shorter days. Would you like more details about specific countries or seasons, or is this helpful for now?"

Previous conversation:
${conversationHistory}

User: ${messageText}

Remember: 
- You are ONLY a tourism expert - redirect all non-tourism questions politely
- Be enthusiastic about travel and genuinely helpful
- Keep responses concise unless user wants more
- ALWAYS end with "Would you like more details, or is this helpful for now?"
- Adapt detail level based on their feedback`;

      const apiUrl = `https://CreepyTech-creepy-ai.hf.space/ai/logic?q=${encodeURIComponent(
        systemPrompt
      )}&logic=chat`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (data && data.result) {
        const cleanText = cleanMarkdown(data.result);
        setMessages((prev) => [...prev, { text: cleanText, sender: "bot" }]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I apologize for the connection issue. I'm here to help with all your tourism and travel questions! Please try asking again, and I'll be happy to assist with destination recommendations, travel planning, or any tourism-related inquiries. 🌍",
          sender: "bot",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Simple Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className='fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] hover:from-[#388E3C] hover:to-[#2E7D32] shadow-lg z-40 transition-all duration-300 flex items-center justify-center'>
            <MessageCircle className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6B35] rounded-full animate-pulse"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
            className='fixed bottom-6 right-6 z-50 w-[90vw] max-w-md'>
            <div className='bg-card rounded-3xl shadow-2xl overflow-hidden border-2 border-blue-500/20'>
              {/* Header */}
              <motion.div
                className='relative bg-gradient-to-br from-blue-500 to-cyan-500 p-6 overflow-hidden'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}>
                <div className='absolute inset-0 opacity-20'>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className='absolute w-20 h-20 rounded-full bg-white/30 blur-xl'
                      animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>

                <div className='relative z-10 flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <motion.div
                      className='w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30'
                      animate={{
                        borderRadius: [
                          "50% 50% 50% 50%",
                          "60% 40% 30% 70%",
                          "50% 50% 50% 50%",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}>
                      <Compass className='w-6 h-6 text-white' />
                    </motion.div>
                    <div>
                      <h3 className='font-bold text-white text-lg'>
                        Kilisee Bot
                      </h3>
                      <motion.div
                        className='flex items-center gap-1 text-sm text-white/80'
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}>
                        <div className='w-2 h-2 bg-green-400 rounded-full' />
                        <span>Tourism Expert</span>
                      </motion.div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className='w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors'>
                    <X className='w-5 h-5 text-white' />
                  </motion.button>
                </div>
              </motion.div>

              {/* Messages Container */}
              <div className='h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-card to-muted/20'>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}>
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        msg.sender === "user"
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg"
                          : "bg-card text-foreground shadow-md border border-border"
                      }`}>
                      <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                        {msg.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex justify-start'>
                    <div className='bg-card text-foreground shadow-md border border-border rounded-2xl p-4'>
                      <div className='flex gap-1.5'>
                        <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'></div>
                        <div
                          className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'
                          style={{ animationDelay: "0.15s" }}></div>
                        <div
                          className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'
                          style={{ animationDelay: "0.3s" }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className='p-4 bg-muted/30 border-t border-border'>
                <p className='text-xs text-muted-foreground mb-3 font-medium'>
                  Quick Questions
                </p>
                <div className='grid grid-cols-2 gap-2'>
                  {quickActions.map((action, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendMessage(action.value)}
                      disabled={isTyping}
                      className='flex items-center gap-2 p-3 rounded-xl bg-card hover:bg-blue-500/10 transition-colors border border-border group disabled:opacity-50'>
                      <action.icon className='w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform' />
                      <span className='text-xs font-medium text-foreground'>
                        {action.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className='p-4 bg-card border-t border-border'>
                <div className='flex gap-2'>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && !e.shiftKey && handleSendMessage()
                    }
                    placeholder='Ask about travel destinations...'
                    disabled={isTyping}
                    className='flex-1 rounded-xl border-border focus:border-blue-500 transition-colors'
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!message.trim() || isTyping}
                      size='icon'
                      className='rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-lg'>
                      <Send className='w-4 h-4' />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KiliseeBot;