import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // For demo purposes, redirect to dashboard
    // In a real app, check authentication status
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold italic text-foreground mb-4">Roundtable</h1>
        <p className="text-xl text-muted-foreground">Loading your workspace...</p>
      </div>
    </div>
  );
};

export default Index;
