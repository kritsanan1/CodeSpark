import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Zap, 
  Code, 
  FileText, 
  Search,
  Lightbulb,
  Target,
  Cpu,
  Sparkles,
  MessageSquare,
  TestTube,
  RefreshCw
} from "lucide-react";

interface AIAnalysisResult {
  type: 'suggestion' | 'warning' | 'optimization' | 'bug' | 'refactor';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  code?: string;
  line?: number;
  confidence: number;
}

interface CodeGenRequest {
  prompt: string;
  context: string;
  language: string;
  framework?: string;
}

export default function AdvancedAIFeatures() {
  const [selectedFeature, setSelectedFeature] = useState<string>('suggestions');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AIAnalysisResult[]>([
    {
      type: 'optimization',
      severity: 'medium',
      title: 'Consider using React.memo for performance',
      description: 'The UserProfile component re-renders frequently. Wrapping it with React.memo could improve performance.',
      line: 15,
      confidence: 85
    },
    {
      type: 'suggestion',
      severity: 'low',
      title: 'Extract custom hook',
      description: 'The user authentication logic could be extracted into a custom useAuth hook for better reusability.',
      line: 42,
      confidence: 92
    },
    {
      type: 'warning',
      severity: 'high',
      title: 'Potential memory leak',
      description: 'Event listener is not being cleaned up in useEffect. This could cause memory leaks.',
      line: 78,
      confidence: 78
    }
  ]);

  const [codeGenRequest, setCodeGenRequest] = useState<CodeGenRequest>({
    prompt: '',
    context: '',
    language: 'typescript',
    framework: 'react'
  });

  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const features = [
    {
      id: 'suggestions',
      name: 'Smart Suggestions',
      icon: Lightbulb,
      description: 'AI-powered code suggestions and improvements'
    },
    {
      id: 'generation',
      name: 'Code Generation',
      icon: Code,
      description: 'Generate code from natural language descriptions'
    },
    {
      id: 'analysis',
      name: 'Code Analysis',
      icon: Search,
      description: 'Deep analysis of code quality and patterns'
    },
    {
      id: 'refactoring',
      name: 'Smart Refactoring',
      icon: RefreshCw,
      description: 'Intelligent code refactoring suggestions'
    },
    {
      id: 'testing',
      name: 'Test Generation',
      icon: TestTube,
      description: 'Automatically generate unit tests'
    },
    {
      id: 'chat',
      name: 'AI Assistant',
      icon: MessageSquare,
      description: 'Interactive AI coding assistant'
    }
  ];

  const runCodeAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add new analysis results
    const newResults: AIAnalysisResult[] = [
      {
        type: 'bug',
        severity: 'high',
        title: 'Undefined variables detected',
        description: 'Variable "userData" is used but never defined in the handleSubmit function.',
        line: 126,
        confidence: 95
      },
      {
        type: 'refactor',
        severity: 'medium',
        title: 'Large component detected',
        description: 'The Dashboard component has 200+ lines. Consider breaking it into smaller components.',
        line: 1,
        confidence: 88
      }
    ];
    
    setAnalysisResults(prev => [...newResults, ...prev]);
    setIsAnalyzing(false);
  };

  const generateCode = async () => {
    if (!codeGenRequest.prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI code generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock code based on prompt
    const mockCode = `// Generated code based on: "${codeGenRequest.prompt}"
import React, { useState, useEffect } from 'react';

interface ${codeGenRequest.prompt.includes('user') ? 'User' : 'Data'}Props {
  id: string;
  name: string;
  ${codeGenRequest.prompt.includes('email') ? 'email: string;' : ''}
}

export default function Generated${codeGenRequest.prompt.includes('component') ? 'Component' : 'Hook'}() {
  const [data, setData] = useState<${codeGenRequest.prompt.includes('user') ? 'User' : 'Data'}Props | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ${codeGenRequest.prompt}
    const fetchData = async () => {
      try {
        setLoading(true);
        // Implementation would go here
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div>
      <h2>{data.name}</h2>
      {/* Add more UI elements based on your requirements */}
    </div>
  );
}`;

    setGeneratedCode(mockCode);
    setIsGenerating(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return <Lightbulb className="h-4 w-4" />;
      case 'warning': return <Target className="h-4 w-4" />;
      case 'optimization': return <Zap className="h-4 w-4" />;
      case 'bug': return <Target className="h-4 w-4" />;
      case 'refactor': return <RefreshCw className="h-4 w-4" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case 'suggestions':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold dyad-text">Code Analysis Results</h3>
              <Button onClick={runCodeAnalysis} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Cpu className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Run Analysis
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-3">
              {analysisResults.map((result, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={getSeverityColor(result.severity)}>
                          {getTypeIcon(result.type)}
                        </div>
                        <div>
                          <CardTitle className="text-sm dyad-text">{result.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {result.type}
                            </Badge>
                            <Badge variant={result.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                              {result.severity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {result.line && (
                          <div className="text-xs dyad-text-muted">Line {result.line}</div>
                        )}
                        <div className="text-xs dyad-text-muted">{result.confidence}% confidence</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm dyad-text-muted mb-3">{result.description}</p>
                    {result.code && (
                      <div className="bg-muted p-3 rounded text-xs font-mono">
                        <code>{result.code}</code>
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <Progress value={result.confidence} className="w-24 h-2" />
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          Apply Fix
                        </Button>
                        <Button variant="ghost" size="sm">
                          Ignore
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'generation':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold dyad-text">Code Generation</h3>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm dyad-text">Describe what you want to build</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="E.g., Create a user profile component with avatar, name, email, and edit functionality"
                  value={codeGenRequest.prompt}
                  onChange={(e) => setCodeGenRequest(prev => ({ ...prev, prompt: e.target.value }))}
                  className="min-h-20"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium dyad-text">Language</label>
                    <Input
                      value={codeGenRequest.language}
                      onChange={(e) => setCodeGenRequest(prev => ({ ...prev, language: e.target.value }))}
                      placeholder="typescript"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium dyad-text">Framework</label>
                    <Input
                      value={codeGenRequest.framework || ''}
                      onChange={(e) => setCodeGenRequest(prev => ({ ...prev, framework: e.target.value }))}
                      placeholder="react"
                    />
                  </div>
                </div>

                <Button onClick={generateCode} disabled={isGenerating} className="w-full">
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Code className="h-4 w-4 mr-2" />
                      Generate Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {generatedCode && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm dyad-text">Generated Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-xs font-mono overflow-auto max-h-96 dyad-text">
                      <code>{generatedCode}</code>
                    </pre>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Insert at Cursor
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Code className="h-4 w-4 mr-2" />
                      Create New File
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-12 dyad-text-muted">
            <div className="mx-auto w-24 h-24 mb-4 bg-muted rounded-full flex items-center justify-center">
              <Brain className="h-12 w-12" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Advanced AI Feature</h3>
            <p>This feature is coming soon. Stay tuned for powerful AI capabilities!</p>
          </div>
        );
    }
  };

  return (
    <div className="w-96 bg-card border-l dyad-border flex flex-col max-h-screen">
      {/* Header */}
      <div className="p-4 border-b dyad-border">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="font-semibold dyad-text">AI Assistant</h2>
          <Badge variant="outline" className="text-xs">Beta</Badge>
        </div>

        {/* Feature Navigation */}
        <div className="grid grid-cols-2 gap-2">
          {features.map((feature) => (
            <Button
              key={feature.id}
              variant={selectedFeature === feature.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedFeature(feature.id)}
              className="h-auto p-2 flex flex-col items-center text-center"
            >
              <feature.icon className="h-4 w-4 mb-1" />
              <span className="text-xs">{feature.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Feature Content */}
      <div className="flex-1 overflow-auto p-4">
        {renderFeatureContent()}
      </div>
    </div>
  );
}