
import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Search, Bell, ChevronDown, Menu, X, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationCenter } from "@/components/NotificationCenter";
import { GlobalSearch } from "@/components/GlobalSearch";
import { ProfileDialog } from "@/components/ProfileDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const navigation = [
  { name: "Goal board", href: "/" },
  { name: "Groups", href: "/collaborate" },
  { name: "Resources", href: "/resources" },
  { name: "Showcase", href: "/showcase" },
  { name: "Settings", href: "/settings" },
];

interface LayoutProps {
  onLogout: () => void;
}

export function Layout({ onLogout }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleSignOut = () => {
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
    onLogout();
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold italic text-foreground transition-all duration-200 hover:scale-105 hover:text-primary">
              Roundtable
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
                    location.pathname === item.href
                      ? "bg-secondary text-secondary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search and User */}
          <div className="flex items-center gap-4">
            {/* Global Search */}
            <GlobalSearch />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <NotificationCenter />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 transition-all duration-200 hover:scale-105 focus:outline-none">
                <Avatar className="h-8 w-8 bg-gradient-primary transition-all duration-200 hover:shadow-soft">
                  <AvatarFallback className="bg-transparent text-white">
                    😎
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-2">
                <DropdownMenuItem asChild>
                  <ProfileDialog />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-muted transition-colors">
                    <ChevronDown className="mr-2 h-4 w-4 rotate-90" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/50 backdrop-blur-sm">
            <nav className="px-6 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Search */}
              <div className="pt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search"
                    className="pl-10 bg-muted/50 border-border"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
