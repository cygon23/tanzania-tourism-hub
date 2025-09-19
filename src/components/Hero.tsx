import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HeroButton } from "@/components/ui/button-variants";
import heroImage from "@/assets/hero-tanzania.jpg";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], {
        opacity: 0,
        y: 50,
      });

      // Create timeline
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
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
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
        >
          Tanzania Tourism{" "}
          <span className="bg-gradient-to-r from-sunset to-ocean bg-clip-text text-transparent">
            Data Hub
          </span>
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Comprehensive tourism data platform providing real-time insights, AI-powered analytics, 
          and intelligent decision-making tools for Tanzania's tourism ecosystem. Empowering 
          stakeholders with actionable data in the digital transformation era.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <HeroButton className="min-w-48">
            Explore Data Hub
          </HeroButton>
          <HeroButton variant="outline" className="min-w-48 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
            Sign In
          </HeroButton>
        </div>
      </div>

      {/* Floating animation elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-sunset/40 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-ocean/30 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>
    </section>
  );
}