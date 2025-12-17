import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Compass, Map, Calendar, Info, ExternalLink, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickActions = [
  { icon: Map, label: "Destinations", value: "What destinations do you recommend?" },
  { icon: Calendar, label: "Best Time", value: "When is the best time to visit?" },
  { icon: Compass, label: "Activities", value: "What activities can I do?" },
  { icon: Info, label: "About Kilisee", value: "Tell me about Kilisee tourism services" },
];

interface SearchResult {
  title: string;
  url: string;
  content: string;
  images?: string[];
}

const KiliseeBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ 
    text: string; 
    sender: "user" | "bot";
    searchResults?: SearchResult[];
    images?: string[];
  }>>([
    {
      text: "Hello! 🌍 Welcome to Kilisee Tourism. I'm your expert travel assistant ready to help you discover amazing destinations, plan unforgettable adventures, and answer all your tourism questions. I can also search the web for current information, images, and recommendations. How can I assist you today?",
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

  const callTavilySearch = async (query: string) => {
    try {
      // Call our serverless function instead of Tavily directly
      const response = await fetch("/api/tavily-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Search API error:", errorData);
        throw new Error(errorData.error || "Search failed");
      }

      const data = await response.json();
      return {
        results: data.results || [],
        images: data.images || [],
        answer: data.answer || ""
      };
    } catch (error) {
      console.error("Tavily search error:", error);
      return null;
    }
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

WEB SEARCH CAPABILITY:
CRITICAL: When user asks for ANY of these, you MUST trigger a search:
- Images, photos, or pictures ("show me", "what does X look like")
- Current prices, rates, or costs
- Specific hotels, lodges, or accommodations by name
- Reviews or ratings
- Recent news or updates
- "Find", "search", "look up" requests
- Availability or booking information
- Specific destinations with details

SEARCH FORMAT - Use EXACTLY this format (no extra text before or after):
TAVILY_SEARCH:[your search query here]

Examples:
User: "Show me lodges in Zanzibar"
CORRECT Response: TAVILY_SEARCH:luxury lodges Zanzibar with reviews prices

User: "What does Mount Kilimanjaro look like?"
CORRECT Response: TAVILY_SEARCH:Mount Kilimanjaro photos images

User: "Find hotels in Serengeti"
CORRECT Response: TAVILY_SEARCH:Serengeti safari hotels accommodation

DO NOT add any other text when searching. ONLY the TAVILY_SEARCH line.
After I provide search results, then you format them nicely.

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

Previous conversation:
${conversationHistory}

User: ${messageText}

Remember: 
- You are ONLY a tourism expert - redirect all non-tourism questions politely
- Be enthusiastic about travel and genuinely helpful
- Use TAVILY_SEARCH when user needs current info, images, or specific recommendations
- Keep responses concise unless user wants more
- ALWAYS end with "Would you like more details, or is this helpful for now?"`;

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
        
        // Check if AI wants to search (more flexible pattern matching)
        const searchPattern = /TAVILY[_\s]*SEARCH\s*:\s*(.+?)(?:\n|$)/i;
        const searchMatch = cleanText.match(searchPattern);
        
        if (searchMatch) {
          const searchQuery = searchMatch[1].trim();
          
          // Show searching message
          setMessages((prev) => [...prev, { 
            text: `🔍 Searching for "${searchQuery}"...`, 
            sender: "bot" 
          }]);
          
          // Call Tavily
          const searchData = await callTavilySearch(searchQuery);
          
          if (searchData && searchData.results && searchData.results.length > 0) {
            // Format search results for AI to present
            const resultsText = searchData.results
              .slice(0, 3)
              .map((r: any, i: number) => `${i + 1}. ${r.title}\nSource: ${r.url}\n${r.content.substring(0, 200)}...`)
              .join("\n\n");
            
            const formattingPrompt = `You are a tourism expert. Based on the web search results below, provide a helpful, natural response to the user's question: "${messageText}"

Web Search Results:
${resultsText}

${searchData.answer ? `Summary: ${searchData.answer}` : ''}

Instructions:
- Write naturally as if you're sharing recommendations with a friend
- Mention 2-3 key findings from the results
- Reference that this is current information from the web
- End with "Would you like more details about any of these, or is this helpful for now?"
- Keep it concise (3-4 sentences)`;

            const formattingUrl = `https://CreepyTech-creepy-ai.hf.space/ai/logic?q=${encodeURIComponent(
              formattingPrompt
            )}&logic=chat`;

            const formattedResponse = await fetch(formattingUrl);
            const formattedData = await formattedResponse.json();
            
            if (formattedData && formattedData.result) {
              // Remove the searching message and add final response with results
              setMessages((prev) => {
                const updated = prev.slice(0, -1); // Remove searching message
                return [...updated, { 
                  text: cleanMarkdown(formattedData.result),
                  sender: "bot",
                  searchResults: searchData.results.slice(0, 3),
                  images: searchData.images && searchData.images.length > 0 ? searchData.images.slice(0, 4) : undefined
                }];
              });
            }
          } else {
            // Search failed or no results
            setMessages((prev) => {
              const updated = prev.slice(0, -1);
              return [...updated, { 
                text: "I tried searching for current information but couldn't retrieve results at the moment. Let me share what I know from my tourism expertise! For the most current details on lodges, prices, and availability, I recommend checking booking platforms like Booking.com or TripAdvisor. Would you like general information about Zanzibar accommodations instead?",
                sender: "bot"
              }];
            });
          }
        } else {
          // Normal response without search
          setMessages((prev) => [...prev, { text: cleanText, sender: "bot" }]);
        }
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
            <div className='bg-card rounded-3xl shadow-2xl overflow-hidden border-2 border-[#2E7D32]/20'>
              {/* Header */}
              <motion.div
                className='relative bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] p-6 overflow-hidden'
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
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}>
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        msg.sender === "user"
                          ? "bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white shadow-lg"
                          : "bg-card text-foreground shadow-md border border-border"
                      }`}>
                      <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                        {msg.text}
                      </p>
                    </div>

                    {/* Display Images if available */}
                    {msg.images && msg.images.length > 0 && (
                      <div className='mt-2 grid grid-cols-2 gap-2 max-w-[80%]'>
                        {msg.images.map((imgUrl, imgIdx) => (
                          <motion.a
                            key={imgIdx}
                            href={imgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='relative rounded-lg overflow-hidden group cursor-pointer'
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: imgIdx * 0.1 }}>
                            <img 
                              src={imgUrl} 
                              alt={`Result ${imgIdx + 1}`}
                              className='w-full h-24 object-cover'
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                              <ImageIcon className='w-5 h-5 text-white' />
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    )}

                    {/* Display Search Results if available */}
                    {msg.searchResults && msg.searchResults.length > 0 && (
                      <div className='mt-2 space-y-2 max-w-[80%]'>
                        <p className='text-xs text-muted-foreground font-medium flex items-center gap-1'>
                          <ExternalLink className='w-3 h-3' />
                          Sources:
                        </p>
                        {msg.searchResults.map((result, resIdx) => (
                          <motion.a
                            key={resIdx}
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='block p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border text-xs'
                            whileHover={{ x: 5 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: resIdx * 0.1 }}>
                            <p className='font-medium text-foreground line-clamp-1'>{result.title}</p>
                            <p className='text-muted-foreground text-[10px] line-clamp-1 mt-0.5'>{result.url}</p>
                          </motion.a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex justify-start'>
                    <div className='bg-card text-foreground shadow-md border border-border rounded-2xl p-4'>
                      <div className='flex gap-1.5'>
                        <div className='w-2 h-2 bg-[#2E7D32] rounded-full animate-bounce'></div>
                        <div
                          className='w-2 h-2 bg-[#2E7D32] rounded-full animate-bounce'
                          style={{ animationDelay: "0.15s" }}></div>
                        <div
                          className='w-2 h-2 bg-[#2E7D32] rounded-full animate-bounce'
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
                      className='flex items-center gap-2 p-3 rounded-xl bg-card hover:bg-[#2E7D32]/10 transition-colors border border-border group disabled:opacity-50'>
                      <action.icon className='w-4 h-4 text-[#2E7D32] group-hover:scale-110 transition-transform' />
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
                    className='flex-1 rounded-xl border-border focus:border-[#2E7D32] transition-colors'
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!message.trim() || isTyping}
                      size='icon'
                      className='rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] hover:from-[#FF8C42] hover:to-[#FF6B35] shadow-lg'>
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