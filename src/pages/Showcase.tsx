import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShareShowcaseDialog } from "@/components/ShareShowcaseDialog";

const projects = [
  {
    title: "Project title",
    description: "Project description",
    creator: "Creator",
    image: "/api/placeholder/400/300"
  },
  {
    title: "Project title",
    description: "Project description", 
    creator: "Creator",
    image: "/api/placeholder/400/300"
  },
  {
    title: "Project title",
    description: "Project description",
    creator: "Creator", 
    image: "/api/placeholder/400/300"
  }
];

export default function Showcase() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold italic text-foreground">Showcase</h1>
        <ShareShowcaseDialog>
          <Button className="bg-dot-green text-white shadow-soft hover:shadow-lg transition-all duration-300 rounded-lg">
            <Plus className="mr-2 h-4 w-4" />
            Showcase your work
          </Button>
        </ShareShowcaseDialog>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="bg-gradient-card shadow-card border-border/50 hover:shadow-soft transition-all duration-300 max-w-2xl">
            <CardContent className="p-6 space-y-4">
              {/* Project Image */}
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Project preview</span>
              </div>
              
              {/* Project Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{project.creator}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}