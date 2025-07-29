import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Code, Layers, Users, Settings, ChevronLeft, ChevronRight, Folder } from "lucide-react";
import { Project } from "@shared/schema";
import TemplateModal from "@/components/templates/template-modal";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  projects: Project[];
  currentProject: Project | null;
  onProjectSelect: (project: Project) => void;
}

export default function Sidebar({ collapsed, onToggle, projects, currentProject, onProjectSelect }: SidebarProps) {
  const [location] = useLocation();
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const navigationItems = [
    { path: "/editor", icon: Code, label: "Editor", active: location === "/" || location === "/editor" },
    { path: "/templates", icon: Layers, label: "Templates", active: location === "/templates" },
    { path: "/community", icon: Users, label: "Community", active: location === "/community" },
    { path: "/settings", icon: Settings, label: "Settings", active: location === "/settings" },
  ];

  // Mock recent projects data
  const recentProjects = projects.slice(0, 3);

  return (
    <>
      <div className={`${collapsed ? 'w-16' : 'w-64'} bg-card border-r dyad-border flex flex-col transition-all duration-300`}>
        {/* Logo & Brand */}
        <div className="p-4 border-b dyad-border">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 dyad-sidebar-gradient rounded-lg flex items-center justify-center">
                  <Code className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold dyad-text">Dyad</h1>
                  <p className="text-xs dyad-text-muted">AI App Builder</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* New Project Button */}
        <div className="p-4">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setShowTemplateModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            {!collapsed && "New Project"}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigationItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  item.active
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </div>
            </Link>
          ))}

          {!collapsed && recentProjects.length > 0 && (
            <div className="mt-8">
              <div className="text-xs font-medium dyad-text-muted mb-3 uppercase tracking-wide">
                Recent Projects
              </div>
              <div className="space-y-1">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg dyad-text-muted hover:dyad-text hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => onProjectSelect(project)}
                  >
                    <Folder className="h-4 w-4 text-accent" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{project.name}</div>
                      <div className="text-xs dyad-text-muted">
                        {project.description || "No description"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Status & User */}
        <div className="p-4 border-t dyad-border">
          {!collapsed && (
            <>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm dyad-text-muted">AI Model: Local</span>
              </div>
            </>
          )}
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 rounded-lg bg-muted/30`}>
            <Avatar className="h-6 w-6">
              <AvatarFallback className="dyad-accent-gradient text-white text-xs font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate dyad-text">John Doe</div>
                <div className="text-xs dyad-text-muted">Local Developer</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <TemplateModal 
        open={showTemplateModal}
        onOpenChange={setShowTemplateModal}
      />
    </>
  );
}
