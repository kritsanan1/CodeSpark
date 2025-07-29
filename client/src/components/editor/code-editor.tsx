import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Project } from "@shared/schema";
import FileTabs from "./file-tabs";

interface CodeEditorProps {
  project: Project | null;
  currentFile: string;
  onFileChange: (file: string) => void;
}

export default function CodeEditor({ project, currentFile, onFileChange }: CodeEditorProps) {
  const [openFiles, setOpenFiles] = useState<string[]>(["src/App.tsx", "src/index.css", "package.json"]);
  const editorRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    // Simulate loading file content
    if (project && currentFile) {
      const files = project.files as Record<string, string> || {};
      const fileContent = files[currentFile] || getDefaultFileContent(currentFile);
      setCode(fileContent);
    } else {
      setCode(getDefaultFileContent(currentFile));
    }
  }, [project, currentFile]);

  const getDefaultFileContent = (fileName: string): string => {
    if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) {
      return `import React from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  return (
    <Card className="max-w-sm mx-auto">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-xl font-bold text-primary">\${price}</p>
        <Button className="w-full mt-4">Add to Cart</Button>
      </div>
    </Card>
  );
};`;
    } else if (fileName.endsWith('.css')) {
      return `/* Global styles */
body {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}`;
    } else if (fileName === 'package.json') {
      return `{
  "name": "react-project",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^4.9.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}`;
    }
    return "// Start coding here...";
  };

  const getFileIcon = (fileName: string): string => {
    if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) return 'fab fa-react text-blue-400';
    if (fileName.endsWith('.ts') || fileName.endsWith('.js')) return 'fab fa-js-square text-yellow-400';
    if (fileName.endsWith('.css')) return 'fab fa-css3-alt text-blue-400';
    if (fileName.endsWith('.json')) return 'fas fa-code text-green-400';
    return 'fas fa-file-code text-gray-400';
  };

  const closeFile = (fileName: string) => {
    const newOpenFiles = openFiles.filter(f => f !== fileName);
    setOpenFiles(newOpenFiles);
    
    if (fileName === currentFile && newOpenFiles.length > 0) {
      onFileChange(newOpenFiles[0]);
    }
  };

  const renderSyntaxHighlightedCode = (code: string): JSX.Element => {
    const lines = code.split('\n');
    return (
      <div className="font-mono text-sm leading-6">
        {lines.map((line, index) => (
          <div key={index} className="flex">
            <div className="w-16 text-right pr-4 text-muted-foreground select-none">
              {index + 1}
            </div>
            <div 
              className="flex-1 min-w-0"
              dangerouslySetInnerHTML={{ 
                __html: highlightSyntax(line) 
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  const highlightSyntax = (line: string): string => {
    // Simple syntax highlighting
    return line
      .replace(/(import|export|const|let|var|function|class|interface|type|return|if|else|for|while)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/(\b\d+\b)/g, '<span class="text-blue-400">$1</span>')
      .replace(/(["'].*?["'])/g, '<span class="text-green-400">$1</span>')
      .replace(/(\/\/.*$)/g, '<span class="text-gray-500">$1</span>')
      .replace(/(\/\*.*?\*\/)/g, '<span class="text-gray-500">$1</span>')
      .replace(/([{}()[\]])/g, '<span class="text-gray-300">$1</span>')
      .replace(/(<\/?[^>]+>)/g, '<span class="text-red-400">$1</span>');
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* File Tabs */}
      <FileTabs 
        openFiles={openFiles}
        currentFile={currentFile}
        onFileSelect={onFileChange}
        onFileClose={closeFile}
        getFileIcon={getFileIcon}
      />

      {/* Code Editor Interface */}
      <div className="flex-1 relative dyad-code-bg">
        <div className="absolute inset-0 overflow-auto p-4">
          {renderSyntaxHighlightedCode(code)}
        </div>
        
        {/* AI Suggestion Overlay */}
        {currentFile.endsWith('.tsx') && (
          <div className="absolute top-80 left-20">
            <div className="bg-secondary/10 border border-secondary/20 rounded px-3 py-2 max-w-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-xs text-secondary font-medium">
                  AI Suggestion: Add onClick handler
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
