import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MapPin } from "lucide-react";

const navigationItems = [
  { name: "Home", href: "#hero" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Partners", href: "#partners" },
  { name: "About", href: "#about" },
];

const scrollToSection = (href: string) => {
  if (href.startsWith('#')) {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const navRef = useRef<HTMLElement>(null);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll spy logic
      const sections = navigationItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const offsetTop = section.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(`#${sections[i]}`);
            break;
          }
        }
      }
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
                const isActive = activeSection === item.href;
                return (
                  <NavigationMenuItem key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "text-safari font-medium"
                          : "text-foreground/80 hover:text-safari hover:bg-safari/5"
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-safari rounded-full" />
                      )}
                    </button>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/auth">
              <Button variant="outline" className="rounded-full border-safari/30 text-safari hover:bg-safari/10 px-6">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="rounded-full bg-gradient-to-r from-safari to-ocean hover:from-safari-light hover:to-ocean-light px-6">
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
                    const isActive = activeSection === item.href;
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          scrollToSection(item.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`px-4 py-3 rounded-full text-left transition-all duration-200 ${
                          isActive
                            ? "text-safari font-medium bg-safari/10"
                            : "text-foreground/80 hover:text-safari hover:bg-safari/5"
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-border/50">
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full border-safari/30 text-safari hover:bg-safari/10">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full rounded-full bg-gradient-to-r from-safari to-ocean hover:from-safari-light hover:to-ocean-light">
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
