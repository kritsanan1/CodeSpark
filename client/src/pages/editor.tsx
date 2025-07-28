import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import CodeEditor from "@/components/editor/code-editor";
import AIPanel from "@/components/editor/ai-panel";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";

export default function Editor() {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentFile, setCurrentFile] = useState<string>("src/App.tsx");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock current user - in real app, this would come from auth context
  const currentUserId = "mock-user-id";

  const { data: projects } = useQuery({
    queryKey: ["/api/projects"],
    queryFn: async () => {
      const response = await fetch(`/api/projects?userId=${currentUserId}`);
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json() as Promise<Project[]>;
    },
  });

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        projects={projects || []}
        currentProject={currentProject}
        onProjectSelect={setCurrentProject}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          currentProject={currentProject}
          currentFile={currentFile}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <CodeEditor 
            project={currentProject}
            currentFile={currentFile}
            onFileChange={setCurrentFile}
          />
          <AIPanel 
            project={currentProject}
            currentFile={currentFile}
          />
        </div>
      </div>
    </div>
  );
}
