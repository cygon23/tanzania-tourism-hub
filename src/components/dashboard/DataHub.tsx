import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, MapPin, Users, TrendingUp, Download, ExternalLink, Globe, Activity } from "lucide-react";

const apiEndpoints = [
  {
    name: "Tourism Sites",
    endpoint: "/api/v1/sites",
    method: "GET",
    description: "Access comprehensive data on Tanzanian tourist destinations",
    responseCount: "247 locations",
    status: "active"
  },
  {
    name: "Visitor Statistics",
    endpoint: "/api/v1/analytics/visitors",
    method: "GET", 
    description: "Real-time visitor analytics and trends",
    responseCount: "Live data",
    status: "active"
  },
  {
    name: "Accommodation",
    endpoint: "/api/v1/hotels",
    method: "GET",
    description: "Hotels, lodges, and accommodation options",
    responseCount: "1,284 properties",
    status: "active"
  },
  {
    name: "Weather Data",
    endpoint: "/api/v1/weather",
    method: "GET",
    description: "Current and forecast weather for tourist areas",
    responseCount: "25 regions",
    status: "beta"
  }
];

const dataStats = [
  { label: "Total Destinations", value: "247", icon: MapPin, color: "text-safari" },
  { label: "Monthly Visitors", value: "1.2M", icon: Users, color: "text-ocean" },
  { label: "API Calls Today", value: "45.2K", icon: Activity, color: "text-safari" },
  { label: "Data Points", value: "892K", icon: Database, color: "text-ocean" }
];

export default function DataHub() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tanzania Data Hub</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive tourism data, APIs, and analytics for developers and researchers
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dataStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="apis" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="apis">API Endpoints</TabsTrigger>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="apis" className="space-y-4">
          <div className="grid gap-4">
            {apiEndpoints.map((api, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{api.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {api.method}
                        </Badge>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {api.endpoint}
                        </code>
                        <Badge 
                          variant={api.status === "active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {api.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">{api.description}</CardDescription>
                  <p className="text-sm text-muted-foreground">
                    Response: <span className="font-medium">{api.responseCount}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="datasets" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-safari" />
                  <span>Tourist Destinations</span>
                </CardTitle>
                <CardDescription>Complete database of Tanzanian tourist sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Records:</strong> 247 destinations</p>
                  <p><strong>Last Updated:</strong> Today</p>
                  <p><strong>Format:</strong> JSON, CSV, XML</p>
                  <Button className="w-full mt-3" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Dataset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-ocean" />
                  <span>Visitor Analytics</span>
                </CardTitle>
                <CardDescription>Historical visitor data and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Time Range:</strong> 2020 - Present</p>
                  <p><strong>Granularity:</strong> Daily, Monthly, Yearly</p>
                  <p><strong>Format:</strong> JSON, CSV</p>
                  <Button className="w-full mt-3" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Dataset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="docs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-safari" />
                <span>API Documentation</span>
              </CardTitle>
              <CardDescription>Complete guide to using Tanzania Hub APIs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Getting Started</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Authentication</li>
                    <li>• Rate Limits</li>
                    <li>• Response Formats</li>
                    <li>• Error Handling</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Advanced Usage</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Filtering & Pagination</li>
                    <li>• Real-time Updates</li>
                    <li>• Batch Operations</li>
                    <li>• Webhooks</li>
                  </ul>
                </div>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Documentation
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Postman Collection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}