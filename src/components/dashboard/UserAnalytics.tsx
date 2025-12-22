import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card } from "@/components/ui/card";
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
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  TrendingUp,
  MapPin,
  Calendar,
  Star,
  Eye,
  Heart,
  Compass,
  Camera,
} from "lucide-react";

// Mock data for user analytics
const activityData = [
  { month: "Jan", views: 12, saves: 4, bookings: 1 },
  { month: "Feb", views: 19, saves: 6, bookings: 2 },
  { month: "Mar", views: 25, saves: 8, bookings: 1 },
  { month: "Apr", views: 32, saves: 12, bookings: 3 },
  { month: "May", views: 28, saves: 10, bookings: 2 },
  { month: "Jun", views: 45, saves: 15, bookings: 4 },
];

const destinationPreferences = [
  { name: "Safari", value: 35, color: "#D97706" },
  { name: "Beach", value: 25, color: "#0891B2" },
  { name: "Mountain", value: 20, color: "#059669" },
  { name: "Cultural", value: 15, color: "#DC2626" },
  { name: "Wildlife", value: 5, color: "#7C3AED" },
];

const tripHistory = [
  { name: "Serengeti", rating: 5, date: "2024-03" },
  { name: "Zanzibar", rating: 4.5, date: "2024-06" },
  { name: "Kilimanjaro", rating: 5, date: "2024-08" },
  { name: "Ngorongoro", rating: 4.8, date: "2024-10" },
];

const engagementStats = [
  { label: "Profile Views", value: "234", change: "+12%", icon: Eye, color: "ocean" },
  { label: "Destinations Saved", value: "28", change: "+8%", icon: Heart, color: "sunset" },
  { label: "Tours Completed", value: "8", change: "+2", icon: Compass, color: "safari" },
  { label: "Photos Shared", value: "156", change: "+24", icon: Camera, color: "ocean" },
];

const weeklyActivity = [
  { day: "Mon", hours: 1.2 },
  { day: "Tue", hours: 0.8 },
  { day: "Wed", hours: 2.1 },
  { day: "Thu", hours: 1.5 },
  { day: "Fri", hours: 2.8 },
  { day: "Sat", hours: 4.2 },
  { day: "Sun", hours: 3.5 },
];

export default function UserAnalytics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Your Travel{" "}
          <span className="bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
            Analytics
          </span>
        </h2>
        <p className="text-muted-foreground">
          Track your exploration journey and travel preferences
        </p>
      </div>

      {/* Engagement Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {engagementStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              ref={addToRefs}
              className="p-4 md:p-6 border-2 border-border/50 hover:border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className={`p-2 md:p-3 rounded-xl bg-${stat.color}/10`}>
                  <IconComponent className={`w-5 h-5 md:w-6 md:h-6 text-${stat.color}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.change.startsWith('+') 
                    ? 'bg-emerald-500/10 text-emerald-500' 
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Activity Over Time & Destination Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card ref={addToRefs} className="p-4 md:p-6 border-2 border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Activity Overview</h3>
              <p className="text-sm text-muted-foreground">Your engagement over time</p>
            </div>
            <TrendingUp className="w-5 h-5 text-safari" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
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
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
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
        </Card>

        {/* Destination Preferences Pie Chart */}
        <Card ref={addToRefs} className="p-4 md:p-6 border-2 border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Travel Preferences</h3>
              <p className="text-sm text-muted-foreground">Your favorite destination types</p>
            </div>
            <MapPin className="w-5 h-5 text-ocean" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={destinationPreferences}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {destinationPreferences.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {destinationPreferences.map((item, index) => (
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

      {/* Weekly Activity & Trip Ratings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card ref={addToRefs} className="p-4 md:p-6 border-2 border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Weekly Activity</h3>
              <p className="text-sm text-muted-foreground">Hours spent exploring</p>
            </div>
            <Calendar className="w-5 h-5 text-sunset" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value} hrs`, "Time"]}
              />
              <Bar
                dataKey="hours"
                fill="#D97706"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Trip Ratings */}
        <Card ref={addToRefs} className="p-4 md:p-6 border-2 border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Trip Ratings</h3>
              <p className="text-sm text-muted-foreground">Your completed adventures</p>
            </div>
            <Star className="w-5 h-5 text-sunset fill-sunset" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={tripHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value}/5`, "Rating"]}
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#0891B2"
                strokeWidth={3}
                dot={{ fill: "#0891B2", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: "#D97706" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Achievement Summary */}
      <Card ref={addToRefs} className="p-6 border-2 border-safari/30 bg-gradient-to-r from-safari/5 to-ocean/5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              🏆 Explorer Level: Gold Adventurer
            </h3>
            <p className="text-muted-foreground">
              You've explored 8 destinations and rated 4 experiences. Keep exploring to unlock Platinum status!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-2xl font-bold text-safari">78%</p>
              <p className="text-xs text-muted-foreground">to Platinum</p>
            </div>
            <div className="w-24 h-3 bg-muted rounded-full overflow-hidden">
              <div className="w-[78%] h-full bg-gradient-to-r from-safari to-ocean rounded-full" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
