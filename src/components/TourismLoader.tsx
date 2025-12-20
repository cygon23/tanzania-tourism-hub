import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Globe, Sparkles, Mountain, Compass, MapPin } from "lucide-react";

export default function TourismLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main logo animation
      gsap.fromTo(
        logoRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)", delay: 0.2 }
      );

      // Text stagger animation
      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 40, filter: "blur(10px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.8, 
          stagger: 0.15,
          delay: 0.8, 
          ease: "power3.out" 
        }
      );

      // Orbit rings animation
      if (orbitsRef.current) {
        const orbits = orbitsRef.current.querySelectorAll('.orbit-ring');
        orbits.forEach((orbit, i) => {
          gsap.to(orbit, {
            rotation: 360,
            duration: 15 + (i * 5),
            repeat: -1,
            ease: "none",
          });
        });
      }

      // Floating icons animation
      if (iconsRef.current) {
        const icons = iconsRef.current.querySelectorAll('.floating-icon');
        icons.forEach((icon, i) => {
          gsap.fromTo(icon,
            { scale: 0, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.6, 
              delay: 1 + (i * 0.15),
              ease: "back.out(2)"
            }
          );
          
          gsap.to(icon, {
            y: -15 + Math.random() * 10,
            x: Math.sin(i) * 10,
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1 + (i * 0.15)
          });
        });
      }

      // Logo glow pulse
      gsap.to(logoRef.current, {
        boxShadow: "0 0 80px rgba(249,115,22,0.5), 0 0 120px rgba(8,145,178,0.3)",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Progress bar
      gsap.to(progressRef.current, {
        width: "100%",
        duration: 2.5,
        ease: "power2.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0f1628 0%, #0a0e1a 50%, #050810 100%)',
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-safari/8 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-ocean/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-sunset/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.3,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        
        {/* Orbit rings around logo */}
        <div ref={orbitsRef} className="relative">
          {/* Outer orbit */}
          <div className="orbit-ring absolute -inset-12 md:-inset-16 rounded-full border border-safari/20" style={{ transformOrigin: 'center' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 bg-safari rounded-full shadow-lg shadow-safari/50" />
          </div>
          
          {/* Middle orbit */}
          <div className="orbit-ring absolute -inset-20 md:-inset-28 rounded-full border border-ocean/15" style={{ transformOrigin: 'center' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 bg-ocean rounded-full shadow-lg shadow-ocean/50" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-sunset rounded-full shadow-lg shadow-sunset/50" />
          </div>
          
          {/* Inner orbit */}
          <div className="orbit-ring absolute -inset-8 md:-inset-10 rounded-full border border-sunset/25 border-dashed" style={{ transformOrigin: 'center' }}>
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-sunset rounded-full" />
          </div>

          {/* Main logo */}
          <div
            ref={logoRef}
            className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br from-safari via-sunset to-ocean flex items-center justify-center shadow-2xl"
          >
            <Globe className="w-14 h-14 md:w-18 md:h-18 text-white animate-spin" style={{ animationDuration: '10s' }} />
            
            {/* Glass overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-white/10 to-white/30" />
            
            {/* Sparkles */}
            <Sparkles className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-6 h-6 md:w-8 md:h-8 text-sunset animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-1 md:-bottom-2 md:-left-2 w-5 h-5 md:w-6 md:h-6 text-ocean animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Floating feature icons */}
        <div ref={iconsRef} className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="floating-icon absolute top-[15%] left-[20%] w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <Mountain className="w-5 h-5 text-safari" />
          </div>
          <div className="floating-icon absolute top-[20%] right-[22%] w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <Compass className="w-5 h-5 text-ocean" />
          </div>
          <div className="floating-icon absolute bottom-[25%] left-[18%] w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-sunset" />
          </div>
          <div className="floating-icon absolute bottom-[20%] right-[20%] w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-safari" />
          </div>
        </div>

        {/* Text content */}
        <div ref={textRef} className="mt-24 md:mt-32 text-center space-y-3 md:space-y-4">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #FCD34D 0%, #F97316 50%, #0891B2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            KILISEE
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/60 font-light tracking-wide">
            Experience Tanzania
          </p>
          <p className="text-sm md:text-base text-white/30 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-safari rounded-full animate-pulse" />
            Initializing virtual journey
            <span className="w-1.5 h-1.5 bg-ocean rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-12 md:mt-16 w-64 md:w-80 max-w-full">
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
            <div
              ref={progressRef}
              className="h-full w-0 rounded-full relative"
              style={{
                background: 'linear-gradient(90deg, #F97316 0%, #0891B2 100%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-white/50" />
            </div>
          </div>
        </div>

        {/* Loading tips */}
        <div className="mt-8 text-center">
          <p className="text-xs md:text-sm text-white/20">
            Powered by AI • 50+ Virtual Tours • 4K Quality
          </p>
        </div>
      </div>
    </div>
  );
}
