import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, Copy, Play } from "lucide-react";

interface TerminalOutput {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

interface TerminalProps {
  isVisible: boolean;
  onToggle: () => void;
  currentPath: string;
}

export default function Terminal({ isVisible, onToggle, currentPath }: TerminalProps) {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<TerminalOutput[]>([
    {
      id: '1',
      type: 'output',
      content: 'Welcome to Dyad Terminal v1.0.0',
      timestamp: new Date()
    },
    {
      id: '2', 
      type: 'output',
      content: 'Type "help" for available commands',
      timestamp: new Date()
    }
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add command to history
    setHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Add command to output
    const commandOutput: TerminalOutput = {
      id: Date.now().toString(),
      type: 'command',
      content: `$ ${trimmedCmd}`,
      timestamp: new Date()
    };

    setOutput(prev => [...prev, commandOutput]);

    // Simulate command execution
    const result = await simulateCommand(trimmedCmd);
    
    const resultOutput: TerminalOutput = {
      id: (Date.now() + 1).toString(),
      type: result.type,
      content: result.content,
      timestamp: new Date()
    };

    setOutput(prev => [...prev, resultOutput]);
    setCommand("");
  };

  const simulateCommand = async (cmd: string): Promise<{ type: 'output' | 'error', content: string }> => {
    const [command, ...args] = cmd.split(' ');
    
    switch (command.toLowerCase()) {
      case 'help':
        return {
          type: 'output',
          content: `Available commands:
  help          - Show this help message
  ls            - List directory contents
  pwd           - Print working directory
  cat <file>    - Display file contents
  npm <args>    - Run npm commands
  git <args>    - Run git commands
  clear         - Clear terminal
  echo <text>   - Echo text
  tree          - Show directory tree
  ps            - Show running processes
  whoami        - Display current user`
        };

      case 'ls':
        return {
          type: 'output',
          content: `src/          public/       package.json  README.md
components/   hooks/        tsconfig.json .gitignore
styles/       utils/        vite.config.ts`
        };

      case 'pwd':
        return {
          type: 'output',
          content: currentPath || '/home/project'
        };

      case 'whoami':
        return {
          type: 'output',
          content: 'developer'
        };

      case 'clear':
        setOutput([]);
        return { type: 'output', content: '' };

      case 'echo':
        return {
          type: 'output',
          content: args.join(' ')
        };

      case 'cat':
        if (!args[0]) {
          return { type: 'error', content: 'cat: missing file operand' };
        }
        return {
          type: 'output',
          content: `// Sample content of ${args[0]}
import React from 'react';

export default function Component() {
  return <div>Hello World</div>;
}`
        };

      case 'tree':
        return {
          type: 'output',
          content: `├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useApi.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── index.html
└── package.json`
        };

      case 'npm':
        if (args[0] === 'install' || args[0] === 'i') {
          return {
            type: 'output',
            content: `Installing packages...
✓ react@18.2.0
✓ typescript@4.9.0
✓ vite@4.3.0

Dependencies installed successfully!`
          };
        }
        if (args[0] === 'run') {
          return {
            type: 'output',
            content: `Running ${args[1] || 'dev'}...
> vite dev
Local:   http://localhost:5173/
Network: http://192.168.1.100:5173/`
          };
        }
        return {
          type: 'output',
          content: `npm ${args.join(' ')} executed successfully`
        };

      case 'git':
        if (args[0] === 'status') {
          return {
            type: 'output',
            content: `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified:   src/App.tsx
  modified:   src/components/Button.tsx

Untracked files:
  src/hooks/useNewFeature.ts`
          };
        }
        if (args[0] === 'log') {
          return {
            type: 'output',
            content: `commit a1b2c3d4e5f6 (HEAD -> main)
Author: Developer <dev@example.com>
Date:   ${new Date().toDateString()}

    Add new AI features

commit f6e5d4c3b2a1
Author: Developer <dev@example.com>
Date:   ${new Date(Date.now() - 86400000).toDateString()}

    Initial commit`
          };
        }
        return {
          type: 'output',
          content: `git ${args.join(' ')} executed successfully`
        };

      case 'ps':
        return {
          type: 'output',
          content: `PID    COMMAND
1234   node server.js
5678   vite dev
9101   npm run build
1121   dyad-ai-service`
        };

      default:
        return {
          type: 'error',
          content: `Command not found: ${command}. Type 'help' for available commands.`
        };
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(command);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setCommand("");
        } else {
          setHistoryIndex(newIndex);
          setCommand(history[newIndex]);
        }
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`bg-card border-t dyad-border ${isMinimized ? 'h-12' : 'h-80'} flex flex-col transition-all duration-200`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-2 border-b dyad-border bg-muted/30">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="h-4 w-4 dyad-text" />
          <span className="text-sm font-medium dyad-text">Terminal</span>
          <Badge variant="secondary" className="text-xs">
            bash
          </Badge>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={onToggle}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Terminal Output */}
          <div 
            ref={terminalRef}
            className="flex-1 overflow-auto p-3 font-mono text-sm dyad-code-bg dyad-text"
          >
            {output.map((item) => (
              <div 
                key={item.id} 
                className={`mb-1 ${
                  item.type === 'command' ? 'text-blue-400' : 
                  item.type === 'error' ? 'text-red-400' : 'dyad-text'
                }`}
              >
                <pre className="whitespace-pre-wrap font-mono">{item.content}</pre>
              </div>
            ))}
          </div>

          {/* Terminal Input */}
          <div className="p-3 border-t dyad-border dyad-code-bg">
            <div className="flex items-center space-x-2">
              <span className="text-green-400 font-mono text-sm">$</span>
              <Input
                ref={inputRef}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command..."
                className="flex-1 bg-transparent border-none p-0 h-auto font-mono text-sm dyad-text focus-visible:ring-0"
                autoComplete="off"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}