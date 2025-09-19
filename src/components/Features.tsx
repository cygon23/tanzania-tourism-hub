import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Database, MessageCircle, Calendar, Camera, BarChart, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Database,
    title: "Tourism Data Analytics",
    description: "Real-time data collection and analysis of visitor patterns, revenue trends, and market insights across Tanzania's tourism sector.",
    color: "safari"
  },
  {
    icon: MessageCircle,
    title: "AI-Powered Insights",
    description: "Machine learning algorithms providing predictive analytics, demand forecasting, and intelligent recommendations for tourism stakeholders.",
    color: "ocean"
  },
  {
    icon: BarChart,
    title: "Business Intelligence",
    description: "Comprehensive dashboards and reporting tools for tourism operators, government agencies, and investment partners.",
    color: "sunset"
  },
  {
    icon: Globe,
    title: "Market Research Platform",
    description: "Data-driven market research tools enabling informed decision-making for tourism development and investment strategies.",
    color: "safari"
  },
  {
    icon: Calendar,
    title: "Resource Optimization",
    description: "Smart resource allocation and capacity planning tools for hotels, parks, and tourism infrastructure management.",
    color: "ocean"
  },
  {
    icon: Camera,
    title: "Digital Marketing Intelligence",
    description: "Advanced analytics for tourism marketing campaigns, social media impact, and digital presence optimization.",
    color: "sunset"
  }
];

const steps = [
  {
    step: "01",
    title: "Data Collection",
    description: "Aggregate tourism data from multiple sources including hotels, parks, airlines, and government databases."
  },
  {
    step: "02", 
    title: "AI Processing",
    description: "Apply machine learning algorithms to process, clean, and analyze large datasets for actionable insights."
  },
  {
    step: "03",
    title: "Intelligence Generation",
    description: "Generate predictive models, trend analysis, and strategic recommendations for stakeholders."
  },
  {
    step: "04",
    title: "Decision Support",
    description: "Provide real-time dashboards and reports enabling data-driven decisions across the tourism ecosystem."
  }
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards with stagger effect
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Why This Matters */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Tourism Data Intelligence{" "}
            <span className="bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
              Matters Now
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
            In the AI age, data-driven decisions determine competitive advantage. Tanzania's tourism 
            sector needs intelligent systems to optimize resources, predict trends, and maximize economic impact 
            while ensuring sustainable development.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">Our Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} ref={addToRefs} className="p-6 text-center border-2 border-border/50 hover:border-border transition-all duration-300">
                <div className="text-4xl font-bold text-safari mb-4">{step.step}</div>
                <h4 className="text-xl font-semibold text-foreground mb-3">{step.title}</h4>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  ref={addToRefs}
                  className="p-8 h-full border-2 border-border/50 hover:border-border transition-all duration-300 hover:shadow-xl group cursor-pointer"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-${service.color}/10 group-hover:bg-${service.color}/20 transition-colors duration-300`}>
                    <IconComponent className={`w-8 h-8 text-${service.color}`} />
                  </div>
                  
                  <h4 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h4>
                  
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {service.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stakeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 text-center border-2 border-safari/20 bg-safari/5">
            <h4 className="text-2xl font-bold text-safari mb-4">Partners</h4>
            <p className="text-muted-foreground mb-4">Tourism operators, hotels, and service providers leveraging our data platform</p>
            <div className="text-sm text-muted-foreground">Join our partner network</div>
          </Card>
          
          <Card className="p-8 text-center border-2 border-ocean/20 bg-ocean/5">
            <h4 className="text-2xl font-bold text-ocean mb-4">Collaborators</h4>
            <p className="text-muted-foreground mb-4">Government agencies, NGOs, and academic institutions driving tourism research</p>
            <div className="text-sm text-muted-foreground">Explore collaboration opportunities</div>
          </Card>
          
          <Card className="p-8 text-center border-2 border-sunset/20 bg-sunset/5">
            <h4 className="text-2xl font-bold text-sunset mb-4">Investors</h4>
            <p className="text-muted-foreground mb-4">Strategic investors supporting Tanzania's digital tourism transformation</p>
            <div className="text-sm text-muted-foreground">Investment opportunities</div>
          </Card>
        </div>
      </div>
    </section>
  );
}