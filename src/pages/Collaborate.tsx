
import { Plus, MessageCircle, Users, Target, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CreateSpaceDialog } from "@/components/CreateSpaceDialog";
import { JoinSpaceDialog } from "@/components/JoinSpaceDialog";
import { AddGoalDialog } from "@/components/AddGoalDialog";
import { ShareResourceDialog } from "@/components/ShareResourceDialog";

const spaces = [
  {
    title: "Saturday hangouts",
    description: "A curated circle for purposeful learning and building",
    members: ["Ashutosh", "Ayush", "Bhaviya", "and 29 others"],
    avatarColors: ["bg-dot-purple", "bg-dot-blue", "bg-dot-green"]
  },
  {
    title: "Saturday hangouts", 
    description: "A curated circle for purposeful learning and building",
    members: ["Ashutosh", "Ayush", "Bhaviya", "and 29 others"],
    avatarColors: ["bg-dot-pink", "bg-dot-orange", "bg-dot-blue"]
  },
  {
    title: "Saturday hangouts",
    description: "A curated circle for purposeful learning and building", 
    members: ["Ashutosh", "Ayush", "Bhaviya", "and 29 others"],
    avatarColors: ["bg-dot-orange", "bg-dot-green", "bg-dot-purple"]
  },
  {
    title: "Saturday hangouts",
    description: "A curated circle for purposeful learning and building",
    members: ["Ashutosh", "Ayush", "Bhaviya", "and 29 others"],
    avatarColors: ["bg-dot-blue", "bg-dot-pink", "bg-dot-orange"]
  },
  {
    title: "Saturday hangouts",
    description: "A curated circle for purposeful learning and building",
    members: ["Ashutosh", "Ayush", "Bhaviya", "and 29 others"],
    avatarColors: ["bg-dot-green", "bg-dot-purple", "bg-dot-pink"]
  },
  {
    title: "Saturday hangouts",
    description: "A curated circle for purposeful learning and building",
    members: ["Ashutosh", "Ayush", "Bhaviya", "and 29 others"],
    avatarColors: ["bg-dot-purple", "bg-dot-orange", "bg-dot-blue"]
  }
];

const buddies = [
  { name: "Kunal Chauhan", role: "Developer", status: "chat", avatar: "bg-dot-blue" },
  { name: "Krish Prajapati", role: "Designer", status: "online", avatar: "bg-dot-pink" },
  { name: "Dnyanesh", role: "Developer", status: "chat", avatar: "bg-dot-green" },
  { name: "Jay Nirmal", role: "Designer", status: "chat", avatar: "bg-dot-orange" },
  { name: "Srujal Shah", role: "Content Writer ", status: "chat", avatar: "bg-dot-purple" }
];

export default function Collaborate() {
  const handleAddGoal = (goalData: any) => {
    console.log("Adding goal:", goalData);
    // Handle goal creation logic here
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold italic text-foreground">Spaces created by you</h1>
        <div className="flex flex-wrap gap-2">
          <CreateSpaceDialog>
            <Button className="bg-dot-green text-white shadow-soft hover:shadow-lg transition-all duration-300 rounded-lg">
              <Plus className="mr-2 h-4 w-4" />
              Create space
            </Button>
          </CreateSpaceDialog>
          <JoinSpaceDialog>
            <Button variant="outline" className="bg-dot-blue text-white hover:bg-dot-blue/90 border-dot-blue rounded-lg">
              <Users className="mr-2 h-4 w-4" />
              Join space
            </Button>
          </JoinSpaceDialog>
          <AddGoalDialog onAddGoal={handleAddGoal}>
            <Button variant="outline" className="border-border hover:bg-muted rounded-lg">
              <Target className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </AddGoalDialog>
          <ShareResourceDialog>
            <Button variant="outline" className="border-border hover:bg-muted rounded-lg">
              <Share2 className="mr-2 h-4 w-4" />
              Share Resource
            </Button>
          </ShareResourceDialog>
        </div>
      </div>

      {/* Spaces Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space, index) => (
          <Card key={index} className="bg-gradient-card shadow-card border-border/50 hover:shadow-soft transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6">
               {/* Avatar */}
               <div className="mb-4">
                 <Avatar className="h-12 w-12 bg-dot-pink group-hover:scale-105 transition-transform">
                   <AvatarFallback className="bg-transparent text-white">
                     😎
                   </AvatarFallback>
                 </Avatar>
               </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-foreground">{space.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {space.description}
                </p>

                {/* Member Avatars */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {space.avatarColors.map((color, avatarIndex) => (
                      <Avatar key={avatarIndex} className={`h-6 w-6 ${color} border-2 border-background`}>
                        <AvatarFallback className="bg-transparent text-white text-xs">
                          😎
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    {space.members.join(', ')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Your Buddies Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold italic text-foreground">Your buddies</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 max-w-2xl">
          {buddies.map((buddy, index) => (
            <Card key={index} className="bg-gradient-card shadow-card border-border/50 hover:shadow-soft transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-10 w-10 ${buddy.avatar}`}>
                      <AvatarFallback className="bg-transparent text-white">
                        😎
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{buddy.name}</div>
                      <div className="text-xs text-muted-foreground">{buddy.role}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {buddy.status === "online" ? (
                      <Badge className="bg-dot-green text-white border-dot-green/30">
                        Online
                      </Badge>
                    ) : (
                      <Button size="sm" className="bg-dot-blue text-white hover:bg-dot-blue/90">
                        <MessageCircle className="mr-1 h-3 w-3" />
                        Chat
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 bg-card shadow-soft rounded-full px-4 py-2 border border-border">
          <Avatar className="h-6 w-6 bg-muted">
            <AvatarFallback className="text-xs">💬</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">Type here...</span>
        </div>
      </div>
    </div>
  );
}
