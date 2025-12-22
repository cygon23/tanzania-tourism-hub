import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Database,
  MessageCircle,
  Calendar,
  Camera,
  BarChart3,
  Settings,
  LogOut,
  MapPin,
  Compass,
  Heart,
  Users,
  Shield,
  Plane,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/contexts/UserContext";
import { Badge } from "@/components/ui/badge";

// Admin menu items
const adminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Data Hub", url: "/dashboard/data-hub", icon: Database },
  { title: "AI Tour Guide", url: "/dashboard/ai-guide", icon: MessageCircle },
  { title: "Booking & Ads", url: "/dashboard/booking", icon: Calendar },
  { title: "Virtual Tourism", url: "/dashboard/virtual", icon: Camera },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "User Management", url: "/dashboard/users", icon: Users },
];

// User menu items
const userMenuItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Explore", url: "/dashboard/explore", icon: Compass },
  { title: "My Trips", url: "/dashboard/trips", icon: Plane },
  { title: "AI Guide", url: "/dashboard/ai-guide", icon: MessageCircle },
  { title: "Virtual Tours", url: "/dashboard/virtual", icon: Camera },
  { title: "My Analytics", url: "/dashboard/my-analytics", icon: BarChart3 },
  { title: "Saved", url: "/dashboard/saved", icon: Heart },
];

const settingsItems = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";
  const { user } = useUser();
  
  const isAdmin = user?.role === "admin";
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const isActive = (path: string) => currentPath === path;

  const getNavClass = (path: string) =>
    isActive(path)
      ? "bg-gradient-to-r from-safari/20 to-ocean/20 text-safari border-r-2 border-safari font-medium"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50";

  return (
    <Sidebar
      className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-border/50 bg-gradient-to-b from-background to-muted/30`}
      collapsible="icon"
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        {!isCollapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-safari to-ocean rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TZ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-foreground">Tanzania Hub</h2>
                {isAdmin && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-sunset text-sunset">
                    <Shield className="w-2.5 h-2.5 mr-0.5" />
                    Admin
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {isAdmin ? "Admin Dashboard" : "Traveler Portal"}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-safari to-ocean rounded-lg flex items-center justify-center mx-auto relative">
            <span className="text-white font-bold text-sm">TZ</span>
            {isAdmin && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-sunset rounded-full flex items-center justify-center">
                <Shield className="w-2 h-2 text-white" />
              </div>
            )}
          </div>
        )}
      </div>

      <SidebarContent className="flex-1 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            {isAdmin ? "Admin Menu" : "Explore"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={`${getNavClass(item.url)} flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive(item.url) ? 'text-safari' : 'group-hover:text-safari'} transition-colors`} />
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto">
          <Separator className="my-4" />
          
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`${getNavClass(item.url)} flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group`}
                      >
                        <item.icon className={`w-5 h-5 ${isActive(item.url) ? 'text-safari' : 'group-hover:text-safari'} transition-colors`} />
                        {!isCollapsed && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      className="justify-start w-full text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group"
                    >
                      <LogOut className="w-5 h-5 group-hover:text-destructive transition-colors" />
                      {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}