import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, MapPin, Calendar, BarChart3, PieChart, Activity, Target, Globe, Plane } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter
} from "recharts";

const stats = [
  { label: "Total Visitors", value: "125,847", change: "+12.5%", icon: Users, color: "safari", trend: "up" },
  { label: "Popular Destinations", value: "156", change: "+5", icon: MapPin, color: "ocean", trend: "up" },
  { label: "Bookings This Month", value: "2,471", change: "+18.2%", icon: Calendar, color: "sunset", trend: "up" },
  { label: "Revenue Growth", value: "$452,310", change: "+24.7%", icon: TrendingUp, color: "safari", trend: "up" },
];

const topDestinations = [
  { name: "Serengeti National Park", visitors: "45,234", growth: "+15%" },
  { name: "Zanzibar Beaches", visitors: "38,901", growth: "+22%" },
  { name: "Mount Kilimanjaro", visitors: "21,456", growth: "+8%" },
  { name: "Ngorongoro Crater", visitors: "19,834", growth: "+12%" }
];

const monthlyData = [
  { month: "Jan", visitors: 8400, bookings: 240, revenue: 32000, international: 5600, domestic: 2800 },
  { month: "Feb", visitors: 9100, bookings: 280, revenue: 38000, international: 6200, domestic: 2900 },
  { month: "Mar", visitors: 12300, bookings: 350, revenue: 45000, international: 8400, domestic: 3900 },
  { month: "Apr", visitors: 14200, bookings: 420, revenue: 52000, international: 9800, domestic: 4400 },
  { month: "May", visitors: 13800, bookings: 390, revenue: 48000, international: 9200, domestic: 4600 },
  { month: "Jun", visitors: 15600, bookings: 470, revenue: 58000, international: 10800, domestic: 4800 }
];

const serviceDistribution = [
  { name: "Safari Tours", value: 35, color: "#F97316" },
  { name: "Beach Resorts", value: 25, color: "#0891B2" },
  { name: "Mountain Treks", value: 18, color: "#FCD34D" },
  { name: "Cultural Tours", value: 12, color: "#10B981" },
  { name: "Virtual Tours", value: 10, color: "#8B5CF6" }
];

const visitorDemographics = [
  { country: "USA", visitors: 28500, percentage: 22 },
  { country: "UK", visitors: 19200, percentage: 15 },
  { country: "Germany", visitors: 15800, percentage: 12 },
  { country: "France", visitors: 12400, percentage: 10 },
  { country: "China", visitors: 11200, percentage: 9 },
  { country: "Others", visitors: 38747, percentage: 32 }
];

const satisfactionMetrics = [
  { subject: "Service", A: 92, fullMark: 100 },
  { subject: "Value", A: 88, fullMark: 100 },
  { subject: "Experience", A: 95, fullMark: 100 },
  { subject: "Safety", A: 97, fullMark: 100 },
  { subject: "Guide", A: 94, fullMark: 100 },
  { subject: "Booking", A: 89, fullMark: 100 }
];

const weeklyBookings = [
  { day: "Mon", bookings: 45, revenue: 12500 },
  { day: "Tue", bookings: 52, revenue: 14200 },
  { day: "Wed", bookings: 48, revenue: 13800 },
  { day: "Thu", bookings: 61, revenue: 16500 },
  { day: "Fri", bookings: 78, revenue: 21000 },
  { day: "Sat", bookings: 89, revenue: 24500 },
  { day: "Sun", bookings: 72, revenue: 19800 }
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tourism Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive insights and performance metrics for Tanzania tourism
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}/10`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-50">
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Visitor Trends Area Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-safari" />
                  <span>Visitor Trends</span>
                </CardTitle>
                <CardDescription>Monthly visitor & booking statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="colorVisitorsAnalytics" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorBookingsAnalytics" x1="0" y1="0" x2="0" y2="1">
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
                      <Area type="monotone" dataKey="visitors" stroke="#F97316" fillOpacity={1} fill="url(#colorVisitorsAnalytics)" strokeWidth={2} />
                      <Area type="monotone" dataKey="bookings" stroke="#0891B2" fillOpacity={1} fill="url(#colorBookingsAnalytics)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Service Distribution Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-ocean" />
                  <span>Service Distribution</span>
                </CardTitle>
                <CardDescription>Revenue by service category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={serviceDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {serviceDistribution.map((entry, index) => (
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
                        formatter={(value) => <span className="text-foreground text-xs">{value}</span>}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Row of Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Customer Satisfaction Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-sunset" />
                  <span>Customer Satisfaction</span>
                </CardTitle>
                <CardDescription>Rating across different metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={satisfactionMetrics}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                      <Radar name="Satisfaction" dataKey="A" stroke="#F97316" fill="#F97316" fillOpacity={0.4} strokeWidth={2} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                        formatter={(value: number) => [`${value}%`, 'Score']}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Bookings Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-safari" />
                  <span>Weekly Performance</span>
                </CardTitle>
                <CardDescription>Bookings & revenue by day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={weeklyBookings}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar yAxisId="left" dataKey="bookings" fill="#0891B2" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#FCD34D" strokeWidth={3} dot={{ fill: '#FCD34D', r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="destinations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Destinations</CardTitle>
                <CardDescription>Most popular tourist destinations this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDestinations.map((destination, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-safari/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-safari">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{destination.name}</h4>
                          <p className="text-sm text-muted-foreground">{destination.visitors} visitors</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-green-600 bg-green-50">
                        {destination.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Visitor Demographics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-ocean" />
                  <span>Visitor Demographics</span>
                </CardTitle>
                <CardDescription>Visitors by country of origin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={visitorDemographics} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis dataKey="country" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={60} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                        formatter={(value: number, name: string) => [value.toLocaleString(), name === 'visitors' ? 'Visitors' : 'Share']}
                      />
                      <Bar dataKey="visitors" fill="#0891B2" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* International vs Domestic Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plane className="h-5 w-5 text-safari" />
                  <span>International vs Domestic</span>
                </CardTitle>
                <CardDescription>Visitor type comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
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
                      <Legend />
                      <Line type="monotone" dataKey="international" name="International" stroke="#F97316" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="domestic" name="Domestic" stroke="#0891B2" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-ocean" />
                  <span>Performance Targets</span>
                </CardTitle>
                <CardDescription>Goals vs achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Annual Visitors Target</span>
                      <span>85% achieved</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-safari h-3 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Revenue Target</span>
                      <span>92% achieved</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-ocean h-3 rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Customer Satisfaction</span>
                      <span>96% achieved</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-sunset h-3 rounded-full transition-all duration-500" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>New Markets</span>
                      <span>78% achieved</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-[#10B981] h-3 rounded-full transition-all duration-500" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-sunset" />
                <span>Revenue Trend</span>
              </CardTitle>
              <CardDescription>Monthly revenue performance with growth trajectory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FCD34D" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#FCD34D" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
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
                    <Area type="monotone" dataKey="revenue" stroke="#FCD34D" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-safari/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-safari" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Monthly Report</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive monthly analysis</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-ocean/10 rounded-lg">
                    <Users className="h-6 w-6 text-ocean" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Visitor Demographics</h3>
                    <p className="text-sm text-muted-foreground">Detailed visitor analysis</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Demographics
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-sunset/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-sunset" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Seasonal Analysis</h3>
                    <p className="text-sm text-muted-foreground">Peak season insights</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Analyze Seasons
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}