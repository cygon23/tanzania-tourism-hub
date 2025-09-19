import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import serengetiImage from "@/assets/serengeti.jpg";
import zanzibarImage from "@/assets/zanzibar.jpg";
import mikumiImage from "@/assets/mikumi.jpg";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: "Serengeti National Park",
    description: "Witness the Great Migration and experience one of the world's most spectacular wildlife phenomena in this iconic savanna ecosystem.",
    image: serengetiImage,
    highlights: ["Great Migration", "Big Five", "Endless Plains"]
  },
  {
    name: "Zanzibar Archipelago",
    description: "Discover pristine beaches, rich Swahili culture, and historic Stone Town in this tropical paradise off Tanzania's coast.",
    image: zanzibarImage,
    highlights: ["Stone Town", "Spice Tours", "Beach Paradise"]
  },
  {
    name: "Mikumi National Park",
    description: "Explore Tanzania's fourth-largest national park, known for its diverse wildlife and stunning landscapes near Dar es Salaam.",
    image: mikumiImage,
    highlights: ["Elephant Herds", "Baobab Trees", "Hippo Pools"]
  }
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards animation with parallax effect
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            rotateY: index % 2 === 0 ? -15 : 15,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Data-Driven Tourism{" "}
            <span className="bg-gradient-to-r from-sunset via-safari to-ocean bg-clip-text text-transparent">
              Development
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our platform transforms raw tourism data into strategic insights, enabling evidence-based 
            decision making for sustainable tourism development across Tanzania's key destinations. 
            From Serengeti to Zanzibar, we provide the intelligence needed for optimal resource allocation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {destinations.map((destination, index) => (
            <Card
              key={index}
              ref={addToRefs}
              className="overflow-hidden group cursor-pointer border-2 border-border/50 hover:border-border transition-all duration-500 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {destination.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/30"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {destination.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-safari/10 via-ocean/10 to-sunset/10 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Our Impact
          </h3>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Driving Tanzania's tourism sector through data intelligence, we enable stakeholders to make 
            informed decisions that maximize economic impact while preserving natural heritage. Our AI-powered 
            analytics support sustainable growth, optimize visitor experiences, and create measurable value 
            for communities, operators, and the national economy.
          </p>
        </div>
      </div>
    </section>
  );
}