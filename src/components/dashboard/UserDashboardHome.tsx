import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Calendar,
  Camera,
  MessageCircle,
  Heart,
  Star,
  Compass,
  Plane
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const userStats = [
  { label: "Saved Destinations", value: "12", icon: Heart, color: "sunset" },
  { label: "Upcoming Trips", value: "2", icon: Calendar, color: "safari" },
  { label: "Tours Completed", value: "8", icon: Compass, color: "ocean" },
  { label: "Reviews Given", value: "15", icon: Star, color: "sunset" },
];

const featuredDestinations = [
  { name: "Serengeti National Park", image: "/placeholder.svg", rating: 4.9, category: "Safari" },
  { name: "Zanzibar Beaches", image: "/placeholder.svg", rating: 4.8, category: "Beach" },
  { name: "Mount Kilimanjaro", image: "/placeholder.svg", rating: 4.7, category: "Adventure" },
  { name: "Ngorongoro Crater", image: "/placeholder.svg", rating: 4.9, category: "Wildlife" },
];

const quickActions = [
  { title: "Explore Destinations", description: "Discover amazing places", icon: MapPin, color: "safari", path: "/dashboard/explore" },
  { title: "AI Travel Guide", description: "Get personalized tips", icon: MessageCircle, color: "ocean", path: "/dashboard/ai-guide" },
  { title: "Virtual Tours", description: "Experience remotely", icon: Camera, color: "sunset", path: "/dashboard/virtual" },
  { title: "Book a Trip", description: "Plan your adventure", icon: Plane, color: "safari", path: "/dashboard/booking" },
];

export default function UserDashboardHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToStatsRefs = (el: HTMLDivElement) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Karibu,{" "}
          <span className="bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
            {user?.name || "Traveler"}!
          </span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg">
          Ready for your next Tanzanian adventure? Let's explore together.
        </p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {userStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              ref={addToStatsRefs}
              className="p-4 md:p-6 border-2 border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
                <div className={`p-2 md:p-3 rounded-xl bg-${stat.color}/10 group-hover:bg-${stat.color}/20 transition-colors duration-300 mb-2 md:mb-0 md:mr-4`}>
                  <IconComponent className={`w-5 h-5 md:w-6 md:h-6 text-${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">What would you like to do?</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card
                key={index}
                onClick={() => navigate(action.path)}
                className="p-4 md:p-6 border-2 border-border/50 hover:border-border hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className={`inline-flex p-3 md:p-4 rounded-2xl bg-${action.color}/10 group-hover:bg-${action.color}/20 transition-colors duration-300 mb-3 md:mb-4`}>
                  <IconComponent className={`w-6 h-6 md:w-8 md:h-8 text-${action.color}`} />
                </div>
                <h4 className="text-sm md:text-lg font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors duration-300">
                  {action.title}
                </h4>
                <p className="text-muted-foreground text-xs md:text-sm hidden md:block">
                  {action.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Featured Destinations */}
      <div>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">Featured Destinations</h3>
          <Button variant="outline" size="sm" className="text-safari border-safari/30 hover:bg-safari/10">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredDestinations.map((destination, index) => (
            <Card
              key={index}
              className="overflow-hidden border-2 border-border/50 hover:border-border hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-32 md:h-40 bg-gradient-to-br from-safari/20 to-ocean/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-safari/30" />
                </div>
                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                  {destination.category}
                </div>
              </div>
              <div className="p-3 md:p-4">
                <h4 className="font-semibold text-foreground text-sm md:text-base mb-1 group-hover:text-safari transition-colors">
                  {destination.name}
                </h4>
                <div className="flex items-center text-muted-foreground text-xs md:text-sm">
                  <Star className="w-4 h-4 text-sunset mr-1 fill-sunset" />
                  <span>{destination.rating}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Trip Reminder */}
      <Card className="p-4 md:p-6 border-2 border-safari/30 bg-gradient-to-r from-safari/5 to-ocean/5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-safari/20">
              <Plane className="w-6 h-6 text-safari" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Your Next Adventure</h4>
              <p className="text-muted-foreground text-sm">Serengeti Safari - Dec 25, 2024</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-safari to-ocean text-white hover:opacity-90">
            View Details
          </Button>
        </div>
      </Card>
    </div>
  );
}
