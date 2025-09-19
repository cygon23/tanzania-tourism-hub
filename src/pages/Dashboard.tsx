import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import DashboardHome from "@/components/dashboard/DashboardHome";
import DataHub from "@/components/dashboard/DataHub";
import AIGuide from "@/components/dashboard/AIGuide";
import Booking from "@/components/dashboard/Booking";
import VirtualTourism from "@/components/dashboard/VirtualTourism";
import Analytics from "@/components/dashboard/Analytics";
import DashboardSettings from "@/components/dashboard/DashboardSettings";
import { Routes, Route } from "react-router-dom";
import { LogOut, User, Shield } from "lucide-react";

export default function Dashboard() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Redirect if not authenticated
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
    return null; // Will redirect via useEffect
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header
            ref={headerRef}
            className="h-16 border-b border-border/50 bg-gradient-to-r from-background to-muted/30 flex items-center px-6"
          >
            <SidebarTrigger className="mr-4 hover:bg-muted transition-colors duration-200" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                <span>Tanzania Tourism Dashboard</span>
                {user.role === "admin" && (
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-sunset ml-2" />
                  </div>
                )}
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user.name}! {user.role === "admin" ? "Manage your tourism data and insights" : "Explore Tanzania's wonders"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-safari to-ocean rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
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
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route index element={<DashboardHome />} />
              <Route path="data-hub" element={<DataHub />} />
              <Route path="ai-guide" element={<AIGuide />} />
              <Route path="booking" element={<Booking />} />
              <Route path="virtual" element={<VirtualTourism />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}