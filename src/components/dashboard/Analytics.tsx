import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, MapPin, Calendar, BarChart3, PieChart, Activity, Target } from "lucide-react";

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
  { month: "Jan", visitors: 8400, bookings: 240 },
  { month: "Feb", visitors: 9100, bookings: 280 },
  { month: "Mar", visitors: 12300, bookings: 350 },
  { month: "Apr", visitors: 14200, bookings: 420 },
  { month: "May", visitors: 13800, bookings: 390 },
  { month: "Jun", visitors: 15600, bookings: 470 }
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-safari" />
                  <span>Visitor Trends</span>
                </CardTitle>
                <CardDescription>Monthly visitor statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-safari/10 to-ocean/10 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <BarChart3 className="h-12 w-12 mx-auto text-safari/50" />
                    <p className="text-muted-foreground">Visitor trends chart visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-ocean" />
                  <span>Revenue Distribution</span>
                </CardTitle>
                <CardDescription>Revenue by service category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-ocean/10 to-sunset/10 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <PieChart className="h-12 w-12 mx-auto text-ocean/50" />
                    <p className="text-muted-foreground">Revenue distribution chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="destinations" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-safari" />
                  <span>Seasonal Trends</span>
                </CardTitle>
                <CardDescription>Visitor patterns throughout the year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-safari rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{data.visitors.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-ocean rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{data.bookings}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-safari h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Revenue Target</span>
                      <span>92% achieved</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-ocean h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Customer Satisfaction</span>
                      <span>96% achieved</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-sunset h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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