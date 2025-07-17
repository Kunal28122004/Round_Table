import { Plus, ThumbsUp, ThumbsDown, MessageCircle, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const resources = [
  {
    title: "Short description",
    description: "Shared by @krisharj",
    image: "/api/placeholder/400/200"
  },
  {
    title: "Short description", 
    description: "Shared by @krisharj",
    image: "/api/placeholder/400/200"
  },
  {
    title: "Short description",
    description: "Shared by @krisharj", 
    image: "/api/placeholder/400/200"
  },
  {
    title: "Short description",
    description: "Shared by @krisharj",
    image: "/api/placeholder/400/200"
  },
  {
    title: "Short description",
    description: "Shared by @krisharj",
    image: "/api/placeholder/400/200"
  },
  {
    title: "Short description",
    description: "Shared by @krisharj",
    image: "/api/placeholder/400/200"
  }
];

export default function Resources() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold italic text-foreground">Resources</h1>
        <Button className="bg-dot-green text-white shadow-soft hover:shadow-lg transition-all duration-300 rounded-lg">
          <Plus className="mr-2 h-4 w-4" />
          Share resources
        </Button>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="bg-gradient-card shadow-card border-border/50 hover:shadow-soft transition-all duration-300">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-medium text-foreground">{resource.title}</h3>
              
              {/* Placeholder Image */}
              <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Image placeholder</span>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">{resource.description}</span>
              </div>
              
              <Button className="w-full bg-dot-blue text-white hover:bg-dot-blue/90 rounded-lg">
                Go through →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}