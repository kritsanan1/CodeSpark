import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  ArrowDown, 
  ArrowRight, 
  Bug,
  Circle,
  Eye,
  EyeOff,
  Trash2,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface Breakpoint {
  id: string;
  file: string;
  line: number;
  condition?: string;
  enabled: boolean;
}

interface Variable {
  name: string;
  value: any;
  type: string;
  scope: 'local' | 'global' | 'closure';
}

interface DebugSession {
  isRunning: boolean;
  isPaused: boolean;
  currentFile: string;
  currentLine: number;
  callStack: Array<{
    function: string;
    file: string;
    line: number;
  }>;
}

export default function DebuggerPanel() {
  const [session, setSession] = useState<DebugSession>({
    isRunning: false,
    isPaused: false,
    currentFile: 'src/App.tsx',
    currentLine: 42,
    callStack: [
      { function: 'handleClick', file: 'src/App.tsx', line: 42 },
      { function: 'onClick', file: 'src/components/Button.tsx', line: 15 },
      { function: 'main', file: 'src/main.tsx', line: 8 }
    ]
  });

  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>([
    { id: '1', file: 'src/App.tsx', line: 42, enabled: true },
    { id: '2', file: 'src/utils/api.ts', line: 18, condition: 'user.id === null', enabled: true },
    { id: '3', file: 'src/hooks/useAuth.ts', line: 25, enabled: false }
  ]);

  const [variables, setVariables] = useState<Variable[]>([
    { name: 'user', value: { id: 123, name: 'John Doe', email: 'john@example.com' }, type: 'Object', scope: 'local' },
    { name: 'isLoading', value: false, type: 'boolean', scope: 'local' },
    { name: 'count', value: 42, type: 'number', scope: 'local' },
    { name: 'items', value: ['item1', 'item2', 'item3'], type: 'Array', scope: 'local' },
    { name: 'config', value: { apiUrl: 'https://api.example.com', timeout: 5000 }, type: 'Object', scope: 'global' }
  ]);

  const [watchExpressions, setWatchExpressions] = useState<Array<{ expression: string; value: any; error?: string }>>([
    { expression: 'user.name', value: 'John Doe' },
    { expression: 'items.length', value: 3 },
    { expression: 'window.location.href', value: 'http://localhost:5173/' }
  ]);

  const [newWatchExpression, setNewWatchExpression] = useState('');

  const startDebugging = () => {
    setSession(prev => ({ ...prev, isRunning: true, isPaused: false }));
  };

  const pauseDebugging = () => {
    setSession(prev => ({ ...prev, isPaused: true }));
  };

  const stopDebugging = () => {
    setSession({ isRunning: false, isPaused: false, currentFile: '', currentLine: 0, callStack: [] });
  };

  const stepOver = () => {
    setSession(prev => ({ ...prev, currentLine: prev.currentLine + 1 }));
  };

  const stepInto = () => {
    // Simulate stepping into a function
    setSession(prev => ({
      ...prev,
      currentLine: 15,
      currentFile: 'src/components/Button.tsx',
      callStack: [
        { function: 'render', file: 'src/components/Button.tsx', line: 15 },
        ...prev.callStack
      ]
    }));
  };

  const toggleBreakpoint = (id: string) => {
    setBreakpoints(prev => 
      prev.map(bp => bp.id === id ? { ...bp, enabled: !bp.enabled } : bp)
    );
  };

  const removeBreakpoint = (id: string) => {
    setBreakpoints(prev => prev.filter(bp => bp.id !== id));
  };

  const addWatchExpression = () => {
    if (newWatchExpression.trim()) {
      try {
        // Simulate evaluation
        const value = eval(newWatchExpression.replace(/user\./, '({ id: 123, name: "John Doe" }).'));
        setWatchExpressions(prev => [...prev, { expression: newWatchExpression, value }]);
      } catch (error) {
        setWatchExpressions(prev => [...prev, { 
          expression: newWatchExpression, 
          value: null, 
          error: 'Cannot evaluate expression' 
        }]);
      }
      setNewWatchExpression('');
    }
  };

  const renderValue = (value: any): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'object') {
      return Array.isArray(value) ? `Array(${value.length})` : 'Object';
    }
    return String(value);
  };

  return (
    <div className="w-80 bg-card border-l dyad-border flex flex-col max-h-screen">
      {/* Debugger Header */}
      <div className="p-4 border-b dyad-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Bug className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold dyad-text">Debugger</h3>
          </div>
          <Badge variant={session.isRunning ? "default" : "secondary"}>
            {session.isRunning ? (session.isPaused ? 'Paused' : 'Running') : 'Stopped'}
          </Badge>
        </div>
        
        {/* Debug Controls */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={startDebugging}
            disabled={session.isRunning}
            className="h-8 w-8 p-0"
          >
            <Play className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={pauseDebugging}
            disabled={!session.isRunning || session.isPaused}
            className="h-8 w-8 p-0"
          >
            <Pause className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={stopDebugging}
            disabled={!session.isRunning}
            className="h-8 w-8 p-0"
          >
            <Square className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={stepOver}
            disabled={!session.isPaused}
            className="h-8 w-8 p-0"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={stepInto}
            disabled={!session.isPaused}
            className="h-8 w-8 p-0"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={!session.isPaused}
            className="h-8 w-8 p-0"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Call Stack */}
        {session.isRunning && (
          <Card className="m-4 mb-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm dyad-text">Call Stack</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {session.callStack.map((frame, index) => (
                  <div 
                    key={index}
                    className={`text-xs p-2 rounded cursor-pointer transition-colors ${
                      index === 0 ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50 dyad-text'
                    }`}
                  >
                    <div className="font-medium">{frame.function}</div>
                    <div className="dyad-text-muted">{frame.file}:{frame.line}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Variables */}
        <Card className="m-4 mb-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm dyad-text">Variables</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {variables.map((variable, index) => (
                <div key={index} className="text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium dyad-text">{variable.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {variable.scope}
                    </Badge>
                  </div>
                  <div className="dyad-text-muted mt-1">
                    <span className="text-blue-400">{variable.type}</span>: {renderValue(variable.value)}
                  </div>
                  {typeof variable.value === 'object' && variable.value !== null && (
                    <div className="ml-4 mt-1 text-xs dyad-text-muted">
                      {Object.entries(variable.value).slice(0, 3).map(([key, val]) => (
                        <div key={key}>
                          {key}: {renderValue(val)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Watch Expressions */}
        <Card className="m-4 mb-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm dyad-text">Watch</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 mb-3">
              {watchExpressions.map((watch, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium dyad-text truncate">{watch.expression}</div>
                    <div className={watch.error ? 'text-red-400' : 'dyad-text-muted'}>
                      {watch.error || renderValue(watch.value)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setWatchExpressions(prev => prev.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex space-x-1">
              <Input
                placeholder="Expression to watch"
                value={newWatchExpression}
                onChange={(e) => setNewWatchExpression(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addWatchExpression()}
                className="h-7 text-xs"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={addWatchExpression}
                className="h-7 w-7 p-0"
              >
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Breakpoints */}
        <Card className="m-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm dyad-text">Breakpoints</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {breakpoints.map((breakpoint) => (
                <div key={breakpoint.id} className="flex items-center space-x-2 text-xs">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => toggleBreakpoint(breakpoint.id)}
                  >
                    <Circle 
                      className={`h-3 w-3 ${
                        breakpoint.enabled ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`} 
                    />
                  </Button>
                  <div className="flex-1 min-w-0">
                    <div className="dyad-text font-medium truncate">
                      {breakpoint.file}:{breakpoint.line}
                    </div>
                    {breakpoint.condition && (
                      <div className="dyad-text-muted">if: {breakpoint.condition}</div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => removeBreakpoint(breakpoint.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}