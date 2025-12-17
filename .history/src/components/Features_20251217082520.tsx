import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Database, MessageCircle, Calendar, Camera, BarChart, Globe, ArrowRight,
  Layers, Cpu, Lightbulb, Target, Handshake, FlaskConical, TrendingUp, LucideIcon
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Minimal services - icon + name only
const services = [
  { icon: Database, title: "Data Analytics", gradient: "from-safari to-safari-light" },
  { icon: MessageCircle, title: "AI Insights", gradient: "from-ocean to-ocean-light" },
  { icon: BarChart, title: "Business Intelligence", gradient: "from-sunset to-sunset-light" },
  { icon: Globe, title: "Market Research", gradient: "from-safari to-ocean" },
  { icon: Calendar, title: "Resource Optimization", gradient: "from-ocean to-sunset" },
  { icon: Camera, title: "Marketing Intelligence", gradient: "from-sunset to-safari" },
];

interface Step {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

const steps: Step[] = [
  {
    step: "01",
    title: "Data Collection",
    description: "Aggregate tourism data from multiple sources",
    icon: Layers,
    gradient: "from-safari to-safari-light"
  },
  {
    step: "02", 
    title: "AI Processing",
    description: "Apply machine learning for actionable insights",
    icon: Cpu,
    gradient: "from-ocean to-ocean-light"
  },
  {
    step: "03",
    title: "Intelligence Generation",
    description: "Generate predictive models and analysis",
    icon: Lightbulb,
    gradient: "from-sunset to-sunset-light"
  },
  {
    step: "04",
    title: "Decision Support",
    description: "Real-time dashboards for data-driven decisions",
    icon: Target,
    gradient: "from-safari to-ocean"
  }
];

interface Stakeholder {
  title: string;
  description: string;
  gradient: string;
  icon: LucideIcon;
}

const stakeholders: Stakeholder[] = [
  {
    title: "Partners",
    description: "Tourism operators leveraging our platform",
    gradient: "from-safari to-safari-light",
    icon: Handshake
  },
  {
    title: "Collaborators",
    description: "Government agencies and research institutions",
    gradient: "from-ocean to-ocean-light",
    icon: FlaskConical
  },
  {
    title: "Investors",
    description: "Supporting Tanzania's digital transformation",
    gradient: "from-sunset to-sunset-light",
    icon: TrendingUp
  }
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0e1a 0%, #0d1220 50%, #0a0e1a 100%)',
      }}
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-safari/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-ocean/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Why It Matters */}
        <div className="py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
            Why It Matters
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight max-w-4xl mx-auto">
            Data Intelligence for
            <br />
            <span 
              className="bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(135deg, #FCD34D 0%, #F97316 50%, #0891B2 100%)',
                WebkitBackgroundClip: 'text',
              }}
            >
              Tourism Excellence
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Intelligent systems that optimize resources, predict trends, and maximize economic impact.
          </p>
        </div>

        {/* Services - Minimal Icon Grid */}
        <div id="services" className="pb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
              Our Services
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white">
              What We Offer
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  ref={addToRefs}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="relative flex flex-col items-center p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/[0.05]">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <span className="text-white/80 text-sm md:text-base font-medium text-center leading-tight">
                      {service.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Steps */}
        <div id="process" className="pb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
              Our Process
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white">
              How We Work
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} ref={addToRefs} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
                  <div className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
                    <div className="absolute top-6 right-6 text-6xl font-display font-bold text-white/5">
                      {step.step}
                    </div>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl font-display font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-white/20" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stakeholders */}
        <div id="partners" className="pb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium">
              Our Ecosystem
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white">
              Built for Collaboration
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stakeholders.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} ref={addToRefs} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
                  <div className="relative p-10 text-center rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500 h-full flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-2xl font-display font-bold text-white mb-3">{item.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
