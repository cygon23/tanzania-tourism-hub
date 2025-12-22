import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Calendar,
  Camera,
  MessageCircle,
  Heart,
  Star,
  Compass,
  Plane,
  TrendingUp,
  BarChart3,
  Eye,
  Sparkles,
  Clock,
  Users,
  Zap,
  ThumbsUp,
  ArrowRight
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const userStats = [
  { label: "Saved Destinations", value: "12", icon: Heart, color: "sunset", change: "+3" },
  { label: "Upcoming Trips", value: "2", icon: Calendar, color: "safari", change: "Active" },
  { label: "Tours Completed", value: "8", icon: Compass, color: "ocean", change: "+2" },
  { label: "Reviews Given", value: "15", icon: Star, color: "sunset", change: "+5" },
];

const featuredDestinations = [
  { name: "Serengeti National Park", image: "/placeholder.svg", rating: 4.9, category: "Safari" },
  { name: "Zanzibar Beaches", image: "/placeholder.svg", rating: 4.8, category: "Beach" },
  { name: "Mount Kilimanjaro", image: "/placeholder.svg", rating: 4.7, category: "Adventure" },
  { name: "Ngorongoro Crater", image: "/placeholder.svg", rating: 4.9, category: "Wildlife" },
];

const quickActions = [
  { title: "Explore Destinations", description: "Discover amazing places", icon: MapPin, color: "safari", path: "/dashboard/explore" },
  { title: "AI Travel Guide", description: "Get personalized tips", icon: MessageCircle, color: "ocean", path: "/dashboard/ai-guide" },
  { title: "Virtual Tours", description: "Experience remotely", icon: Camera, color: "sunset", path: "/dashboard/virtual" },
  { title: "My Analytics", description: "View your stats", icon: BarChart3, color: "ocean", path: "/dashboard/my-analytics" },
];

// Personalized recommendations based on user preferences
const personalizedRecommendations = [
  {
    id: 1,
    title: "Tarangire National Park",
    description: "Based on your love for safaris, you'll enjoy the elephant herds here",
    category: "Safari",
    match: 95,
    duration: "2-3 days",
    bestTime: "Jun - Oct",
    highlights: ["Elephant migration", "Baobab trees", "Bird watching"],
    reason: "Similar to Serengeti which you loved",
    icon: Compass,
  },
  {
    id: 2,
    title: "Pemba Island",
    description: "A quieter alternative to Zanzibar with pristine diving spots",
    category: "Beach",
    match: 88,
    duration: "4-5 days",
    bestTime: "Dec - Mar",
    highlights: ["Scuba diving", "Spice tours", "Secluded beaches"],
    reason: "You enjoyed beach destinations",
    icon: MapPin,
  },
  {
    id: 3,
    title: "Lake Manyara",
    description: "Perfect day trip combining wildlife and stunning lake views",
    category: "Wildlife",
    match: 92,
    duration: "1 day",
    bestTime: "Year round",
    highlights: ["Tree-climbing lions", "Flamingos", "Hot springs"],
    reason: "Great addition to your safari route",
    icon: Eye,
  },
];

// AI-generated insights
const aiInsights = [
  {
    icon: Zap,
    title: "Peak Season Alert",
    description: "Serengeti migration peaks in July. Book now for best wildlife viewing!",
    type: "timing",
  },
  {
    icon: Users,
    title: "Group Deal",
    description: "Join 3 other travelers heading to Ngorongoro next month and save 20%",
    type: "social",
  },
  {
    icon: ThumbsUp,
    title: "Trending Destination",
    description: "Ruaha National Park is gaining popularity - fewer crowds, more wildlife",
    type: "trending",
  },
];

// Chart data
const activityData = [
  { name: "Mon", views: 4, saves: 2 },
  { name: "Tue", views: 3, saves: 1 },
  { name: "Wed", views: 6, saves: 3 },
  { name: "Thu", views: 4, saves: 2 },
  { name: "Fri", views: 8, saves: 5 },
  { name: "Sat", views: 12, saves: 7 },
  { name: "Sun", views: 9, saves: 4 },
];

const destinationTypes = [
  { name: "Safari", value: 40, color: "#D97706" },
  { name: "Beach", value: 30, color: "#0891B2" },
  { name: "Mountain", value: 20, color: "#059669" },
  { name: "Cultural", value: 10, color: "#DC2626" },
];

