import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Clock, CreditCard, Filter, Plus, TrendingUp } from "lucide-react";

const bookings = [
  {
    id: "TZ-001",
    destination: "Serengeti National Park",
    client: "John & Sarah Miller",
    type: "Safari Package",
    guests: 2,
    date: "March 15-22, 2024",
    status: "Confirmed",
    amount: "$3,250"
  },
  {
    id: "TZ-002", 
    destination: "Zanzibar Beach Resort",
    client: "David Chen",
    type: "Beach Holiday",
    guests: 4,
    date: "April 10-17, 2024", 
    status: "Pending",
    amount: "$2,800"
  },
  {
    id: "TZ-003",
    destination: "Kilimanjaro Trek",
    client: "Adventure Group",
    type: "Mountain Climbing",
    guests: 8,
    date: "May 5-12, 2024",
    status: "Confirmed", 
    amount: "$8,400"
  },
  {
    id: "TZ-004",
    destination: "Ngorongoro Crater",
    client: "Wildlife Photographers",
    type: "Photography Tour",
    guests: 6,
    date: "June 1-8, 2024",
    status: "Processing",
    amount: "$4,200"
  }
];

const campaigns = [
  {
    name: "Serengeti Special",
    discount: "20% off",
    type: "Safari Packages",
    daysLeft: 5,
    status: "active",
    performance: "+45% bookings"
  },
  {
    name: "Zanzibar Summer",
    discount: "15% off",
    type: "Beach Holidays",
    daysLeft: 12,
    status: "active",
    performance: "+32% clicks"
  },
  {
    name: "Kilimanjaro Challenge",
    discount: "Free guide",
    type: "Mountain Tours",
    daysLeft: 2,
    status: "ending",
    performance: "+28% inquiries"
  }
];

const stats = [
  { label: "Total Bookings", value: "247", change: "+12%", icon: Calendar },
  { label: "Revenue Today", value: "$12,450", change: "+8%", icon: CreditCard },
  { label: "Active Campaigns", value: "8", change: "+2", icon: TrendingUp },
  { label: "Pending Bookings", value: "18", change: "-3", icon: Clock }
];

export default function Booking() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bookings & Advertisements</h1>
          <p className="text-muted-foreground mt-2">
            Manage tourist bookings and promotional campaigns
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-safari mt-1">{stat.change}</p>
                </div>
                <stat.icon className="h-8 w-8 text-safari" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
          <TabsTrigger value="campaigns">Ad Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest tourism bookings and reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{booking.destination}</h4>
                        <p className="text-muted-foreground text-sm">{booking.client}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={booking.status === 'Confirmed' ? 'default' : booking.status === 'Pending' ? 'secondary' : 'outline'}>
                          {booking.status}
                        </Badge>
                        <span className="font-semibold text-foreground">{booking.amount}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-safari" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-ocean" />
                        <span>{booking.guests} guests</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-sunset" />
                        <span>{booking.type}</span>
                      </div>
                      <div className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <CardDescription>{campaign.type}</CardDescription>
                    </div>
                    <Badge variant={campaign.status === 'active' ? 'default' : 'destructive'}>
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Discount:</span>
                      <span className="font-semibold text-safari">{campaign.discount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Time Left:</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-ocean" />
                        <span className="text-sm font-medium">{campaign.daysLeft} days</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Performance:</span>
                      <span className="text-sm font-medium text-green-600">{campaign.performance}</span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Trends</CardTitle>
                <CardDescription>Monthly booking performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-safari/10 to-ocean/10 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Booking trends chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Ad campaign effectiveness metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-ocean/10 to-sunset/10 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Campaign performance chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}