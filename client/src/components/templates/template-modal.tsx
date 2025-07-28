import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";
import { Template } from "@shared/schema";
import { templateService } from "@/lib/template-service";
import { useToast } from "@/hooks/use-toast";

interface TemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TemplateModal({ open, onOpenChange }: TemplateModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: templates, isLoading } = useQuery({
    queryKey: ["/api/templates"],
    queryFn: async () => {
      const response = await fetch("/api/templates");
      if (!response.ok) throw new Error("Failed to fetch templates");
      return response.json() as Promise<Template[]>;
    },
    enabled: open,
  });

  const createProjectMutation = useMutation({
    mutationFn: async (template: Template) => {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${template.name} Project`,
          description: `Project created from ${template.name} template`,
          templateId: template.id,
          userId: "mock-user-id", // In real app, get from auth context
          files: template.files,
          settings: {}
        }),
      });
      if (!response.ok) throw new Error("Failed to create project");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Project created",
        description: "Your new project has been created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    },
  });

  const categories = [
    { id: "all", name: "All", icon: "fas fa-th-large" },
    { id: "frontend", name: "Frontend", icon: "fas fa-desktop" },
    { id: "backend", name: "Backend", icon: "fas fa-server" },
    { id: "fullstack", name: "Full Stack", icon: "fas fa-layer-group" },
    { id: "mobile", name: "Mobile", icon: "fas fa-mobile-alt" },
  ];

  const filteredTemplates = templates?.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] dyad-surface dyad-border">
        <DialogHeader>
          <DialogTitle className="dyad-text">Choose a Template</DialogTitle>
          <DialogDescription className="dyad-text-muted">
            Start your project with a pre-built template
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Template Grid */}
          <div className="max-h-[50vh] overflow-y-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-muted rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded w-full mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-muted-foreground/20 rounded w-16"></div>
                      <div className="h-6 bg-muted-foreground/20 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-muted/50 border dyad-border rounded-lg p-4 hover:bg-muted/70 transition-colors cursor-pointer"
                    onClick={() => createProjectMutation.mutate(template)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${templateService.getTemplateColor(template.tags as string[] || [])}`}>
                        <i className={`${templateService.getTemplateIcon(template.name)} text-white`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium dyad-text">{template.name}</h3>
                        <p className="text-xs dyad-text-muted mt-1">{template.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          {(template.tags as string[] || []).slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          <div className="flex items-center space-x-1 text-xs dyad-text-muted">
                            <Download className="h-3 w-3" />
                            <span>{template.downloads}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="dyad-text-muted">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-40" />
                  <p className="text-lg">No templates found</p>
                  <p className="text-sm">Try adjusting your search or filter criteria</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t dyad-border">
            <div className="text-sm dyad-text-muted">
              Need a custom template?{" "}
              <button className="text-primary hover:underline">
                Request one from the community
              </button>
            </div>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
