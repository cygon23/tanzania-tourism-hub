import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const footerSections = [
    {
      title: "About Us",
      content: (
        <p className="text-muted-foreground leading-relaxed">
          Tanzania's premier tourism data hub, combining cutting-edge AI technology 
          with authentic local insights to create unforgettable travel experiences 
          while supporting sustainable tourism development.
        </p>
      )
    },
    {
      title: "Quick Links",
      content: (
        <ul className="space-y-3">
          {["Home", "About", "Data Hub", "AI Guide", "Contact"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-muted-foreground hover:text-safari transition-colors duration-300 hover:underline"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )
    },
    {
      title: "Resources",
      content: (
        <ul className="space-y-3">
          {["Blog", "API Documentation", "Developer Portal", "Tourism Guidelines", "Help Center"].map((resource) => (
            <li key={resource}>
              <a
                href="#"
                className="text-muted-foreground hover:text-ocean transition-colors duration-300 hover:underline"
              >
                {resource}
              </a>
            </li>
          ))}
        </ul>
      )
    },
    {
      title: "Contact",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <Mail className="w-5 h-5 text-sunset" />
            <span>info@tanzaniatourism.ai</span>
          </div>
          <div className="flex items-center space-x-3 text-muted-foreground">
            <Phone className="w-5 h-5 text-safari" />
            <span>+255 123 456 789</span>
          </div>
          <div className="flex items-center space-x-3 text-muted-foreground">
            <MapPin className="w-5 h-5 text-ocean" />
            <span>Dar es Salaam, Tanzania</span>
          </div>
          
          <div className="flex space-x-4 pt-4">
            {[
              { Icon: Facebook, color: "text-blue-600" },
              { Icon: Twitter, color: "text-blue-400" },
              { Icon: Instagram, color: "text-pink-600" },
              { Icon: Linkedin, color: "text-blue-700" }
            ].map(({ Icon, color }, index) => (
              <a
                key={index}
                href="#"
                className={`${color} hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-b from-background to-muted/50 border-t border-border/50"
    >
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">
                {section.title}
              </h3>
              {section.content}
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-safari/10 via-ocean/10 to-sunset/10 rounded-2xl p-8 mb-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Stay Connected with Tanzania
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get the latest updates on tourism trends, new destinations, and exclusive offers 
            delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-safari/50"
            />
            <button className="px-6 py-3 bg-safari hover:bg-safari-light text-primary-foreground rounded-lg font-medium transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Sub-footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground">
            © 2024 Tanzania Tourism Hub. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span>Made with</span>
            <span className="text-red-500 animate-bounce-gentle">❤️</span>
            <span>in Tanzania</span>
          </div>
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm hover:underline"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}