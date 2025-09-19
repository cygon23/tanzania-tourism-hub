import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MapPin, Compass, Users, Bot, BarChart3, User } from "lucide-react";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Data Hub", href: "#" },
  { name: "AI Guide", href: "#" },
  { name: "Virtual Tours", href: "#" },
  // { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-safari to-ocean rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
              Tanzania Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex space-x-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <NavigationMenuItem key={item.name}>
                    <Link
                      to={item.href}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-safari/10 text-safari font-medium"
                          : "text-foreground/80 hover:text-safari hover:bg-safari/5"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/auth">
              <Button variant="outline" className="border-safari/30 text-safari hover:bg-safari/10">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-safari to-ocean hover:from-safari-light hover:to-ocean-light">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-2 pb-4 border-b border-border/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-safari to-ocean rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
                    Tanzania Hub
                  </span>
                </div>

                {/* Mobile Navigation */}
                <div className="flex flex-col space-y-2">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-safari/10 text-safari font-medium"
                            : "text-foreground/80 hover:text-safari hover:bg-safari/5"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-border/50">
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-safari/30 text-safari hover:bg-safari/10">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-safari to-ocean hover:from-safari-light hover:to-ocean-light">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}