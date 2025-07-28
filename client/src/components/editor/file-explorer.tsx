import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Folder, 
  FolderOpen, 
  File, 
  Plus, 
  Search, 
  MoreHorizontal,
  FileText,
  Code,
  Image,
  Settings
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@shared/schema";

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  size?: number;
  modified?: Date;
}

interface FileExplorerProps {
  project: Project | null;
  currentFile: string;
  onFileSelect: (path: string) => void;
  onFileCreate: (path: string, type: 'file' | 'folder') => void;
  onFileDelete: (path: string) => void;
}

export default function FileExplorer({ 
  project, 
  currentFile, 
  onFileSelect, 
  onFileCreate, 
  onFileDelete 
}: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewFileInput, setShowNewFileInput] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState("");

  // Mock file structure - in real app, this would come from project files
  const fileStructure: FileNode = {
    name: project?.name || "Project",
    type: 'folder',
    path: '',
    children: [
      {
        name: 'src',
        type: 'folder', 
        path: 'src',
        children: [
          { name: 'App.tsx', type: 'file', path: 'src/App.tsx', size: 2048 },
          { name: 'main.tsx', type: 'file', path: 'src/main.tsx', size: 512 },
          { name: 'index.css', type: 'file', path: 'src/index.css', size: 1024 },
          {
            name: 'components',
            type: 'folder',
            path: 'src/components',
            children: [
              { name: 'Button.tsx', type: 'file', path: 'src/components/Button.tsx', size: 768 },
              { name: 'Card.tsx', type: 'file', path: 'src/components/Card.tsx', size: 1200 },
            ]
          },
          {
            name: 'hooks',
            type: 'folder',
            path: 'src/hooks',
            children: [
              { name: 'useAuth.ts', type: 'file', path: 'src/hooks/useAuth.ts', size: 896 },
              { name: 'useApi.ts', type: 'file', path: 'src/hooks/useApi.ts', size: 1536 },
            ]
          }
        ]
      },
      {
        name: 'public',
        type: 'folder',
        path: 'public',
        children: [
          { name: 'index.html', type: 'file', path: 'public/index.html', size: 2048 },
          { name: 'favicon.ico', type: 'file', path: 'public/favicon.ico', size: 4096 },
        ]
      },
      { name: 'package.json', type: 'file', path: 'package.json', size: 1536 },
      { name: 'README.md', type: 'file', path: 'README.md', size: 2048 },
      { name: 'tsconfig.json', type: 'file', path: 'tsconfig.json', size: 512 },
    ]
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx':
      case 'jsx':
        return <Code className="h-4 w-4 text-blue-400" />;
      case 'ts':
      case 'js':
        return <Code className="h-4 w-4 text-yellow-400" />;
      case 'css':
      case 'scss':
        return <FileText className="h-4 w-4 text-purple-400" />;
      case 'html':
        return <Code className="h-4 w-4 text-orange-400" />;
      case 'json':
        return <Settings className="h-4 w-4 text-green-400" />;
      case 'md':
        return <FileText className="h-4 w-4 text-gray-400" />;
      case 'png':
      case 'jpg':
      case 'svg':
        return <Image className="h-4 w-4 text-pink-400" />;
      default:
        return <File className="h-4 w-4 text-gray-400" />;
    }
  };

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreateFile = (parentPath: string) => {
    if (newFileName.trim()) {
      const fullPath = parentPath ? `${parentPath}/${newFileName}` : newFileName;
      const isFolder = !newFileName.includes('.');
      onFileCreate(fullPath, isFolder ? 'folder' : 'file');
      setNewFileName("");
      setShowNewFileInput(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const renderFileNode = (node: FileNode, depth: number = 0): JSX.Element => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = node.path === currentFile;
    const matchesSearch = !searchQuery || 
      node.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch && node.type === 'file') return <></>;

    return (
      <div key={node.path}>
        <div
          className={`flex items-center py-1 px-2 hover:bg-muted/50 cursor-pointer rounded text-sm ${
            isSelected ? 'bg-primary/10 text-primary' : 'dyad-text'
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              onFileSelect(node.path);
            }
          }}
        >
          <div className="flex items-center flex-1 min-w-0">
            {node.type === 'folder' ? (
              isExpanded ? (
                <FolderOpen className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
              ) : (
                <Folder className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
              )
            ) : (
              <div className="mr-2 flex-shrink-0">{getFileIcon(node.name)}</div>
            )}
            <span className="truncate">{node.name}</span>
            {node.size && (
              <span className="text-xs dyad-text-muted ml-auto">
                {formatFileSize(node.size)}
              </span>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {node.type === 'folder' && (
                <>
                  <DropdownMenuItem onClick={() => setShowNewFileInput(node.path)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New File
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    const folderName = prompt("Folder name:");
                    if (folderName) onFileCreate(`${node.path}/${folderName}`, 'folder');
                  }}>
                    <Folder className="h-4 w-4 mr-2" />
                    New Folder
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => onFileDelete(node.path)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {showNewFileInput === node.path && (
          <div style={{ paddingLeft: `${(depth + 1) * 16 + 8}px` }} className="py-1">
            <Input
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="filename.ext"
              className="h-7 text-xs"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleCreateFile(node.path);
                if (e.key === 'Escape') setShowNewFileInput(null);
              }}
              onBlur={() => setShowNewFileInput(null)}
              autoFocus
            />
          </div>
        )}

        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children
              .filter(child => !searchQuery || 
                child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                child.type === 'folder'
              )
              .map(child => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-card border-r dyad-border flex flex-col">
      {/* Header */}
      <div className="p-3 border-b dyad-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium dyad-text text-sm">Explorer</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setShowNewFileInput('')}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2 top-2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-7 pl-7 text-xs"
          />
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-auto p-2">
        {renderFileNode(fileStructure)}
      </div>

      {/* Stats */}
      <div className="p-3 border-t dyad-border text-xs dyad-text-muted">
        <div className="flex justify-between">
          <span>Files: 12</span>
          <span>Size: 15.2 KB</span>
        </div>
      </div>
    </div>
  );
}