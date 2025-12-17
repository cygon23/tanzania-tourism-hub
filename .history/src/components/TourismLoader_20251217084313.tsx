import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Globe, Sparkles } from "lucide-react";

export default function TourismLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)", delay: 0.2 }
      );

      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 30, filter: "blur(10px)" },
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

      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.particle');
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: -100,
            opacity: 0,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            delay: i * 0.3,
            ease: "power1.out"
          });
        });
      }

      gsap.to(logoRef.current, {
        boxShadow: "0 0 60px rgba(249,115,22,0.6), 0 0 100px rgba(8,145,178,0.4)",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

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
        background: 'linear-gradient(135deg, #0a0e1a 0%, #0d1220 50%, #0a0e1a 100%)',
      }}
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-safari/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-ocean/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-safari/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${80 + Math.random() * 20}%`,
            }}
          />
        ))}
      </div>

      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        <div
          ref={logoRef}
          className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-safari via-sunset to-ocean flex items-center justify-center shadow-2xl"
        >
          <Globe className="w-16 h-16 text-white animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent to-white/20" />
          <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-sunset animate-pulse" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-ocean animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div ref={textRef} className="mt-16 text-center space-y-4">
          <h1 
            className="text-5xl md:text-6xl font-display font-bold leading-tight tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #FCD34D 0%, #F97316 50%, #0891B2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            KILISEE
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-light tracking-wide">
            Experience Tanzania
          </p>
          <p className="text-base text-white/40">
            Initializing virtual journey...
          </p>
        </div>

        <div className="mt-16 w-80 max-w-full">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full w-0 rounded-full relative"
              style={{
                background: 'linear-gradient(90deg, #F97316 0%, #0891B2 100%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}