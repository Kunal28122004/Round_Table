
import { useState } from "react";
import { Apple, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface AuthProps {
  mode: "signin" | "signup";
  onLogin: () => void;
}

export default function Auth({ mode, onLogin }: AuthProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isSignUp = mode === "signup";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate authentication delay
    setTimeout(() => {
      toast({
        title: "Success",
        description: isSignUp ? "Account created successfully!" : "Welcome back!",
      });
      onLogin();
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Social Login",
      description: `${provider} login would be implemented here`,
    });
    // For demo purposes, we'll just log them in
    setTimeout(() => {
      onLogin();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-gradient-card shadow-soft border-border/50">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold italic text-foreground mb-2">
              RoundTable
            </h1>
            <p className="text-muted-foreground">
              {isSignUp ? "Create your account" : "Sign in to your account"}
            </p>
          </div>

          <div className="space-y-4">
            {/* Social Login Buttons */}
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 h-12 bg-background hover:bg-muted transition-colors"
              onClick={() => handleSocialLogin("Google")}
              type="button"
            >
              <Chrome className="h-5 w-5 text-blue-500" />
              <span className="text-foreground">Continue with Google</span>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 h-12 bg-background hover:bg-muted transition-colors"
              onClick={() => handleSocialLogin("Apple")}
              type="button"
            >
              <Apple className="h-5 w-5 text-foreground" />
              <span className="text-foreground">Continue with Apple</span>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 h-12 bg-background hover:bg-muted transition-colors"
              onClick={() => handleSocialLogin("Twitter")}
              type="button"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="text-foreground">Continue with Twitter</span>
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground bg-background px-2">OR</span>
              <Separator className="flex-1" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 bg-background border-border"
                  required
                />
              </div>

              {isSignUp && (
                <div>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-12 bg-background border-border"
                    required
                  />
                </div>
              )}

              <div>
                <Input
                  type="password"
                  name={isSignUp ? "confirmPassword" : "password"}
                  placeholder={isSignUp ? "Confirm password" : "Password"}
                  value={isSignUp ? formData.confirmPassword : formData.password}
                  onChange={handleInputChange}
                  className="h-12 bg-background border-border"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-dot-blue text-white hover:bg-dot-blue/90 shadow-soft transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : "Continue"}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                {isSignUp 
                  ? "Already have an account? " 
                  : "Don't have an account? "
                }
                <a 
                  href={isSignUp ? "/auth" : "/signup"} 
                  className="text-primary hover:underline font-medium"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
