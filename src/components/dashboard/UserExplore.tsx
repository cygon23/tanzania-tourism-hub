import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Search,
  Heart,
  Star,
  Filter,
  Grid,
  List
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const destinations = [
  { id: 1, name: "Serengeti National Park", category: "Safari", rating: 4.9, reviews: 2345, price: "$250", saved: true },
  { id: 2, name: "Zanzibar Stone Town", category: "Culture", rating: 4.7, reviews: 1890, price: "$80", saved: false },
  { id: 3, name: "Mount Kilimanjaro", category: "Adventure", rating: 4.8, reviews: 3210, price: "$1200", saved: true },
  { id: 4, name: "Ngorongoro Crater", category: "Wildlife", rating: 4.9, reviews: 2100, price: "$300", saved: false },
  { id: 5, name: "Tarangire National Park", category: "Safari", rating: 4.6, reviews: 980, price: "$180", saved: false },
  { id: 6, name: "Mafia Island", category: "Beach", rating: 4.5, reviews: 456, price: "$150", saved: false },
  { id: 7, name: "Lake Manyara", category: "Wildlife", rating: 4.4, reviews: 876, price: "$120", saved: true },
  { id: 8, name: "Pemba Island", category: "Beach", rating: 4.6, reviews: 345, price: "$200", saved: false },
];

const categories = ["All", "Safari", "Beach", "Adventure", "Culture", "Wildlife"];

export default function UserExplore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [savedItems, setSavedItems] = useState<number[]>(
    destinations.filter(d => d.saved).map(d => d.id)
  );

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSaved = (id: number) => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Explore{" "}
          <span className="bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
            Tanzania
          </span>
        </h2>
        <p className="text-muted-foreground">
          Discover breathtaking destinations and plan your perfect adventure
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`cursor-pointer transition-all ${
              selectedCategory === category 
                ? "bg-safari text-white" 
                : "hover:bg-safari/10 hover:text-safari"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Results */}
      <div className={
        viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" 
          : "space-y-4"
      }>
        {filteredDestinations.map((destination) => (
          <Card
            key={destination.id}
            className={`overflow-hidden border-2 border-border/50 hover:border-border hover:shadow-xl transition-all duration-300 group cursor-pointer ${
              viewMode === "list" ? "flex flex-row" : ""
            }`}
          >
            <div className={`relative bg-gradient-to-br from-safari/20 to-ocean/20 ${
              viewMode === "list" ? "w-32 md:w-48 h-auto" : "h-40"
            }`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-safari/30" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaved(destination.id);
                }}
              >
                <Heart className={`w-4 h-4 ${
                  savedItems.includes(destination.id) 
                    ? "fill-sunset text-sunset" 
                    : "text-muted-foreground"
                }`} />
              </Button>
              <Badge className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm text-foreground">
                {destination.category}
              </Badge>
            </div>
            <div className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}>
              <h4 className="font-semibold text-foreground mb-1 group-hover:text-safari transition-colors">
                {destination.name}
              </h4>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-muted-foreground text-sm">
                  <Star className="w-4 h-4 text-sunset mr-1 fill-sunset" />
                  <span>{destination.rating}</span>
                  <span className="ml-1">({destination.reviews})</span>
                </div>
                <span className="font-semibold text-safari">{destination.price}</span>
              </div>
              {viewMode === "list" && (
                <Button size="sm" className="mt-2 bg-gradient-to-r from-safari to-ocean text-white">
                  View Details
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No destinations found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
