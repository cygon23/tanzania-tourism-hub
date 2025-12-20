import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  Calendar,
  Database,
  MessageCircle,
  Camera,
  BarChart3
} from "lucide-react";
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
  Legend,
  LineChart,
  Line
} from "recharts";

const stats = [
  { label: "Total Visitors", value: "125,847", change: "+12.5%", icon: Users, color: "safari" },
  { label: "Destinations", value: "156", change: "+5", icon: MapPin, color: "ocean" },
  { label: "Bookings Today", value: "247", change: "+18.2%", icon: Calendar, color: "sunset" },
  { label: "Revenue", value: "$45,231", change: "+8.7%", icon: TrendingUp, color: "safari" },
];

const quickActions = [
  { title: "Data Hub", description: "Access tourism data", icon: Database, color: "safari" },
  { title: "AI Guide", description: "Chat with AI assistant", icon: MessageCircle, color: "ocean" },
  { title: "Virtual Tours", description: "Manage VR experiences", icon: Camera, color: "sunset" },
  { title: "Analytics", description: "View detailed reports", icon: BarChart3, color: "safari" },
];

const visitorTrends = [
  { month: "Jan", visitors: 8400, bookings: 240, revenue: 32000 },
  { month: "Feb", visitors: 9100, bookings: 280, revenue: 38000 },
  { month: "Mar", visitors: 12300, bookings: 350, revenue: 45000 },
  { month: "Apr", visitors: 14200, bookings: 420, revenue: 52000 },
  { month: "May", visitors: 13800, bookings: 390, revenue: 48000 },
  { month: "Jun", visitors: 15600, bookings: 470, revenue: 58000 },
];

const trafficSources = [
  { name: "Direct", value: 35, color: "#F97316" },
  { name: "Social", value: 28, color: "#0891B2" },
  { name: "Search", value: 22, color: "#FCD34D" },
  { name: "Referral", value: 15, color: "#10B981" },
];

const destinationPerformance = [
  { name: "Serengeti", visitors: 4523, bookings: 892 },
  { name: "Zanzibar", visitors: 3890, bookings: 756 },
  { name: "Kilimanjaro", visitors: 2145, bookings: 423 },
  { name: "Ngorongoro", visitors: 1983, bookings: 312 },
  { name: "Tarangire", visitors: 1456, bookings: 234 },
];

export default function DashboardHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const actionsRef = useRef<HTMLDivElement[]>([]);

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

      gsap.fromTo(
        actionsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.6,
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

  const addToActionsRefs = (el: HTMLDivElement) => {
    if (el && !actionsRef.current.includes(el)) {
      actionsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Welcome back to{" "}
          <span className="bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
            Tanzania Hub
          </span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Monitor your tourism platform performance and manage operations from one central location.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              ref={addToStatsRefs}
              className="p-6 border-2 border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}/10 group-hover:bg-${stat.color}/20 transition-colors duration-300`}>
                  <IconComponent className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">
                  {stat.label}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor Trends Area Chart */}
        <Card className="p-6 border-2 border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Visitor Trends</h3>
              <p className="text-sm text-muted-foreground">Monthly visitor statistics</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#F97316]"></span>Visitors</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#0891B2]"></span>Bookings</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorTrends}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891B2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0891B2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Area type="monotone" dataKey="visitors" stroke="#F97316" fillOpacity={1} fill="url(#colorVisitors)" strokeWidth={2} />
                <Area type="monotone" dataKey="bookings" stroke="#0891B2" fillOpacity={1} fill="url(#colorBookings)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Traffic Sources Pie Chart */}
        <Card className="p-6 border-2 border-border/50">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Traffic Sources</h3>
            <p className="text-sm text-muted-foreground">Where visitors come from</p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
                <Legend 
                  verticalAlign="middle" 
                  align="right" 
                  layout="vertical"
                  formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Destination Performance Bar Chart */}
        <Card className="p-6 border-2 border-border/50">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Top Destinations</h3>
            <p className="text-sm text-muted-foreground">Visitors & bookings by location</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={destinationPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="visitors" fill="#F97316" radius={[0, 4, 4, 0]} />
                <Bar dataKey="bookings" fill="#0891B2" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Revenue Line Chart */}
        <Card className="p-6 border-2 border-border/50">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Revenue Growth</h3>
            <p className="text-sm text-muted-foreground">Monthly revenue performance</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#FCD34D" strokeWidth={3} dot={{ fill: '#FCD34D', strokeWidth: 2, r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-2xl font-semibold text-foreground mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card
                key={index}
                ref={addToActionsRefs}
                className="p-6 border-2 border-border/50 hover:border-border hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-${action.color}/10 group-hover:bg-${action.color}/20 transition-colors duration-300 mb-4`}>
                  <IconComponent className={`w-8 h-8 text-${action.color}`} />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {action.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  {action.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`w-full border-${action.color}/30 text-${action.color} hover:bg-${action.color}/10 hover:border-${action.color}`}
                >
                  Access Now
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-2xl font-semibold text-foreground mb-6">Recent Activity</h3>
        <Card className="p-6 border-2 border-border/50">
          <div className="space-y-4">
            {[
              { action: "New booking received", time: "2 minutes ago", type: "booking" },
              { action: "Data hub updated", time: "15 minutes ago", type: "data" },
              { action: "AI guide query answered", time: "1 hour ago", type: "ai" },
              { action: "Virtual tour created", time: "2 hours ago", type: "virtual" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'booking' ? 'bg-safari' : 
                    activity.type === 'data' ? 'bg-ocean' : 
                    activity.type === 'ai' ? 'bg-sunset' : 'bg-safari'
                  }`}></div>
                  <span className="text-foreground font-medium">{activity.action}</span>
                </div>
                <span className="text-muted-foreground text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}