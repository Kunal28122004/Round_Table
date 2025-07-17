import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface JoinSpaceDialogProps {
  children: React.ReactNode;
}

export function JoinSpaceDialog({ children }: JoinSpaceDialogProps) {
  const [spaceCode, setSpaceCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Joining space with code:", spaceCode);
    // Handle space joining
  };

  const handleRequestToJoin = () => {
    console.log("Requesting to join space");
    // Handle join request
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-sm bg-card border-border">
        <div className="p-6">
          <h2 className="text-2xl font-light italic text-foreground mb-8">Join space</h2>
          
          <div className="space-y-6">
            {/* Space Code Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Enter space code"
                  value={spaceCode}
                  onChange={(e) => setSpaceCode(e.target.value)}
                  className="h-12 bg-background border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-dot-blue text-white hover:bg-dot-blue/90 rounded-xl text-base font-medium"
              >
                Continue
              </Button>
            </form>

            {/* Separator */}
            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            {/* Request to Join */}
            <Button
              onClick={handleRequestToJoin}
              variant="outline"
              className="w-full h-12 bg-background border-border text-foreground hover:bg-muted rounded-xl text-base font-medium"
            >
              Request to join
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}