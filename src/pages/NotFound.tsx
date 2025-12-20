import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Home, Compass, MapPin, Mountain, ArrowLeft, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(contentRef.current, { opacity: 0, y: 60 });
      gsap.set(".number-digit", { opacity: 0, y: 80, rotateX: 90 });
      
      // Orbit animations
      if (orbitsRef.current) {
        const orbits = orbitsRef.current.querySelectorAll('.orbit');
        orbits.forEach((orbit, i) => {
          gsap.to(orbit, {
            rotation: 360,
            duration: 20 + (i * 8),
            repeat: -1,
            ease: "none",
          });
        });
      }

      // Main timeline
      const tl = gsap.timeline({ delay: 0.3 });
      
      // Animate 404 numbers
      tl.to(".number-digit", {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
      })
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4");

      // Floating particles
      gsap.to(".float-particle", {
        y: -20,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.2, from: "random" }
      });

      // Compass rotation
      gsap.to(".compass-icon", {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

    }, containerRef);

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0f1628 0%, #0a0e1a 50%, #050810 100%)',
      }}
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-safari/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-ocean/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="float-particle absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Orbital rings */}
      <div ref={orbitsRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="orbit absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Mountain className="w-4 h-4 md:w-5 md:h-5 text-safari/40" />
          </div>
        </div>
        <div className="orbit absolute w-[400px] h-[400px] md:w-[650px] md:h-[650px] rounded-full border border-white/[0.03]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-ocean/40" />
          </div>
        </div>
        <div className="orbit absolute w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-white/[0.02] border-dashed">
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-sunset/40" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        
        {/* Floating compass */}
        <div className="compass-icon absolute -top-10 md:-top-16 left-1/2 -translate-x-1/2">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-safari/20 to-ocean/20 backdrop-blur-xl flex items-center justify-center border border-white/10">
            <Compass className="w-8 h-8 md:w-10 md:h-10 text-safari" />
          </div>
        </div>

        {/* 404 Numbers */}
        <div ref={numbersRef} className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8 mt-12">
          {["4", "0", "4"].map((num, index) => (
            <div 
              key={index}
              className="number-digit relative"
              style={{ perspective: '500px' }}
            >
              <span 
                className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display font-bold"
                style={{
                  background: 'linear-gradient(135deg, #FCD34D 0%, #F97316 50%, #0891B2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 100px rgba(249,115,22,0.3)',
                }}
              >
                {num}
              </span>
              {index === 1 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-dashed border-white/20 animate-spin" style={{ animationDuration: '10s' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Lost in the Wilderness
          </h2>
          <p className="text-base md:text-lg text-white/50 mb-8 md:mb-10 max-w-lg mx-auto leading-relaxed px-4">
            This trail doesn't exist on our map. Even the best explorers sometimes 
            venture into uncharted territory. Let's guide you back.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button 
                className="w-full sm:w-auto group px-8 py-6 text-base font-semibold rounded-xl bg-gradient-to-r from-safari to-ocean hover:from-safari-light hover:to-ocean-light transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]"
              >
                <Home className="w-5 h-5 mr-2" />
                Return Home
              </Button>
            </Link>
            
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto group px-8 py-6 text-base font-semibold rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Go Back
            </Button>
          </div>

          {/* Path info */}
          <div className="mt-10 md:mt-12 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-xs md:text-sm text-white/30">Attempted path:</span>
            <code className="text-xs md:text-sm text-safari/70 font-mono">{location.pathname}</code>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="mt-12 md:mt-16">
          <p className="text-white/20 text-xs md:text-sm italic">
            "Not all those who wander are lost... but this page definitely is."
          </p>
          <p className="text-white/10 text-xs mt-2">— KILISEE Team</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
