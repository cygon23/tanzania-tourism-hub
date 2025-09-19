import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16"> {/* Account for fixed navbar */}
        <Hero />
        <Features />
        <About />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
