import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Plane
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const upcomingTrips = [
  {
    id: 1,
    destination: "Serengeti Safari",
    date: "Dec 25 - 30, 2024",
    status: "confirmed",
    travelers: 2,
    daysLeft: 5,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    destination: "Zanzibar Beach Retreat",
    date: "Jan 15 - 20, 2025",
    status: "pending",
    travelers: 4,
    daysLeft: 26,
    image: "/placeholder.svg"
  }
];

const pastTrips = [
  {
    id: 3,
    destination: "Mount Kilimanjaro Climb",
    date: "Oct 1 - 7, 2024",
    status: "completed",
    travelers: 3,
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    destination: "Ngorongoro Crater Tour",
    date: "Aug 15 - 18, 2024",
    status: "completed",
    travelers: 2,
    rating: 4,
    image: "/placeholder.svg"
  },
  {
    id: 5,
    destination: "Lake Manyara Day Trip",
    date: "Jul 5, 2024",
    status: "completed",
    travelers: 1,
    rating: 5,
    image: "/placeholder.svg"
  }
];

export default function UserTrips() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          My{" "}
          <span className="bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
            Trips
          </span>
        </h2>
        <p className="text-muted-foreground">
          Manage your upcoming adventures and revisit past memories
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming ({upcomingTrips.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastTrips.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6 space-y-4">
          {upcomingTrips.map((trip) => (
            <Card
              key={trip.id}
              className="overflow-hidden border-2 border-border/50 hover:border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 h-32 md:h-auto bg-gradient-to-br from-safari/20 to-ocean/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-safari/30" />
                  </div>
                  {trip.daysLeft <= 7 && (
                    <Badge className="absolute top-2 left-2 bg-sunset text-white">
                      {trip.daysLeft} days left!
                    </Badge>
                  )}
                </div>
                <div className="flex-1 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {trip.destination}
                        </h3>
                        <Badge 
                          variant={trip.status === "confirmed" ? "default" : "secondary"}
                          className={trip.status === "confirmed" ? "bg-green-500" : ""}
                        >
                          {trip.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {trip.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {trip.travelers} travelers
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {trip.daysLeft} days until departure
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Itinerary
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-safari to-ocean text-white">
                        Manage Trip
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {upcomingTrips.length === 0 && (
            <Card className="p-8 text-center border-2 border-dashed border-border">
              <Plane className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No upcoming trips</h3>
              <p className="text-muted-foreground mb-4">Start planning your next Tanzanian adventure!</p>
              <Button className="bg-gradient-to-r from-safari to-ocean text-white">
                Explore Destinations
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6 space-y-4">
          {pastTrips.map((trip) => (
            <Card
              key={trip.id}
              className="overflow-hidden border-2 border-border/50 hover:border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 h-32 md:h-auto bg-gradient-to-br from-muted/50 to-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                </div>
                <div className="flex-1 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {trip.destination}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {trip.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {trip.travelers} travelers
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Photos
                      </Button>
                      <Button variant="outline" size="sm">
                        Leave Review
                      </Button>
                      <Button size="sm" variant="ghost" className="text-safari hover:text-safari hover:bg-safari/10">
                        Book Again
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
