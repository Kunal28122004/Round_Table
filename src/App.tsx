
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Collaborate from "./pages/Collaborate";
import Resources from "./pages/Resources";
import Showcase from "./pages/Showcase";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // State to track authentication
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already logged in from localStorage
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/auth" 
              element={
                isAuthenticated ? 
                <Navigate to="/" replace /> : 
                <Auth mode="signin" onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? 
                <Navigate to="/" replace /> : 
                <Auth mode="signup" onLogin={handleLogin} />
              } 
            />
            {isAuthenticated ? (
              <Route path="/" element={<Layout onLogout={handleLogout} />}>
                <Route index element={<Dashboard />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="collaborate" element={<Collaborate />} />
                <Route path="resources" element={<Resources />} />
                <Route path="showcase" element={<Showcase />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            ) : (
              <Route path="/" element={<Navigate to="/auth" replace />} />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
