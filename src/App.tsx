import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
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

  if (isLoading) {
    return <TourismLoader />;
  }

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={
          <Suspense fallback={<TourismLoader />}>
            <Auth />
          </Suspense>
        } />
        <Route path="/dashboard/*" element={
          <Suspense fallback={<TourismLoader />}>
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
