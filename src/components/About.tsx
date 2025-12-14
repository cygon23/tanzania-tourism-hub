import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import serengetiImage from "@/assets/serengeti.jpg";
import zanzibarImage from "@/assets/zanzibar.jpg";
import mikumiImage from "@/assets/mikumi.jpg";
import { MapPin, Star, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: "Serengeti National Park",
    description: "Witness the Great Migration and experience one of the world's most spectacular wildlife phenomena in this iconic savanna ecosystem.",
    image: serengetiImage,
    highlights: ["Great Migration", "Big Five", "Endless Plains"],
    rating: "4.9"
  },
  {
    name: "Zanzibar Archipelago",
    description: "Discover pristine beaches, rich Swahili culture, and historic Stone Town in this tropical paradise off Tanzania's coast.",
    image: zanzibarImage,
    highlights: ["Stone Town", "Spice Tours", "Beach Paradise"],
    rating: "4.8"
  },
  {
    name: "Mikumi National Park",
    description: "Explore Tanzania's fourth-largest national park, known for its diverse wildlife and stunning landscapes near Dar es Salaam.",
    image: mikumiImage,
    highlights: ["Elephant Herds", "Baobab Trees", "Hippo Pools"],
    rating: "4.7"
  }
];

const stats = [
  { value: "16+", label: "National Parks" },
  { value: "4.5M+", label: "Annual Visitors" },
  { value: "$2.5B", label: "Tourism Revenue" },
  { value: "25%", label: "GDP Contribution" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
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
    <section id="about" ref={sectionRef} className="py-32 bg-gradient-to-b from-background via-muted/10 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-safari/10 border border-safari/20 text-safari text-sm font-medium">
            <MapPin className="w-4 h-4" />
            Explore Tanzania
          </div>
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-foreground mb-8"
          >
            Data-Driven Tourism
            <br />
            <span className="bg-gradient-to-r from-sunset via-safari to-ocean bg-clip-text text-transparent">
              Development
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our platform transforms raw tourism data into strategic insights, enabling evidence-based 
            decision making for sustainable tourism development across Tanzania's key destinations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              ref={addToRefs}
              className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-safari/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {destinations.map((destination, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium">
                  <Star className="w-4 h-4 fill-sunset text-sunset" />
                  {destination.rating}
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    {destination.name}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30"
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
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div 
          ref={addToRefs}
          className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-safari/10 via-ocean/10 to-sunset/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-safari/20 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Our Mission
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-10">
              Driving Tanzania's tourism sector through data intelligence, we enable stakeholders to make 
              informed decisions that maximize economic impact while preserving natural heritage. Our AI-powered 
              analytics support sustainable growth, optimize visitor experiences, and create measurable value 
              for communities, operators, and the national economy.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-safari to-ocean text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-safari/30">
              Learn More About Us
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
