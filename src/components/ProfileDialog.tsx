import { useState } from "react";
import { User, Mail, Shield, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function ProfileDialog() {
  const [open, setOpen] = useState(false);

  const profileData = {
    name: "Captain",
    email: "captain@dot.com",
    role: "Product Manager",
    department: "Product",
    joinDate: "January 2024",
    tasksCompleted: 47,
    projectsLed: 8,
    collaborations: 23,
  };

  const recentActivity = [
    "Completed 'Design user interface for login screen'",
    "Started 'Implement REST API endpoints'",
    "Joined 'Figma Fridays' meeting",
    "Updated project timeline",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-muted transition-colors">
          <User className="mr-2 h-4 w-4" />
          <span>View Profile</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Profile Overview</DialogTitle>
          <DialogDescription>
            View and manage your profile information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 bg-gradient-primary">
              <AvatarFallback className="bg-transparent text-white text-2xl">
                😎
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-muted-foreground">{profileData.role}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="outline">{profileData.department}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Joined {profileData.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Active since {profileData.joinDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-dot-green">
                  {profileData.tasksCompleted}
                </div>
                <div className="text-sm text-muted-foreground">Tasks Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-dot-blue">
                  {profileData.projectsLed}
                </div>
                <div className="text-sm text-muted-foreground">Projects Led</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-dot-purple">
                  {profileData.collaborations}
                </div>
                <div className="text-sm text-muted-foreground">Collaborations</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Recent Activity</h3>
              <div className="space-y-2">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/30"
                  >
                    <Star className="h-3 w-3 text-dot-orange" />
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-gradient-primary text-white">
              Edit Profile
            </Button>
            <Button variant="outline" className="flex-1">
              Export Data
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}