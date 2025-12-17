import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Compass, Globe2, Video, Sparkles, Map, Heart, 
  ArrowRight, Camera, Mountain, Palmtree, Users, Star, LucideIcon
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Mountain,
    title: "Virtual Safaris",
    description: "Immersive 360° wildlife experiences from the comfort of home",
    gradient: "from-safari via-sunset to-safari",
    features: ["4K Quality", "360° View", "AI Narration"]
  },
  {
    icon: Video,
    title: "Cultural Tours",
    description: "Authentic Tanzanian heritage and traditions brought to life",
    gradient: "from-ocean via-ocean-light to-ocean",
    features: ["Live Guides", "Interactive", "Multilingual"]
  },
  {
    icon: Compass,
    title: "AI Travel Assistant",
    description: "Personalized trip planning powered by advanced AI",
    gradient: "from-sunset via-safari to-sunset",
    features: ["24/7 Support", "Custom Plans", "Real-time Updates"]
  },
  {
    icon: Map,
    title: "Destination Explorer",
    description: "Discover Tanzania's hidden gems and iconic landmarks",
    gradient: "from-ocean via-safari to-ocean",
    features: ["50+ Locations", "Curated Routes", "Local Tips"]
  },
  {
    icon: Camera,
    title: "Creator Platform",
    description: "Empower local guides to share their stories globally",
    gradient: "from-safari via-ocean to-safari",
    features: ["Monetization", "Studio Tools", "Global Reach"]
  },
  {
    icon: Palmtree,
    title: "Heritage Stories",
    description: "Preserved cultural narratives for future generations",
    gradient: "from-sunset via-ocean to-sunset",
    features: ["Oral History", "Traditions", "Artifacts"]
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
  { icon: Users, value: "10K+", label: "Global Users", gradient: "from-ocean to-ocean-light" },
  { icon: Heart, value: "150+", label: "Local Creators", gradient: "from-sunset to-safari" },
  { icon: Star, value: "4.9", label: "User Rating", gradient: "from-ocean to-safari" }
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
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

    return () => ctx.revert();
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
      className="relative overflow-hidden py-32"
      style={{
        background: 'linear-gradient(180deg, #0a0e1a 0%, #0d1220 50%, #0a0e1a 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-safari/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-ocean/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sunset/3 rounded-full blur-[120px]" />
      </div>

      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-safari" />
            <span className="text-white/60 text-sm font-medium tracking-wide">What We Offer</span>
          </div>
          
          <h2 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight max-w-4xl mx-auto"
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
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Experience Tanzania's wonders through cutting-edge AI and immersive technology
          </p>
        </div>

        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-32">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                ref={addToRefs}
                className="group relative"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
                
                <div className="relative h-full p-8 rounded-3xl bg-[#0d1220]/80 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2">
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-safari transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-safari font-medium text-sm group-hover:gap-4 transition-all duration-300">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-safari/10 to-ocean/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Star className="w-4 h-4 text-ocean" />
            <span className="text-white/60 text-sm font-medium tracking-wide">By The Numbers</span>
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 text-center"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div 
                  className="text-4xl font-display font-bold mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${stat.gradient.includes('safari') ? '#F97316' : '#0891B2'} 0%, ${stat.gradient.includes('ocean') ? '#67E8F9' : '#FCD34D'} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}