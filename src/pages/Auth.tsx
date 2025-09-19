import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { MapPin, Mail, Lock, User as UserIcon, ArrowRight, Compass, Mountain, Camera, Globe } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register } = useUser();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated gradient background
      gsap.to(".animated-bg", {
        backgroundPosition: "400% center",
        ease: "none",
        repeat: -1,
        duration: 30,
      });

      // Floating elements animation
      gsap.to(".floating-element", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          from: "random"
        }
      });

      // Card entrance with 3D effect
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8,
          rotationX: -30,
          transformPerspective: 1000
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.5
        }
      );

      // Form elements cascade
      gsap.fromTo(
        ".form-element",
        { opacity: 0, y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 1,
          ease: "back.out(1.7)"
        }
      );

      // Logo animation
      gsap.fromTo(
        ".logo-animation",
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          delay: 0.2
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleToggleMode = () => {
    gsap.timeline()
      .to(cardRef.current, {
        rotationY: 90,
        duration: 0.4,
        ease: "power2.inOut",
      })
      .call(() => {
        setIsLogin(!isLogin);
        setFormData({ name: "", email: "", password: "" });
      })
      .to(cardRef.current, {
        rotationY: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = isLogin 
        ? await login(formData.email, formData.password)
        : await register(formData.name, formData.email, formData.password);

      if (success) {
        toast({
          title: isLogin ? "Welcome back!" : "Welcome to Tanzania Hub!",
          description: isLogin ? "Successfully signed in." : "Account created successfully.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Authentication Failed",
          description: isLogin 
            ? "Invalid email or password." 
            : "Email already exists or registration failed.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 animated-bg"
      style={{
        background: "linear-gradient(-45deg, hsl(var(--safari) / 0.1), hsl(var(--ocean) / 0.15), hsl(var(--safari) / 0.05), hsl(var(--ocean) / 0.1))",
        backgroundSize: "400% 400%"
      }}
    >
      {/* Floating decorative elements */}
      <div ref={floatingRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-element absolute top-20 left-10 w-8 h-8 text-safari/20">
          <Compass className="w-full h-full" />
        </div>
        <div className="floating-element absolute top-32 right-20 w-6 h-6 text-ocean/30">
          <Mountain className="w-full h-full" />
        </div>
        <div className="floating-element absolute bottom-40 left-20 w-10 h-10 text-safari/15">
          <Camera className="w-full h-full" />
        </div>
        <div className="floating-element absolute bottom-20 right-10 w-7 h-7 text-ocean/25">
          <Globe className="w-full h-full" />
        </div>
        <div className="floating-element absolute top-1/2 left-5 w-5 h-5 text-safari/20">
          <MapPin className="w-full h-full" />
        </div>
        <div className="floating-element absolute top-1/3 right-5 w-9 h-9 text-ocean/20">
          <Compass className="w-full h-full" />
        </div>
      </div>

      {/* Glassmorphism card */}
      <div className="w-full max-w-md relative z-10">
        <Card 
          ref={cardRef} 
          className="backdrop-blur-xl bg-card/40 border border-white/20 shadow-2xl rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 45px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
          }}
        >
          <CardHeader className="text-center space-y-6 pb-6">
            <div className="logo-animation flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-safari to-ocean rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
                Tanzania Hub
              </span>
            </div>
            
            <div className="form-element space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                {isLogin ? "Welcome Back Explorer" : "Begin Your Journey"}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {isLogin 
                  ? "Continue your Tanzanian adventure" 
                  : "Discover the wonders of Tanzania with AI"
                }
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="form-element space-y-3">
                  <Label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium">
                    <UserIcon className="w-4 h-4 text-safari" />
                    <span>Full Name</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your explorer name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!isLogin}
                    className="h-12 bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] focus:bg-white/20 focus:border-safari/50"
                  />
                </div>
              )}
              
              <div className="form-element space-y-3">
                <Label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium">
                  <Mail className="w-4 h-4 text-ocean" />
                  <span>Email Address</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12 bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] focus:bg-white/20 focus:border-ocean/50"
                />
              </div>
              
              <div className="form-element space-y-3">
                <Label htmlFor="password" className="flex items-center space-x-2 text-sm font-medium">
                  <Lock className="w-4 h-4 text-safari" />
                  <span>Password</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12 bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] focus:bg-white/20 focus:border-safari/50"
                />
              </div>
              
              <div className="form-element pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-safari to-ocean hover:from-safari-light hover:to-ocean-light transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group text-white font-medium"
                  style={{
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>{isLogin ? "Enter Dashboard" : "Start Exploring"}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="form-element text-center pt-6 border-t border-white/10">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "New to Tanzania Hub?" : "Already exploring with us?"}
              </p>
              <button
                type="button"
                onClick={handleToggleMode}
                className="mt-2 font-medium text-safari hover:text-safari-light transition-all duration-300 hover:underline text-sm"
              >
                {isLogin ? "Create your explorer account" : "Sign in to your account"}
              </button>
            </div>

            {/* Enhanced sample login data */}
            <div className="form-element">
              <div className="bg-gradient-to-r from-safari/10 to-ocean/10 p-4 rounded-xl border border-white/10">
                <p className="font-medium text-sm mb-3 text-foreground">🔑 Demo Credentials</p>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  {/* <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                    <span className="text-muted-foreground">Admin Access:</span>
                    <span className="font-mono text-safari">admin@tanzaniahub.com</span>
                  </div>  */}
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                    <span className="text-muted-foreground">User Access:</span>
                    <span className="font-mono text-ocean">user@example.com</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                    <span className="text-muted-foreground">Password:</span>
                    <span className="font-mono">any 6+ chars</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}