export default function UserDashboardHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToStatsRefs = (el: HTMLDivElement) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Karibu,{" "}
          <span className="bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
            {user?.name || "Traveler"}!
          </span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg">
          Ready for your next Tanzanian adventure? Let's explore together.
        </p>
      </div>

      {/* User Stats with Trend Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {userStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              ref={addToStatsRefs}
              className="p-4 md:p-6 border-2 border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 md:p-3 rounded-xl bg-${stat.color}/10 group-hover:bg-${stat.color}/20 transition-colors duration-300`}>
                    <IconComponent className={`w-5 h-5 md:w-6 md:h-6 text-${stat.color}`} />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs md:text-sm">
                  {stat.label}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card className="p-4 md:p-6 border-2 border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Weekly Activity</h3>
              <p className="text-sm text-muted-foreground">Your exploration this week</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-500">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+24%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891B2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0891B2" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSaves" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D97706" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#0891B2"
                fillOpacity={1}
                fill="url(#colorViews)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="saves"
                stroke="#D97706"
                fillOpacity={1}
                fill="url(#colorSaves)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-ocean" />
              <span className="text-xs text-muted-foreground">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-safari" />
              <span className="text-xs text-muted-foreground">Saves</span>
            </div>
          </div>
        </Card>

        {/* Destination Preferences Pie Chart */}
        <Card className="p-4 md:p-6 border-2 border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Your Preferences</h3>
              <p className="text-sm text-muted-foreground">Favorite destination types</p>
            </div>
            <Eye className="w-5 h-5 text-ocean" />
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={destinationTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {destinationTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Interest"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {destinationTypes.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Personalized Recommendations Section */}
      <div>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-safari/20 to-ocean/20">
              <Sparkles className="w-5 h-5 text-safari" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground">Recommended for You</h3>
              <p className="text-sm text-muted-foreground">Based on your travel preferences & history</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-ocean border-ocean/30 hover:bg-ocean/10">
            See All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {personalizedRecommendations.map((rec) => {
            const IconComponent = rec.icon;
            return (
              <Card
                key={rec.id}
                className="overflow-hidden border-2 border-border/50 hover:border-safari/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                {/* Match Badge */}
                <div className="relative h-24 bg-gradient-to-br from-safari/20 via-ocean/10 to-sunset/20">
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-safari/90 text-white border-0">
                      {rec.match}% Match
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {rec.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm">
                    <IconComponent className="w-5 h-5 text-safari" />
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-foreground text-base mb-1 group-hover:text-safari transition-colors">
                    {rec.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {rec.description}
                  </p>
                  
                  {/* Details */}
                  <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{rec.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{rec.bestTime}</span>
                    </div>
                  </div>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {rec.highlights.slice(0, 2).map((highlight, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  
                  {/* Reason */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                    <Sparkles className="w-3 h-3 text-ocean" />
                    <span className="text-xs text-ocean font-medium">{rec.reason}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {aiInsights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <Card
              key={index}
              className="p-4 border-2 border-border/50 hover:border-ocean/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-ocean/10 group-hover:bg-ocean/20 transition-colors">
                  <IconComponent className="w-4 h-4 text-ocean" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm mb-1">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-ocean group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">What would you like to do?</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card
                key={index}
                onClick={() => navigate(action.path)}
                className="p-4 md:p-6 border-2 border-border/50 hover:border-border hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className={`inline-flex p-3 md:p-4 rounded-2xl bg-${action.color}/10 group-hover:bg-${action.color}/20 transition-colors duration-300 mb-3 md:mb-4`}>
                  <IconComponent className={`w-6 h-6 md:w-8 md:h-8 text-${action.color}`} />
                </div>
                <h4 className="text-sm md:text-lg font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors duration-300">
                  {action.title}
                </h4>
                <p className="text-muted-foreground text-xs md:text-sm hidden md:block">
                  {action.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Featured Destinations */}
      <div>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">Featured Destinations</h3>
          <Button variant="outline" size="sm" className="text-safari border-safari/30 hover:bg-safari/10">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredDestinations.map((destination, index) => (
            <Card
              key={index}
              className="overflow-hidden border-2 border-border/50 hover:border-border hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-32 md:h-40 bg-gradient-to-br from-safari/20 to-ocean/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-safari/30" />
                </div>
                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                  {destination.category}
                </div>
              </div>
              <div className="p-3 md:p-4">
                <h4 className="font-semibold text-foreground text-sm md:text-base mb-1 group-hover:text-safari transition-colors">
                  {destination.name}
                </h4>
                <div className="flex items-center text-muted-foreground text-xs md:text-sm">
                  <Star className="w-4 h-4 text-sunset mr-1 fill-sunset" />
                  <span>{destination.rating}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Trip Reminder */}
      <Card className="p-4 md:p-6 border-2 border-safari/30 bg-gradient-to-r from-safari/5 to-ocean/5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-safari/20">
              <Plane className="w-6 h-6 text-safari" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Your Next Adventure</h4>
              <p className="text-muted-foreground text-sm">Serengeti Safari - Dec 25, 2024</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-safari to-ocean text-white hover:opacity-90">
            View Details
          </Button>
        </div>
      </Card>
    </div>
  );
}
