import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Home, Compass } from "lucide-react";
import safariImage from "@/assets/404-safari.jpg";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([imageRef.current, textRef.current, buttonsRef.current], {
        opacity: 0,
        y: 50,
      });

      // Create entrance animation
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(textRef.current, {
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

      // Floating animation for the compass
      gsap.to(".compass-float", {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".compass-float", {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--safari-green)) 0%, hsl(var(--sunset-orange)) 100%)',
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/15 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-white/5 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-white/20 rounded-full animate-float" style={{animationDelay: '6s'}}></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Illustration */}
        <div
          ref={imageRef}
          className="mb-12 relative"
        >
          <img
            src={safariImage}
            alt="Lost in the safari"
            className="mx-auto max-w-md w-full h-auto rounded-2xl shadow-2xl"
          />
          
          {/* Floating compass */}
          <div className="absolute -top-4 -right-4 compass-float">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border-4 border-white/50">
              <Compass className="w-8 h-8 text-safari" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div ref={textRef} className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            You're Off the Trail!
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Looks like this page wandered away into the wilderness. 
            Don't worry – even the best explorers sometimes take a wrong turn. 
            Let's guide you back to safety!
          </p>
          <div className="flex items-center justify-center space-x-4 text-white/70">
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <span className="text-sm">Lost but not forgotten</span>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            onClick={() => window.location.href = "/"}
            className="bg-white/90 hover:bg-white text-safari hover:text-safari-dark font-semibold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Home className="w-6 h-6 mr-3" />
            Return to Base Camp
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 font-semibold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Compass className="w-6 h-6 mr-3" />
            Retrace Steps
          </Button>
        </div>

        {/* Footer message */}
        <div className="mt-12">
          <p className="text-white/60 text-sm">
            "Not all those who wander are lost... but this page definitely is." 
            <br />
            – The Tanzania Tourism Team
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;