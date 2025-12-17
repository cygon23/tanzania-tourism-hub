import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0e1a 0%, #080b14 100%)',
      }}
    >
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-safari/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[150px] bg-ocean/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-10 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-safari to-ocean flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">KILISEE</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Tanzania's premier tourism intelligence platform, combining AI technology 
              with authentic local insights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-medium">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Data Hub", "AI Guide", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-white font-medium">Resources</h3>
            <ul className="space-y-2">
              {["Blog", "API Docs", "Developer Portal", "Help Center"].map((resource) => (
                <li key={resource}>
                  <a
                    href="#"
                    className="group text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-medium">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <Mail className="w-4 h-4 text-safari" />
                <span>info@kilisee.ai</span>
              </div>
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <Phone className="w-4 h-4 text-ocean" />
                <span>+255 123 456 789</span>
              </div>
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <MapPin className="w-4 h-4 text-sunset" />
                <span>Dar es Salaam, Tanzania</span>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="relative overflow-hidden rounded-2xl p-8 mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-safari/10 via-ocean/5 to-sunset/10 rounded-2xl" />
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm rounded-2xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-1">
                Stay Connected
              </h3>
              <p className="text-white/40 text-sm">
                Get the latest tourism insights delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-safari/50 transition-all text-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-safari to-ocean text-white rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Sub-footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-white/30">
            © 2024 KILISEE. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-white/30">
            <span>Made with</span>
            <span className="text-red-400">❤️</span>
            <span>in Tanzania</span>
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/30 hover:text-white transition-colors duration-300"
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
