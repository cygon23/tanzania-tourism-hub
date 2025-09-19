import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MapPin, Compass, Camera, Plane } from "lucide-react";

export default function TourismLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elephantRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline
      const tl = gsap.timeline({ repeat: -1 });

      // Animate container entrance
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );

      // Sun rotation
      tl.to(sunRef.current, {
        rotation: 360,
        duration: 4,
        ease: "none",
      }, 0);

      // Elephant walking animation
      tl.fromTo(
        elephantRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 2, ease: "power2.out" }
      , 0)
      .to(elephantRef.current, {
        x: 50,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      }, 1);

      // Text breathing animation
      tl.to(textRef.current, {
        scale: 1.05,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      }, 0);

      // Icons floating animation
      gsap.to(iconsRef.current?.children || [], {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.2,
        yoyo: true,
        repeat: -1,
      });

      // Rotate icons
      gsap.to(iconsRef.current?.children || [], {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
        stagger: 0.5,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-safari via-ocean to-sunset">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-white/5 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-1/5 w-20 h-20 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-white/8 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        
        {/* Safari silhouettes */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Acacia tree silhouettes */}
        <div className="absolute bottom-8 left-1/4 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white">
            <path d="M50 90 L50 70 M30 70 Q50 50 70 70 M25 75 Q50 55 75 75" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        <div className="absolute bottom-8 right-1/3 w-20 h-20 opacity-15">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white">
            <path d="M50 90 L50 70 M30 70 Q50 50 70 70 M25 75 Q50 55 75 75" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      </div>

      <div ref={containerRef} className="relative z-10 text-center">
        {/* Sun */}
        <div
          ref={sunRef}
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-sunset-light to-sunset rounded-full opacity-80 shadow-lg"
        >
          <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-sunset-light rounded-full animate-pulse"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-2xl">
          {/* Elephant Animation */}
          <div className="relative mb-8 h-20">
            <div
              ref={elephantRef}
              className="absolute left-1/2 transform -translate-x-1/2 text-6xl opacity-80"
            >
              🐘
            </div>
            {/* Footprints */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-40">
              <span className="text-lg">🐾</span>
              <span className="text-lg">🐾</span>
              <span className="text-lg">🐾</span>
            </div>
          </div>

          {/* Loading Text */}
          <div ref={textRef} className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Karibu Tanzania! 🇹🇿
            </h1>
            <p className="text-xl text-white/90 mb-2">
              Preparing your safari adventure...
            </p>
            <p className="text-lg text-white/70">
              Hakuna Matata - No worries!
            </p>
          </div>

          {/* Floating Icons */}
          <div ref={iconsRef} className="flex justify-center space-x-8 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cream to-white rounded-full animate-pulse relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mt-6 text-sm text-white/60">
            <p className="animate-pulse">
              🦁 Did you know? Tanzania is home to the Big Five and the Great Migration!
            </p>
          </div>
        </div>

        {/* Safari Animals Parade */}
        <div className="absolute -bottom-16 left-0 right-0 flex justify-center space-x-4 text-2xl opacity-60">
          <span className="animate-bounce" style={{animationDelay: '0s'}}>🦁</span>
          <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🦓</span>
          <span className="animate-bounce" style={{animationDelay: '0.4s'}}>🦏</span>
          <span className="animate-bounce" style={{animationDelay: '0.6s'}}>🐆</span>
          <span className="animate-bounce" style={{animationDelay: '0.8s'}}>🦒</span>
        </div>
      </div>
    </div>
  );
}