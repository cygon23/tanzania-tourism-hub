import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Compass, Globe2, Video, Sparkles, Map, Heart, 
  Camera, Mountain, Palmtree, Users, Star, LucideIcon
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  features: string[];
  size: 'large' | 'medium' | 'small';
  position: string;
}

const services: Service[] = [
  {
    icon: Mountain,
    title: "Virtual Safaris",
    description: "Immersive 360° wildlife experiences from the comfort of home",
    gradient: "from-safari via-sunset to-safari",
    features: ["4K Quality", "360° View", "AI Narration"],
    size: 'large',
    position: 'col-span-2 row-span-2'
  },
  {
    icon: Video,
    title: "Cultural Tours",
    description: "Authentic Tanzanian heritage and traditions brought to life",
    gradient: "from-ocean via-ocean-light to-ocean",
    features: ["Live Guides", "Interactive"],
    size: 'medium',
    position: 'col-span-1 row-span-2'
  },
  {
    icon: Compass,
    title: "AI Travel Assistant",
    description: "Personalized trip planning powered by advanced AI",
    gradient: "from-sunset via-safari to-sunset",
    features: ["24/7 Support", "Custom Plans"],
    size: 'medium',
    position: 'col-span-1 row-span-1'
  },
  {
    icon: Map,
    title: "Destination Explorer",
    description: "Discover Tanzania's hidden gems",
    gradient: "from-ocean via-safari to-ocean",
    features: ["50+ Locations"],
    size: 'small',
    position: 'col-span-1 row-span-1'
  },
  {
    icon: Camera,
    title: "Creator Platform",
    description: "Empower local guides globally",
    gradient: "from-safari via-ocean to-safari",
    features: ["Monetization", "Studio Tools"],
    size: 'medium',
    position: 'col-span-1 row-span-1'
  },
  {
    icon: Palmtree,
    title: "Heritage Stories",
    description: "Preserved cultural narratives",
    gradient: "from-sunset via-ocean to-sunset",
    features: ["Oral History"],
    size: 'small',
    position: 'col-span-1 row-span-1'
  }
];

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
  gradient: string;
}

