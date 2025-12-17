import { useEffect, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Compass, PlayCircle, Sparkles } from "lucide-react";

// Lazy load the 3D globe for performance
const Globe3D = lazy(() => import("@/components/hero/Globe3D"));

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([logoRef.current, headlineRef.current, subtitleRef.current, ctaRef.current, badgesRef.current, scrollRef.current], {
        opacity: 0,
      });
      gsap.set(logoRef.current, { x: -30 });
      gsap.set(headlineRef.current, { x: -30, y: 20 });
      gsap.set(subtitleRef.current, { y: 20 });
      gsap.set(ctaRef.current, { scale: 0.8 });
      gsap.set(globeContainerRef.current, { x: 30, opacity: 0 });

      // Orchestrated animation sequence (3s total)
      const tl = gsap.timeline({ delay: 0.3 });

      // (0s) Logo fade in from left
      tl.to(logoRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      // (0.5s) Globe materializes on right
      .to(globeContainerRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      }, 0.5)
      // (1s) Headline slides up
      .to(headlineRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, 1)
      // (1.5s) Subtext appears
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 1.5)
      // (2s) CTA zooms in with spring
      .to(ctaRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, 2)
      // (2.3s) Feature badges fade in
      .to(badgesRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }, 2.3)
      // (2.5s) Scroll indicator starts
      .to(scrollRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, 2.5);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scroll indicator fade on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const opacity = Math.max(0, 1 - window.scrollY / 300);
        scrollRef.current.style.opacity = String(opacity);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, hsl(222, 47%, 11%) 50%, hsl(220, 40%, 13%) 100%)',
      }}
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-safari/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-ocean/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0e1a_70%)]" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--safari)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--safari)) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main content container */}
      <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-screen py-20 lg:py-0">
          
          {/* LEFT SIDE - Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
            {/* Logo */}
            <div ref={logoRef} className="mb-8 lg:mb-12">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-safari to-ocean flex items-center justify-center shadow-lg shadow-safari/20">
                  <Compass className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <span className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                  KILISEE
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 max-w-[600px] mx-auto lg:mx-0"
              style={{
                background: 'linear-gradient(135deg, #FCD34D 0%, #F97316 50%, #0891B2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
            >
              EXPERIENCE TANZANIA WITHOUT LEAVING HOME
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base md:text-lg lg:text-xl text-white/70 max-w-[550px] mx-auto lg:mx-0 leading-relaxed mb-8 lg:mb-10"
            >
              AI-Powered Virtual Safaris • Immersive Cultural Tours • Future of Travel
            </p>

            {/* CTA Button */}
            <div ref={ctaRef} className="mb-8">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="group relative px-8 md:px-12 py-6 md:py-7 text-base md:text-lg font-semibold rounded-full bg-gradient-to-r from-safari to-ocean hover:from-safari-light hover:to-ocean-light transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]"
                >
                  <span className="flex items-center gap-2">
                    Start Virtual Journey
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Feature Badges */}
            <div ref={badgesRef} className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {[
                { icon: PlayCircle, label: "50+ Virtual Tours" },
                { icon: Sparkles, label: "AI Guide" },
                { icon: Compass, label: "4K Quality" },
              ].map((badge, index) => (
                <div 
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <badge.icon className="w-4 h-4 text-safari" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - 3D Globe */}
          <div 
            ref={globeContainerRef}
            className="relative h-[50vh] lg:h-[80vh] order-1 lg:order-2"
          >
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-safari/30 border-t-safari rounded-full animate-spin" />
              </div>
            }>
              <Globe3D />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
        onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-white/50 text-sm font-medium">Discover Below</span>
        <div className="animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </div>
      </div>
    </section>
  );
}
