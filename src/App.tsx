import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import { UserProvider, useUser } from "@/contexts/UserContext";
import TourismLoader from "@/components/TourismLoader";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const queryClient = new QueryClient();

function AppContent() {
  const { isLoading, isAuthenticated } = useUser();
  const location = useLocation();
  const hideNavbar = location.pathname === '/auth' || isAuthenticated;
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  // Only show loader on initial page load, not on navigation
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('app-loaded');
    if (hasLoaded) {
      setShowInitialLoader(false);
    } else {
      const timer = setTimeout(() => {
        setShowInitialLoader(false);
        sessionStorage.setItem('app-loaded', 'true');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (showInitialLoader && !sessionStorage.getItem('app-loaded')) {
    return <TourismLoader />;
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Auth />
          </Suspense>
        } />
        <Route path="/dashboard/*" element={
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Dashboard />
          </Suspense>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
