import { useState, useEffect } from "react";
import { Search, Calendar, User, FileText, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: string;
  type: "task" | "event" | "user" | "file" | "message";
  title: string;
  description: string;
  url: string;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    type: "task",
    title: "Design user interface for login screen",
    description: "Create wireframes and mockups for the authentication flow",
    url: "/tasks",
  },
  {
    id: "2",
    type: "event",
    title: "Figma Fridays",
    description: "Weekly design review meeting",
    url: "/calendar",
  },
  {
    id: "3",
    type: "user",
    title: "Krish Prajapati",
    description: "Product Manager",
    url: "/collaborate",
  },
  {
    id: "4",
    type: "task",
    title: "Implement REST API endpoints",
    description: "Build backend services for user management",
    url: "/tasks",
  },
  {
    id: "5",
    type: "message",
    title: "Project Timeline Discussion",
    description: "Team chat about upcoming deadlines",
    url: "/collaborate",
  },
];

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(mockResults);
    }
  }, [query]);

  const getIcon = (type: string) => {
    switch (type) {
      case "task":
        return <FileText className="h-4 w-4" />;
      case "event":
        return <Calendar className="h-4 w-4" />;
      case "user":
        return <User className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    navigate(result.url);
  };

  return (
    <>
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search everything... (⌘K)"
          className="pl-10 w-64 bg-muted/50 border-border transition-all duration-200 focus:w-72 focus:shadow-soft cursor-pointer"
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search everything..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent">
            {results.slice(0, 8).map((result) => (
              <CommandItem
                key={result.id}
                onSelect={() => handleSelect(result)}
                className="flex items-center gap-3 p-3"
              >
                {getIcon(result.type)}
                <div className="flex-1">
                  <div className="font-medium">{result.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {result.description}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {result.type}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}