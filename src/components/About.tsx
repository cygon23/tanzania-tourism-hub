import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import serengetiImage from "@/assets/serengeti.jpg";
import zanzibarImage from "@/assets/zanzibar.jpg";
import mikumiImage from "@/assets/mikumi.jpg";
import { MapPin, Star, ArrowUpRight, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: "Serengeti National Park",
    description: "Witness the Great Migration in this iconic savanna ecosystem.",
    image: serengetiImage,
    highlights: ["Great Migration", "Big Five", "Endless Plains"],
    rating: "4.9",
    duration: "3-5 Days"
  },
  {
    name: "Zanzibar Archipelago",
    description: "Pristine beaches, rich Swahili culture, and historic Stone Town.",
    image: zanzibarImage,
    highlights: ["Stone Town", "Spice Tours", "Beach Paradise"],
    rating: "4.8",
    duration: "4-7 Days"
  },
  {
    name: "Mikumi National Park",
    description: "Diverse wildlife and stunning landscapes near Dar es Salaam.",
    image: mikumiImage,
    highlights: ["Elephant Herds", "Baobab Trees", "Hippo Pools"],
    rating: "4.7",
    duration: "2-3 Days"
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
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      cardsRef.current.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
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
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0e1a 0%, #0f1628 50%, #0a0e1a 100%)',
      }}
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-sunset/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-safari/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="pt-16 sm:pt-24 md:pt-32 text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs sm:text-sm font-medium">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            Explore Tanzania
          </div>
          <h2
            ref={titleRef}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-2"
          >
            Data-Driven Tourism
            <br />
            <span 
              className="bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(135deg, #FCD34D 0%, #F97316 50%, #0891B2 100%)',
                WebkitBackgroundClip: 'text',
              }}
            >
              Development
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/50 max-w-xl md:max-w-2xl mx-auto leading-relaxed px-4">
            Transforming tourism data into strategic insights for sustainable development.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-24">
          {stats.map((stat, index) => (
            <div 
              key={index}
              ref={addToRefs}
              className="group relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 text-center hover:border-white/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-safari/5 to-ocean/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div 
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-clip-text text-transparent"
                  style={{
                    background: 'linear-gradient(135deg, #F97316 0%, #0891B2 100%)',
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-white/50 text-xs sm:text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-24">
          {destinations.map((destination, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 md:h-72 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-black/40 to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/30 backdrop-blur-xl text-white text-[10px] sm:text-xs font-medium border border-white/10">
                    {destination.duration}
                  </div>
                </div>
                
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/30 backdrop-blur-xl text-white text-xs sm:text-sm font-medium border border-white/10">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-safari text-safari" />
                  {destination.rating}
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2 flex items-center gap-2">
                    {destination.name}
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 bg-white/10 backdrop-blur-xl rounded-full text-white/80 border border-white/10"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-5">
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                  {destination.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div ref={addToRefs} className="relative overflow-hidden rounded-2xl sm:rounded-3xl mb-16 sm:mb-24 md:mb-32">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-safari via-ocean to-sunset rounded-2xl sm:rounded-3xl p-[1px]">
            <div className="absolute inset-[1px] bg-[#0a0e1a] rounded-2xl sm:rounded-3xl"></div>
          </div>
          
          <div className="relative p-6 sm:p-8 md:p-12 lg:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-safari/5 via-ocean/5 to-sunset/5 rounded-2xl sm:rounded-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                Our Mission
              </h3>
              <p className="text-white/50 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
                Driving Tanzania's tourism sector through data intelligence, enabling stakeholders to make 
                informed decisions that maximize economic impact while preserving natural heritage.
              </p>
              <button className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-safari to-ocean text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                <span>Learn More</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
