import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Database, MessageCircle, Calendar, Camera, BarChart, Globe, ArrowRight, Check,
  Layers, Cpu, Lightbulb, Target, Handshake, FlaskConical, TrendingUp, LucideIcon
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Database,
    title: "Tourism Data Analytics",
    description: "Real-time data collection and analysis of visitor patterns, revenue trends, and market insights across Tanzania's tourism sector.",
    features: ["Visitor tracking", "Revenue analytics", "Market trends"],
    gradient: "from-safari to-safari-light"
  },
  {
    icon: MessageCircle,
    title: "AI-Powered Insights",
    description: "Machine learning algorithms providing predictive analytics, demand forecasting, and intelligent recommendations for tourism stakeholders.",
    features: ["Predictive models", "Demand forecasting", "Smart alerts"],
    gradient: "from-ocean to-ocean-light"
  },
  {
    icon: BarChart,
    title: "Business Intelligence",
    description: "Comprehensive dashboards and reporting tools for tourism operators, government agencies, and investment partners.",
    features: ["Custom dashboards", "Automated reports", "KPI tracking"],
    gradient: "from-sunset to-sunset-light"
  },
  {
    icon: Globe,
    title: "Market Research Platform",
    description: "Data-driven market research tools enabling informed decision-making for tourism development and investment strategies.",
    features: ["Competitor analysis", "Market sizing", "Investment insights"],
    gradient: "from-safari to-ocean"
  },
  {
    icon: Calendar,
    title: "Resource Optimization",
    description: "Smart resource allocation and capacity planning tools for hotels, parks, and tourism infrastructure management.",
    features: ["Capacity planning", "Resource allocation", "Efficiency metrics"],
    gradient: "from-ocean to-sunset"
  },
  {
    icon: Camera,
    title: "Digital Marketing Intelligence",
    description: "Advanced analytics for tourism marketing campaigns, social media impact, and digital presence optimization.",
    features: ["Campaign analytics", "Social insights", "ROI tracking"],
    gradient: "from-sunset to-safari"
  }
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
    description: "Aggregate tourism data from multiple sources including hotels, parks, airlines, and government databases.",
    icon: Layers,
    gradient: "from-safari to-safari-light"
  },
  {
    step: "02", 
    title: "AI Processing",
    description: "Apply machine learning algorithms to process, clean, and analyze large datasets for actionable insights.",
    icon: Cpu,
    gradient: "from-ocean to-ocean-light"
  },
  {
    step: "03",
    title: "Intelligence Generation",
    description: "Generate predictive models, trend analysis, and strategic recommendations for stakeholders.",
    icon: Lightbulb,
    gradient: "from-sunset to-sunset-light"
  },
  {
    step: "04",
    title: "Decision Support",
    description: "Provide real-time dashboards and reports enabling data-driven decisions across the tourism ecosystem.",
    icon: Target,
    gradient: "from-safari to-ocean"
  }
];

interface Stakeholder {
  title: string;
  description: string;
  cta: string;
  gradient: string;
  icon: LucideIcon;
}

const stakeholders: Stakeholder[] = [
  {
    title: "Partners",
    description: "Tourism operators, hotels, and service providers leveraging our data platform for competitive advantage.",
    cta: "Join our partner network",
    gradient: "from-safari to-safari-light",
    icon: Handshake
  },
  {
    title: "Collaborators",
    description: "Government agencies, NGOs, and academic institutions driving tourism research and policy development.",
    cta: "Explore collaboration",
    gradient: "from-ocean to-ocean-light",
    icon: FlaskConical
  },
  {
    title: "Investors",
    description: "Strategic investors supporting Tanzania's digital tourism transformation and sustainable growth.",
    cta: "Investment opportunities",
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
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
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
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Why This Matters */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-safari/10 border border-safari/20 text-safari text-sm font-medium">
            Why It Matters
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
            Data Intelligence for the
            <br />
            <span className="bg-gradient-to-r from-safari via-ocean to-sunset bg-clip-text text-transparent">
              AI-Powered Era
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            In today's data-driven landscape, tourism success hinges on intelligent systems that optimize resources, 
            predict trends, and maximize economic impact while ensuring sustainable development.
          </p>
        </div>

        {/* Process Steps */}
        <div id="process" className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">How We Work</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={index} 
                  ref={addToRefs} 
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-safari/20 to-ocean/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-safari/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} mb-6 shadow-lg`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-6xl font-bold text-muted/20 mb-4">{step.step}</div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">{step.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Services */}
        <div id="services" className="mb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-ocean/10 border border-ocean/20 text-ocean text-sm font-medium">
              Our Services
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">Comprehensive Data Solutions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  ref={addToRefs}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  <div className="relative p-8 h-full rounded-3xl bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h4 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h4>
                    
                    <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-safari" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stakeholders */}
        <div id="partners">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-sunset/10 border border-sunset/20 text-sunset text-sm font-medium">
              Join Our Ecosystem
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">Built for Collaboration</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stakeholders.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} ref={addToRefs} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  <div className="relative p-10 text-center rounded-3xl bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} mb-6 shadow-lg mx-auto`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-foreground mb-4">{item.title}</h4>
                    <p className="text-muted-foreground mb-6 flex-grow">{item.description}</p>
                    <button className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${item.gradient} text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                      {item.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
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
