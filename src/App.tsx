import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import "@/i18n";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CropPlanning from "./pages/CropPlanning";
import AiDoctor from "./pages/AiDoctor";
import Reports from "./pages/Reports";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AIChatbot from "./components/AIChatbot";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft text-primary">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/crop-planning" element={<ProtectedRoute><CropPlanning /></ProtectedRoute>} />
              <Route path="/ai-doctor" element={<ProtectedRoute><AiDoctor /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AIChatbot />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
