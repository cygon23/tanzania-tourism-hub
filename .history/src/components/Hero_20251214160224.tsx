import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-tanzania.jpg";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, buttonsRef.current], {
        opacity: 0,
        y: 50,
      });

      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.4")
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5")
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.3");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-safari/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ocean/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sunset/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Badge */}
        <div 
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90"
        >
          <Sparkles className="w-4 h-4 text-sunset" />
          <span className="text-sm font-medium">AI-Powered Tourism Intelligence</span>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
        >
          Transforming
          <br />
          <span className="bg-gradient-to-r from-sunset via-white to-ocean bg-clip-text text-transparent">
            Tanzania Tourism
          </span>
          <br />
          With Data
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          The comprehensive data intelligence platform empowering tourism stakeholders with 
          real-time analytics, AI-driven insights, and strategic decision-making tools for 
          Tanzania's sustainable tourism growth.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <Link to="/auth">
            <Button 
              size="lg" 
              className="rounded-full bg-gradient-to-r from-safari to-ocean hover:from-safari-light hover:to-ocean-light px-10 py-6 text-lg font-semibold shadow-2xl shadow-safari/30 transition-all duration-300 hover:scale-105 hover:shadow-safari/50"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button 
            size="lg"
            variant="outline" 
            className="rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 px-10 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Platform
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: "50+", label: "Data Points" },
            { value: "4+", label: "Partners" },
            { value: "24/7", label: "Real-time Analytics" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, index) => (
            <div 
              key={index}
              className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-105"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-white/50 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
