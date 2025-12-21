import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Heart,
  Star,
  Trash2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const savedDestinations = [
  { id: 1, name: "Serengeti National Park", category: "Safari", rating: 4.9, price: "$250", savedDate: "Dec 15, 2024" },
  { id: 2, name: "Mount Kilimanjaro", category: "Adventure", rating: 4.8, price: "$1200", savedDate: "Dec 10, 2024" },
  { id: 3, name: "Lake Manyara", category: "Wildlife", rating: 4.4, price: "$120", savedDate: "Dec 5, 2024" },
  { id: 4, name: "Zanzibar Beaches", category: "Beach", rating: 4.8, price: "$150", savedDate: "Nov 28, 2024" },
];

export default function UserSaved() {
  const [saved, setSaved] = useState(savedDestinations);

  const removeSaved = (id: number) => {
    setSaved(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Saved{" "}
          <span className="bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
            Destinations
          </span>
        </h2>
        <p className="text-muted-foreground">
          Your curated list of places to visit in Tanzania
        </p>
      </div>

      {/* Saved Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {saved.map((destination) => (
          <Card
            key={destination.id}
            className="overflow-hidden border-2 border-border/50 hover:border-border hover:shadow-xl transition-all duration-300 group cursor-pointer"
          >
            <div className="relative h-40 bg-gradient-to-br from-safari/20 to-ocean/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-safari/30" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-destructive/10 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSaved(destination.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="absolute top-2 left-2">
                <Heart className="w-5 h-5 text-sunset fill-sunset" />
              </div>
              <Badge className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm text-foreground">
                {destination.category}
              </Badge>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-foreground mb-2 group-hover:text-safari transition-colors">
                {destination.name}
              </h4>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-muted-foreground text-sm">
                  <Star className="w-4 h-4 text-sunset mr-1 fill-sunset" />
                  <span>{destination.rating}</span>
                </div>
                <span className="font-semibold text-safari">{destination.price}</span>
              </div>
              <p className="text-xs text-muted-foreground">Saved on {destination.savedDate}</p>
              <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-safari to-ocean text-white">
                Book Now
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {saved.length === 0 && (
        <Card className="p-8 text-center border-2 border-dashed border-border">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No saved destinations</h3>
          <p className="text-muted-foreground mb-4">Start exploring and save your favorite places!</p>
          <Button className="bg-gradient-to-r from-safari to-ocean text-white">
            Explore Destinations
          </Button>
        </Card>
      )}
    </div>
  );
}
