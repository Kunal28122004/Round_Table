import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

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
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleAuthSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            {/* Auth Routes */}
            <Route
              path="/auth"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Auth mode="signin" onLogin={handleAuthSuccess} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Auth mode="signup" onSignup={handleAuthSuccess} />
                )
              }
            />

            {/* Protected Routes */}
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

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
