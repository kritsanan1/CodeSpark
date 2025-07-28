import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, Star, Filter } from "lucide-react";
import { Template } from "@shared/schema";
import { templateService } from "@/lib/template-service";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/layout/sidebar";

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: templates, isLoading } = useQuery({
    queryKey: ["/api/templates"],
    queryFn: async () => {
      const response = await fetch("/api/templates");
      if (!response.ok) throw new Error("Failed to fetch templates");
      return response.json() as Promise<Template[]>;
    },
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
    { id: "all", name: "All Templates", icon: "fas fa-th-large" },
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
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        projects={[]}
        currentProject={null}
        onProjectSelect={() => {}}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b dyad-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold dyad-text">Project Templates</h1>
              <p className="text-muted-foreground">Choose a template to start your new project</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
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
                  className="flex items-center space-x-2"
                >
                  <i className={`${category.icon} text-sm`} />
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted rounded mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-muted rounded w-16"></div>
                      <div className="h-6 bg-muted rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow dyad-surface dyad-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${templateService.getTemplateColor(template.tags as string[] || [])}`}>
                          <i className={`${templateService.getTemplateIcon(template.name)} text-white`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg dyad-text">{template.name}</CardTitle>
                          <div className="flex items-center space-x-2 text-sm dyad-text-muted">
                            <Download className="h-3 w-3" />
                            <span>{template.downloads} downloads</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="dyad-text-muted">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(template.tags as string[] || []).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => createProjectMutation.mutate(template)}
                      disabled={createProjectMutation.isPending}
                    >
                      {createProjectMutation.isPending ? "Creating..." : "Use Template"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <i className="fas fa-search text-4xl mb-4" />
                <p className="text-lg">No templates found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
