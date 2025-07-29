import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, Share2, Folder, ChevronRight, Brain } from "lucide-react";
import { Project } from "@shared/schema";

interface TopBarProps {
  currentProject: Project | null;
  currentFile: string;
}

export default function TopBar({ currentProject, currentFile }: TopBarProps) {
  const handleSave = () => {
    // In a real app, this would save the current file
    console.log("Saving file:", currentFile);
  };

  const handleShare = () => {
    // In a real app, this would share the project
    console.log("Sharing project:", currentProject?.name);
  };

  return (
    <div className="h-14 bg-card border-b dyad-border flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 dyad-text-muted">
          <Folder className="h-4 w-4 text-accent" />
          <span className="text-sm">
            {currentProject?.name || "No Project Selected"}
          </span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-sm">{currentFile}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* AI Status */}
        <Badge variant="secondary" className="bg-secondary/10 border-secondary/20 text-secondary">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse mr-2"></div>
          AI Active
        </Badge>
        
        {/* File actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className="h-8 w-8 p-0"
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="h-8 w-8 p-0"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
