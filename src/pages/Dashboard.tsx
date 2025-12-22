import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import DashboardHome from "@/components/dashboard/DashboardHome";
import UserDashboardHome from "@/components/dashboard/UserDashboardHome";
import UserExplore from "@/components/dashboard/UserExplore";
import UserTrips from "@/components/dashboard/UserTrips";
import UserSaved from "@/components/dashboard/UserSaved";
import UserAnalytics from "@/components/dashboard/UserAnalytics";
import DataHub from "@/components/dashboard/DataHub";
import AIGuide from "@/components/dashboard/AIGuide";
import Booking from "@/components/dashboard/Booking";
import VirtualTourism from "@/components/dashboard/VirtualTourism";
import Analytics from "@/components/dashboard/Analytics";
import DashboardSettings from "@/components/dashboard/DashboardSettings";
import AdminUserManagement from "@/components/dashboard/AdminUserManagement";
import { Routes, Route } from "react-router-dom";
import { LogOut, User, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Dashboard() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header
            ref={headerRef}
            className="h-16 border-b border-border/50 bg-gradient-to-r from-background to-muted/30 flex items-center px-4 md:px-6"
          >
            <SidebarTrigger className="mr-4 hover:bg-muted transition-colors duration-200" />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-xl font-semibold text-foreground flex items-center space-x-2 truncate">
                <span>{isAdmin ? "Admin Dashboard" : "Traveler Portal"}</span>
                {isAdmin && (
                  <Badge variant="outline" className="hidden sm:inline-flex text-[10px] px-1.5 py-0 border-sunset text-sunset">
                    <Shield className="w-2.5 h-2.5 mr-0.5" />
                    Admin
                  </Badge>
                )}
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground truncate">
                {isAdmin 
                  ? `Manage your tourism platform, ${user.name}` 
                  : `Explore Tanzania's wonders, ${user.name}`}
              </p>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isAdmin 
                    ? 'bg-gradient-to-br from-sunset to-safari' 
                    : 'bg-gradient-to-br from-safari to-ocean'
                }`}>
                  {isAdmin ? (
                    <Shield className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <Routes>
              <Route index element={isAdmin ? <DashboardHome /> : <UserDashboardHome />} />
              <Route path="ai-guide" element={<AIGuide />} />
              <Route path="virtual" element={<VirtualTourism />} />
              <Route path="settings" element={<DashboardSettings />} />
              <Route path="data-hub" element={<DataHub />} />
              <Route path="booking" element={<Booking />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="users" element={<AdminUserManagement />} />
              <Route path="explore" element={<UserExplore />} />
              <Route path="trips" element={<UserTrips />} />
              <Route path="saved" element={<UserSaved />} />
              <Route path="my-analytics" element={<UserAnalytics />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
