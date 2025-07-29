import { useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import CodeEditor from "@/components/editor/code-editor";
import AIPanel from "@/components/editor/ai-panel";
import FileExplorer from "@/components/editor/file-explorer";
import Terminal from "@/components/editor/terminal";
import Minimap from "@/components/editor/minimap";
import DebuggerPanel from "@/components/debugging/debugger-panel";
import AdvancedAIFeatures from "@/components/ai/advanced-ai-features";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { 
  Terminal as TerminalIcon,
  Map,
  Bug,
  Brain,
  Folder,
  EyeOff,
  Eye,
  Code2,
  Activity
} from "lucide-react";
import CodeSnippets from "@/components/productivity/code-snippets";
import PerformanceMonitor from "@/components/monitoring/performance-monitor";

export default function Editor() {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentFile, setCurrentFile] = useState<string>("src/App.tsx");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showMinimap, setShowMinimap] = useState(true);
  const [showDebugger, setShowDebugger] = useState(false);
  const [showAdvancedAI, setShowAdvancedAI] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [code, setCode] = useState(`import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (user: User) => {
    console.log('User clicked:', user);
    // Handle user interaction
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Card key={user.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleUserClick(user)}>
            <CardHeader>
              <CardTitle className="text-lg">{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{user.email}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No users found
        </div>
      )}
    </div>
  );
}`);

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

  const handleFileSelect = (path: string) => {
    setCurrentFile(path);
  };

  const handleFileCreate = (path: string, type: 'file' | 'folder') => {
    console.log(`Creating ${type}:`, path);
    // Implementation would go here
  };

  const handleFileDelete = (path: string) => {
    console.log('Deleting:', path);
    // Implementation would go here
  };

  const handleLinClick = (lineNumber: number) => {
    console.log('Jump to line:', lineNumber);
    // Implementation would go here
  };

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
        
        {/* Advanced Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b dyad-border bg-muted/30">
          <div className="flex items-center space-x-2">
            <Button
              variant={showFileExplorer ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowFileExplorer(!showFileExplorer)}
            >
              <Folder className="h-4 w-4 mr-1" />
              Explorer
            </Button>
            <Button
              variant={showTerminal ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowTerminal(!showTerminal)}
            >
              <TerminalIcon className="h-4 w-4 mr-1" />
              Terminal
            </Button>
            <Button
              variant={showDebugger ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowDebugger(!showDebugger)}
            >
              <Bug className="h-4 w-4 mr-1" />
              Debug
            </Button>
            <Button
              variant={showAdvancedAI ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowAdvancedAI(!showAdvancedAI)}
            >
              <Brain className="h-4 w-4 mr-1" />
              AI Assistant
            </Button>
            <Button
              variant={showSnippets ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowSnippets(!showSnippets)}
            >
              <Code2 className="h-4 w-4 mr-1" />
              Snippets
            </Button>
            <Button
              variant={showPerformance ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowPerformance(!showPerformance)}
            >
              <Activity className="h-4 w-4 mr-1" />
              Monitor
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMinimap(!showMinimap)}
            >
              {showMinimap ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <Map className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          {/* File Explorer */}
          {showFileExplorer && (
            <FileExplorer
              project={currentProject}
              currentFile={currentFile}
              onFileSelect={handleFileSelect}
              onFileCreate={handleFileCreate}
              onFileDelete={handleFileDelete}
            />
          )}
          
          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 flex overflow-hidden">
              <CodeEditor 
                project={currentProject}
                currentFile={currentFile}
                onFileChange={setCurrentFile}
              />
              
              {/* Minimap */}
              {showMinimap && (
                <Minimap
                  code={code}
                  currentLine={15}
                  visibleRange={{ start: 5, end: 25 }}
                  onLineClick={handleLinClick}
                />
              )}
            </div>
            
            {/* Terminal */}
            <Terminal
              isVisible={showTerminal}
              onToggle={() => setShowTerminal(!showTerminal)}
              currentPath={currentProject?.name || "/project"}
            />
          </div>
          
          {/* AI Panel */}
          {!showAdvancedAI && (
            <AIPanel 
              project={currentProject}
              currentFile={currentFile}
            />
          )}
          
          {/* Advanced AI Features */}
          {showAdvancedAI && <AdvancedAIFeatures />}
          
          {/* Code Snippets */}
          {showSnippets && <CodeSnippets />}
          
          {/* Performance Monitor */}
          {showPerformance && <PerformanceMonitor />}
          
          {/* Debugger Panel */}
          {showDebugger && <DebuggerPanel />}
        </div>
      </div>
    </div>
  );
}
