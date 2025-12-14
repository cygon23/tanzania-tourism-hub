import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MapPin, Compass, Camera, Plane, Globe, BarChart3, Sparkles } from "lucide-react";

export default function TourismLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo entrance
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
      );

      // Text fade in
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power2.out" }
      );

      // Logo pulse
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
      });

      // Orbiting icons
      if (orbitsRef.current) {
        const icons = orbitsRef.current.querySelectorAll('.orbit-icon');
        icons.forEach((icon, index) => {
          const angle = (index * 60) * (Math.PI / 180);
          const radius = 80;
          
          gsap.set(icon, {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
          });

          gsap.to(icon, {
            rotation: 360,
            duration: 8 + index,
            ease: "none",
            repeat: -1,
            transformOrigin: "center center"
          });
        });

        gsap.to(orbitsRef.current, {
          rotation: 360,
          duration: 20,
          ease: "none",
          repeat: -1
        });
      }

      // Progress bar animation
      gsap.to(progressRef.current, {
        width: "100%",
        duration: 2.5,
        ease: "power1.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-muted to-background overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-safari/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ocean/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sunset/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div ref={containerRef} className="relative z-10 flex flex-col items-center">
        {/* Orbiting icons */}
        <div ref={orbitsRef} className="absolute w-48 h-48 flex items-center justify-center">
          {[MapPin, Compass, Camera, Plane, Globe, BarChart3].map((Icon, index) => (
            <div
              key={index}
              className="orbit-icon absolute w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center shadow-lg"
            >
              <Icon className="w-5 h-5 text-safari" />
            </div>
          ))}
        </div>

        {/* Central logo */}
        <div
          ref={logoRef}
          className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-safari to-ocean flex items-center justify-center shadow-2xl shadow-safari/30"
        >
          <MapPin className="w-12 h-12 text-white" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-white/20"></div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-sunset animate-pulse" />
        </div>

        {/* Text content */}
        <div ref={textRef} className="mt-12 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-safari via-ocean to-sunset bg-clip-text text-transparent mb-3">
            Tanzania Tourism Hub
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Preparing your data intelligence platform...
          </p>

          {/* Progress bar */}
          <div className="w-64 mx-auto">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="h-full w-0 bg-gradient-to-r from-safari via-ocean to-sunset rounded-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Loading</span>
              <span>Please wait</span>
            </div>
          </div>
        </div>

        {/* Floating stats */}
        <div className="mt-12 flex gap-8">
          {[
            { label: "Data Points", value: "50K+" },
            { label: "Partners", value: "150+" },
            { label: "Insights", value: "24/7" }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${0.8 + index * 0.2}s` }}
            >
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
