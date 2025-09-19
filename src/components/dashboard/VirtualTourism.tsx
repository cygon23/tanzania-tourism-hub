import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Eye, Clock, Star, MapPin, Camera, Headphones, Maximize } from "lucide-react";

const virtualTours = [
  {
    id: 1,
    title: "Serengeti Safari Experience",
    description: "Witness the Great Migration in stunning 360° detail",
    duration: "12 minutes",
    views: "24.5K",
    rating: 4.9,
    thumbnail: "/api/placeholder/400/250",
    type: "360° Video",
    location: "Serengeti National Park"
  },
  {
    id: 2,
    title: "Mount Kilimanjaro Climbing",
    description: "Virtual ascent to Africa's highest peak",
    duration: "18 minutes", 
    views: "18.2K",
    rating: 4.8,
    thumbnail: "/api/placeholder/400/250",
    type: "Interactive Tour",
    location: "Kilimanjaro"
  },
  {
    id: 3,
    title: "Zanzibar Stone Town Walk",
    description: "Explore the historic streets and culture",
    duration: "8 minutes",
    views: "31.7K", 
    rating: 4.7,
    thumbnail: "/api/placeholder/400/250",
    type: "Walking Tour",
    location: "Stone Town, Zanzibar"
  },
  {
    id: 4,
    title: "Ngorongoro Crater Wildlife",
    description: "Discover the world's largest intact caldera",
    duration: "15 minutes",
    views: "22.1K",
    rating: 4.9,
    thumbnail: "/api/placeholder/400/250", 
    type: "360° Video",
    location: "Ngorongoro Conservation Area"
  }
];

const tourCategories = [
  { name: "Wildlife Safaris", count: 12, icon: Camera },
  { name: "Cultural Heritage", count: 8, icon: MapPin },
  { name: "Mountain Adventures", count: 5, icon: Maximize },
  { name: "Beach & Islands", count: 7, icon: Eye }
];

export default function VirtualTourism() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Virtual Tourism</h1>
        <p className="text-muted-foreground mt-2">
          Experience Tanzania's wonders through immersive virtual tours and 360° content
        </p>
      </div>

      {/* Categories Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tourCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{category.name}</p>
                  <p className="text-2xl font-bold">{category.count} Tours</p>
                </div>
                <category.icon className="h-8 w-8 text-safari" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="featured" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="featured">Featured Tours</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="live">Live Streams</TabsTrigger>
          <TabsTrigger value="vr">VR Experiences</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {virtualTours.map((tour) => (
              <Card key={tour.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-safari/20 to-ocean/20 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Play className="h-12 w-12 mx-auto text-white bg-black/50 rounded-full p-3" />
                      <p className="text-sm text-white font-medium">{tour.type}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      {tour.type}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      {tour.duration}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button size="lg" className="bg-white/90 text-black hover:bg-white">
                      <Play className="h-5 w-5 mr-2" />
                      Start Tour
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg leading-tight">{tour.title}</CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{tour.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="mb-4">{tour.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{tour.views} views</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Headphones className="h-4 w-4 mr-1" />
                        Audio Guide
                      </Button>
                      <Button variant="outline" size="sm">
                        <Maximize className="h-4 w-4 mr-1" />
                        Fullscreen
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tourCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-safari/10 rounded-lg">
                      <category.icon className="h-6 w-6 text-safari" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} virtual tours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                <span>Live Safari Streams</span>
              </CardTitle>
              <CardDescription>Watch live feeds from Tanzania's national parks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="aspect-video bg-gradient-to-br from-safari/20 to-ocean/20 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </div>
                    <p className="font-medium">Serengeti Watering Hole</p>
                    <p className="text-sm text-muted-foreground">124 viewers</p>
                  </div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-ocean/20 to-safari/20 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </div>
                    <p className="font-medium">Ngorongoro Crater</p>
                    <p className="text-sm text-muted-foreground">89 viewers</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vr" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>VR-Ready Experiences</CardTitle>
              <CardDescription>Optimized for virtual reality headsets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="mb-4">
                  <Maximize className="h-16 w-16 mx-auto text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">VR Experiences Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  We're developing immersive VR experiences for popular VR headsets
                </p>
                <Button>
                  Get Notified When Available
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}