const stats: Stat[] = [
  { icon: Globe2, value: "50+", label: "Virtual Tours", gradient: "from-safari to-sunset" },
  { icon: Users, value: "200+", label: "Global Users", gradient: "from-ocean to-ocean-light" },
  { icon: Heart, value: "100+", label: "Local Creators", gradient: "from-sunset to-safari" },
  { icon: Star, value: "4.9", label: "User Rating", gradient: "from-ocean to-safari" }
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add custom CSS animations for SVG elements
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.1); }
      }
      .animate-float-slow {
        animation: float-slow 4s ease-in-out infinite;
      }
      .animate-float {
        animation: float-slow 3s ease-in-out infinite;
      }
      .animate-pulse-slow {
        animation: pulse-slow 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    const ctx = gsap.context(() => {
      if (cardsRef.current.length > 0) {
        cardsRef.current.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              opacity: 0, 
              y: 100,
              rotateX: 45,
              scale: 0.8
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 1.2,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: servicesRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.to(card, {
            y: -15,
            duration: 2 + (index * 0.3),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.2
          });
        });
      }

      if (floatingRef.current) {
        const elements = floatingRef.current.querySelectorAll('.float-element');
        elements.forEach((el, i) => {
          gsap.to(el, {
            y: -30,
            x: Math.sin(i) * 20,
            rotation: Math.cos(i) * 10,
            duration: 3 + (i * 0.5),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.3
          });
        });
      }

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, scale: 0, rotateY: 180 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      // Cleanup injected styles
      const styles = document.querySelectorAll('style');
      styles.forEach(style => {
        if (style.textContent?.includes('animate-float-slow')) {
          style.remove();
        }
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section 
      id="services"
      ref={sectionRef} 
      className="relative overflow-hidden py-16 sm:py-24 md:py-32"
      style={{
        background: 'linear-gradient(180deg, #0a0e1a 0%, #0d1220 50%, #0a0e1a 100%)',
        perspective: '1000px'
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-safari/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] md:w-[700px] md:h-[700px] bg-ocean/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-sunset/3 rounded-full blur-[120px]" />
      </div>

      <div ref={floatingRef} className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div className="float-element absolute top-20 left-[10%] w-32 h-32 rounded-full border-2 border-safari/20 backdrop-blur-sm" />
        <div className="float-element absolute top-40 right-[15%] w-24 h-24 rounded-2xl border-2 border-ocean/20 backdrop-blur-sm rotate-45" />
        <div className="float-element absolute bottom-32 left-[20%] w-40 h-40 rounded-full border-2 border-sunset/20 backdrop-blur-sm" />
        <div className="float-element absolute bottom-20 right-[25%] w-28 h-28 rounded-2xl border-2 border-safari/20 backdrop-blur-sm -rotate-12" />
      </div>

      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          transform: 'rotateX(45deg) scale(2)',
          transformOrigin: 'center center'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl shadow-safari/10">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-safari animate-pulse" />
            <span className="text-white/60 text-xs sm:text-sm font-medium tracking-wide">What We Offer</span>
          </div>
          
          <h2 
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-[1.05] tracking-tight max-w-4xl mx-auto transform-gpu px-2"
            style={{
              background: 'linear-gradient(135deg, #FCD34D 0%, #F97316 40%, #0891B2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Virtual Tourism
            <br />
            Reimagined
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/50 max-w-xl md:max-w-2xl mx-auto leading-relaxed px-4">
            Experience Tanzania's wonders through cutting-edge AI and immersive technology
          </p>
        </div>

        {/* Mobile-first grid - simplified on mobile */}
        <div 
          ref={servicesRef} 
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[280px] gap-3 sm:gap-4 md:gap-6 mb-16 sm:mb-24 md:mb-32"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isLarge = service.size === 'large';
            
            // Mobile-friendly positions - span 1 on mobile, original on larger screens
            const mobilePosition = 'col-span-1 row-span-1';
            const responsivePosition = `${mobilePosition} md:${service.position}`;
            
            return (
              <div
                key={index}
                ref={addToRefs}
                className={`group relative ${responsivePosition}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`absolute -inset-1 bg-gradient-to-br ${service.gradient} rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 transform group-hover:scale-110`} 
                  style={{ transform: 'translateZ(-20px)' }}
                />
                
                <div 
                  className="relative h-full p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-700 group-hover:border-white/30 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(13,18,32,0.9) 0%, rgba(10,14,26,0.95) 100%)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(0)',
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle at 20% 50%, ${service.gradient.includes('safari') ? 'rgba(249,115,22,0.1)' : 'rgba(8,145,178,0.1)'} 0%, transparent 50%),
                                   radial-gradient(circle at 80% 50%, ${service.gradient.includes('ocean') ? 'rgba(8,145,178,0.1)' : 'rgba(249,115,22,0.1)'} 0%, transparent 50%)`
                    }}
                  />

                  <div 
                    className={`${isLarge ? 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-3 sm:mb-4 md:mb-6' : 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-2 sm:mb-3 md:mb-4'} rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-xl sm:shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative`}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(30px)'
                    }}
                  >
                    <IconComponent className={`${isLarge ? 'w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10' : 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7'} text-white`} />
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    <h3 
                      className={`${isLarge ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 sm:mb-2 md:mb-4' : 'text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2 md:mb-3'} font-display font-bold text-white group-hover:text-safari transition-colors duration-300 leading-tight`}
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      {service.title}
                    </h3>
                    
                    {/* Hide description on very small mobile to save space */}
                    <p 
                      className={`text-white/60 ${isLarge ? 'text-xs sm:text-sm md:text-base mb-2 sm:mb-4 md:mb-6' : 'text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4'} leading-relaxed hidden xs:block sm:block`}
                      style={{ transform: 'translateZ(10px)' }}
                    >
                      {service.description}
                    </p>

                    {/* Hide features on mobile */}
                    <div className="hidden sm:flex flex-wrap gap-1.5 sm:gap-2 mb-auto">
                      {service.features.map((feature, i) => (
                        <span 
                          key={i}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] sm:text-xs font-medium backdrop-blur-sm group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300"
                          style={{ transform: `translateZ(${5 + i * 2}px)` }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Animated vectors for specific services */}
                    {service.title === "Virtual Safaris" && (
                      <div className="mt-auto pt-4 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <svg viewBox="0 0 200 100" className="w-full h-auto">
                          {/* Safari landscape with animals */}
                          <g>
                            {/* Mountains/landscape - more dramatic */}
                            <path d="M0,70 L25,40 L50,55 L80,25 L110,50 L140,30 L170,55 L200,45 L200,100 L0,100 Z" 
                              fill="url(#safariGradient)" opacity="0.4"/>
                            <path d="M0,80 L40,60 L70,70 L100,55 L130,65 L160,58 L200,65 L200,100 L0,100 Z" 
                              fill="url(#safariGradient2)" opacity="0.3"/>
                            
                            {/* Sun */}
                            <g className="animate-pulse-slow">
                              <circle cx="180" cy="20" r="8" fill="#FCD34D" opacity="0.5"/>
                              <circle cx="180" cy="20" r="12" fill="none" stroke="#FCD34D" strokeWidth="1" opacity="0.3"/>
                            </g>

                            {/* Giraffe - taller and more visible */}
                            <g className="animate-float" style={{ animationDelay: '0.5s' }}>
                              <rect x="155" y="35" width="4" height="35" fill="#F97316" opacity="0.7" rx="1"/>
                              <ellipse cx="157" cy="32" rx="5" ry="6" fill="#F97316" opacity="0.7"/>
                              <line x1="157" y1="32" x2="157" y2="26" stroke="#F97316" strokeWidth="2" opacity="0.7"/>
                              <circle cx="157" cy="24" r="3" fill="#F97316" opacity="0.7"/>
                              <line x1="155" y1="70" x2="152" y2="75" stroke="#F97316" strokeWidth="2" opacity="0.7"/>
                              <line x1="159" y1="70" x2="162" y2="75" stroke="#F97316" strokeWidth="2" opacity="0.7"/>
                            </g>

                            {/* Elephant - larger */}
                            <g className="animate-float" style={{ animationDelay: '1s' }}>
                              <ellipse cx="85" cy="58" rx="12" ry="9" fill="#F97316" opacity="0.6"/>
                              <circle cx="88" cy="55" r="3" fill="#F97316" opacity="0.6"/>
                              <path d="M77,58 Q72,68 75,74" stroke="#F97316" strokeWidth="3" fill="none" opacity="0.6"/>
                              <rect x="82" y="67" width="2" height="8" fill="#F97316" opacity="0.6"/>
                              <rect x="88" y="67" width="2" height="8" fill="#F97316" opacity="0.6"/>
                            </g>

                            {/* Zebra */}
                            <g className="animate-float" style={{ animationDelay: '0.3s' }}>
                              <ellipse cx="120" cy="62" rx="10" ry="7" fill="#F97316" opacity="0.5"/>
                              <circle cx="122" cy="59" r="2.5" fill="#F97316" opacity="0.5"/>
                              <line x1="116" y1="69" x2="116" y2="75" stroke="#F97316" strokeWidth="2" opacity="0.5"/>
                              <line x1="124" y1="69" x2="124" y2="75" stroke="#F97316" strokeWidth="2" opacity="0.5"/>
                              {/* Zebra stripes */}
                              <line x1="115" y1="60" x2="125" y2="60" stroke="#0891B2" strokeWidth="1" opacity="0.3"/>
                              <line x1="115" y1="64" x2="125" y2="64" stroke="#0891B2" strokeWidth="1" opacity="0.3"/>
                            </g>

                            {/* Birds flying */}
                            <g className="animate-float" style={{ animationDelay: '0.2s' }}>
                              <path d="M45,18 Q48,15 51,18" stroke="#FCD34D" strokeWidth="1.5" fill="none" opacity="0.6"/>
                              <path d="M38,22 Q41,19 44,22" stroke="#FCD34D" strokeWidth="1.5" fill="none" opacity="0.6"/>
                            </g>
                            <g className="animate-float" style={{ animationDelay: '0.7s' }}>
                              <path d="M65,12 Q68,9 71,12" stroke="#FCD34D" strokeWidth="1.5" fill="none" opacity="0.6"/>
                            </g>

                            {/* Acacia tree */}
                            <g className="animate-float-slow" style={{ animationDelay: '0.4s' }}>
                              <line x1="30" y1="75" x2="30" y2="55" stroke="#F97316" strokeWidth="2.5" opacity="0.5"/>
                              <ellipse cx="30" cy="50" rx="12" ry="8" fill="#F97316" opacity="0.4"/>
                              <ellipse cx="30" cy="48" rx="8" ry="6" fill="#10B981" opacity="0.3"/>
                            </g>

                            {/* Grass/vegetation */}
                            <g opacity="0.4">
                              <line x1="10" y1="85" x2="10" y2="78" stroke="#10B981" strokeWidth="1" className="animate-float"/>
                              <line x1="50" y1="82" x2="50" y2="75" stroke="#10B981" strokeWidth="1" className="animate-float" style={{ animationDelay: '0.2s' }}/>
                              <line x1="90" y1="80" x2="90" y2="74" stroke="#10B981" strokeWidth="1" className="animate-float" style={{ animationDelay: '0.4s' }}/>
                              <line x1="140" y1="78" x2="140" y2="72" stroke="#10B981" strokeWidth="1" className="animate-float" style={{ animationDelay: '0.6s' }}/>
                            </g>
                          </g>
                          <defs>
                            <linearGradient id="safariGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#F97316" stopOpacity="0.5"/>
                              <stop offset="100%" stopColor="#DC2626" stopOpacity="0.3"/>
                            </linearGradient>
                            <linearGradient id="safariGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#DC2626" stopOpacity="0.4"/>
                              <stop offset="100%" stopColor="#F97316" stopOpacity="0.2"/>
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    )}

                    {service.title === "Cultural Tours" && (
                      <div className="mt-auto pt-4 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <svg viewBox="0 0 200 100" className="w-full h-auto">
                          {/* Cultural elements - more spread out */}
                          <g>
                            {/* Traditional huts - larger and better positioned */}
                            <g className="animate-float-slow">
                              <circle cx="35" cy="45" r="20" fill="none" stroke="#0891B2" strokeWidth="2.5" opacity="0.5"/>
                              <path d="M35,25 L50,45 L20,45 Z" fill="#0891B2" opacity="0.4"/>
                              <rect x="32" y="45" width="6" height="8" fill="#0891B2" opacity="0.3"/>
                            </g>
                            <g className="animate-float-slow" style={{ animationDelay: '0.3s' }}>
                              <circle cx="100" cy="50" r="22" fill="none" stroke="#0891B2" strokeWidth="2.5" opacity="0.5"/>
                              <path d="M100,28 L117,50 L83,50 Z" fill="#0891B2" opacity="0.4"/>
                              <rect x="97" y="50" width="6" height="10" fill="#0891B2" opacity="0.3"/>
                            </g>
                            <g className="animate-float-slow" style={{ animationDelay: '0.6s' }}>
                              <circle cx="165" cy="48" r="18" fill="none" stroke="#0891B2" strokeWidth="2.5" opacity="0.5"/>
                              <path d="M165,30 L178,48 L152,48 Z" fill="#0891B2" opacity="0.4"/>
                              <rect x="162" y="48" width="6" height="8" fill="#0891B2" opacity="0.3"/>
                            </g>
                            
                            {/* Dancing figures - more prominent */}
                            <g className="animate-pulse-slow">
                              <circle cx="60" cy="30" r="5" fill="#67E8F9" opacity="0.6"/>
                              <line x1="60" y1="35" x2="60" y2="50" stroke="#67E8F9" strokeWidth="2.5" opacity="0.6"/>
                              <line x1="60" y1="40" x2="52" y2="48" stroke="#67E8F9" strokeWidth="2.5" opacity="0.6"/>
                              <line x1="60" y1="40" x2="68" y2="48" stroke="#67E8F9" strokeWidth="2.5" opacity="0.6"/>
                              <line x1="60" y1="50" x2="55" y2="60" stroke="#67E8F9" strokeWidth="2.5" opacity="0.6"/>
                              <line x1="60" y1="50" x2="65" y2="60" stroke="#67E8F9" strokeWidth="2.5" opacity="0.6"/>
                            </g>
                            
                            <g className="animate-pulse-slow" style={{ animationDelay: '0.4s' }}>
                              <circle cx="140" cy="25" r="5" fill="#67E8F9" opacity="0.6"/>
                              <line x1="140" y1="30" x2="140" y2="45" stroke="#67E8F9" strokeWidth="2.5" opacity="0.6"/>
                              <line x1="140" y1="35" x2="148" y2="42" stroke="#67E8F9" strokeWidth="2.5" opacity="0.6"/>
                              <line x1="140" y1="35" x2="132" y2="42" stroke="#67E8F9" strokeWidth="2.5" opacity="0.6"/>
                              <line x1="140" y1="45" x2="135" y2="55" stroke="#67E8F9" strokeWidth="2.5" opacity="0.6"/>
                              <line x1="140" y1="45" x2="145" y2="55" stroke="#67E8F9" strokeWidth="2.5" opacity="0.6"/>
                            </g>

                            {/* Decorative patterns - African motifs */}
                            <g className="animate-pulse-slow">
                              <circle cx="20" cy="20" r="4" fill="none" stroke="#67E8F9" strokeWidth="2" opacity="0.4"/>
                              <circle cx="20" cy="20" r="2" fill="#67E8F9" opacity="0.4"/>
                            </g>
                            <g className="animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
                              <circle cx="180" cy="18" r="3" fill="none" stroke="#67E8F9" strokeWidth="2" opacity="0.4"/>
                              <circle cx="180" cy="18" r="1.5" fill="#67E8F9" opacity="0.4"/>
                            </g>
                            <g className="animate-pulse-slow" style={{ animationDelay: '0.7s' }}>
                              <rect x="15" y="70" width="8" height="8" fill="none" stroke="#0891B2" strokeWidth="2" opacity="0.3" transform="rotate(45 19 74)"/>
                            </g>
                            <g className="animate-pulse-slow" style={{ animationDelay: '0.9s' }}>
                              <rect x="175" y="75" width="6" height="6" fill="none" stroke="#0891B2" strokeWidth="2" opacity="0.3" transform="rotate(45 178 78)"/>
                            </g>

                            {/* Sun/cultural symbol */}
                            <g className="animate-float" style={{ animationDelay: '0.2s' }}>
                              <circle cx="100" cy="15" r="6" fill="#FCD34D" opacity="0.4"/>
                              <line x1="100" y1="8" x2="100" y2="3" stroke="#FCD34D" strokeWidth="1.5" opacity="0.4"/>
                              <line x1="100" y1="22" x2="100" y2="27" stroke="#FCD34D" strokeWidth="1.5" opacity="0.4"/>
                              <line x1="93" y1="15" x2="88" y2="15" stroke="#FCD34D" strokeWidth="1.5" opacity="0.4"/>
                              <line x1="107" y1="15" x2="112" y2="15" stroke="#FCD34D" strokeWidth="1.5" opacity="0.4"/>
                            </g>
                          </g>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl group-hover:scale-150 transition-transform duration-700"
                    style={{ transform: 'translateZ(-10px)' }}
                  />
                </div>

                <div 
                  className="absolute inset-0 rounded-3xl bg-black/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ transform: 'translateZ(-60px) translateY(20px)' }}
                />
              </div>
            );
          })}
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl shadow-ocean/10">
            <Star className="w-4 h-4 text-ocean animate-pulse" />
            <span className="text-white/60 text-sm font-medium tracking-wide">Impact & Growth</span>
          </div>
          <h3 
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #FCD34D 0%, #F97316 50%, #0891B2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Transforming Tourism
          </h3>
          <p className="text-white/50 text-lg">One virtual experience at a time</p>
        </div>

        {/* Circular Orbital Stats Display */}
        <div ref={statsRef} className="relative h-[600px] md:h-[700px] flex items-center justify-center" style={{ perspective: '2000px' }}>
          
          {/* Center focal point - African drum/cultural symbol */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div 
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(8,145,178,0.2) 100%)',
                boxShadow: '0 0 60px rgba(249,115,22,0.3), 0 0 100px rgba(8,145,178,0.2), inset 0 0 30px rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-2 rounded-full border-2 border-safari/30 animate-pulse" />
              <Globe2 className="w-16 h-16 md:w-20 md:h-20 text-white/80 animate-float-slow" />
              
              {/* Rotating rings */}
              <div className="absolute inset-[-20px] rounded-full border border-ocean/20 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-[-30px] rounded-full border border-safari/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
            </div>
          </div>

          {/* Stats in orbital positions */}
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const angle = (index * 90) - 45; // 0°, 90°, 180°, 270° positions
            const radius = window.innerWidth < 768 ? 180 : 250;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <div 
                key={index}
                className="absolute top-1/2 left-1/2 group"
                style={{ 
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Connection line to center */}
                <svg 
                  className="absolute top-1/2 left-1/2 pointer-events-none -z-10"
                  style={{
                    width: `${Math.abs(x) * 2}px`,
                    height: `${Math.abs(y) * 2}px`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  }}
                >
                  <line 
                    x1="50%" 
                    y1="50%" 
                    x2={x > 0 ? "0%" : "100%"} 
                    y2="50%" 
                    stroke="url(#lineGradient)" 
                    strokeWidth="2" 
                    opacity="0.2"
                    strokeDasharray="5,5"
                    className="animate-pulse-slow"
                  />
                </svg>

                {/* Stat card with 3D effect */}
                <div 
                  className="relative w-48 md:w-56"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* 3D glow layers */}
                  <div 
                    className={`absolute -inset-2 bg-gradient-to-br ${stat.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-700`}
                    style={{ transform: 'translateZ(-30px)' }}
                  />
                  
                  {/* Main card */}
                  <div 
                    className="relative p-6 md:p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-500 text-center backdrop-blur-lg group-hover:-translate-y-4 group-hover:rotate-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(13,18,32,0.95) 0%, rgba(10,14,26,0.98) 100%)',
                      transformStyle: 'preserve-3d',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* Decorative corner elements */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-safari/30 rounded-tl-xl" />
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-ocean/30 rounded-br-xl" />

                    {/* Icon with cultural pattern background */}
                    <div className="relative mb-4">
                      <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `repeating-linear-gradient(45deg, ${stat.gradient.includes('safari') ? '#F97316' : '#0891B2'} 0px, transparent 2px, transparent 4px, ${stat.gradient.includes('safari') ? '#F97316' : '#0891B2'} 6px)`,
                          borderRadius: '16px'
                        }}
                      />
                      <div 
                        className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}
                        style={{ transform: 'translateZ(40px)' }}
                      >
                        <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                    </div>

                    {/* Value with animated counting effect */}
                    <div 
                      className="text-5xl md:text-6xl font-display font-bold mb-2 relative"
                      style={{
                        background: `linear-gradient(135deg, ${stat.gradient.includes('safari') ? '#F97316' : '#0891B2'} 0%, ${stat.gradient.includes('ocean') ? '#67E8F9' : '#FCD34D'} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        transform: 'translateZ(30px)',
                        textShadow: '0 0 40px rgba(249,115,22,0.3)'
                      }}
                    >
                      {stat.value}
                      
                      {/* Animated sparkles */}
                      <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-safari animate-pulse" style={{ animationDelay: `${index * 0.2}s` }} />
                    </div>

                    {/* Label */}
                    <div 
                      className="text-white/60 text-sm md:text-base font-medium tracking-wide uppercase"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      {stat.label}
                    </div>

                    {/* African pattern decoration at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-3xl">
                      <div 
                        className={`h-full bg-gradient-to-r ${stat.gradient} opacity-50`}
                        style={{
                          backgroundSize: '20px 100%',
                          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(255,255,255,0.1) 5px, rgba(255,255,255,0.1) 10px)`
                        }}
                      />
                    </div>
                  </div>

                  {/* Floating particles around card */}
                  <div className="absolute -top-4 -right-4 w-2 h-2 rounded-full bg-safari/60 animate-float" style={{ animationDelay: `${index * 0.3}s` }} />
                  <div className="absolute -bottom-4 -left-4 w-2 h-2 rounded-full bg-ocean/60 animate-float" style={{ animationDelay: `${index * 0.3 + 0.5}s` }} />
                </div>
              </div>
            );
          })}

          {/* Rotating orbit rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div 
              className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border-2 border-dashed border-safari/10 animate-spin"
              style={{ 
                animationDuration: '40s',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
            <div 
              className="absolute w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full border border-ocean/10 animate-spin"
              style={{ 
                animationDuration: '50s',
                animationDirection: 'reverse',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>

          {/* Decorative floating elements */}
          <div className="absolute top-10 left-10 w-3 h-3 rounded-full bg-sunset/40 animate-float" />
          <div className="absolute top-20 right-16 w-2 h-2 rounded-full bg-safari/40 animate-float" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-16 left-20 w-3 h-3 rounded-full bg-ocean/40 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-10 right-10 w-2 h-2 rounded-full bg-sunset/40 animate-float" style={{ animationDelay: '1.5s' }} />

          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#0891B2" stopOpacity="0.5"/>
            </linearGradient>
          </defs>
        </div>

      </div>
    </section>
  );
}