import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Send, Lightbulb, Code, AlertTriangle, Zap } from "lucide-react";
import { Project } from "@shared/schema";
import { aiService, AIMessage, AISuggestion } from "@/lib/ai-service";
import { useToast } from "@/hooks/use-toast";

interface AIPanelProps {
  project: Project | null;
  currentFile: string;
}

export default function AIPanel({ project, currentFile }: AIPanelProps) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load existing messages and suggestions
    setMessages(aiService.getMessages());
    setSuggestions(aiService.getSuggestions());
    
    // Generate initial suggestions for the current file
    if (currentFile) {
      generateInitialSuggestions();
    }
  }, [currentFile]);

  const generateInitialSuggestions = async () => {
    try {
      const mockCode = `import React from 'react';
      
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
      
      const newSuggestions = await aiService.generateSuggestions(mockCode, currentFile);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error("Failed to generate suggestions:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setIsLoading(true);
    try {
      const response = await aiService.sendMessage(inputMessage);
      setMessages(aiService.getMessages());
      setInputMessage("");
      
      if (response.suggestions) {
        setSuggestions(prev => [...prev, ...response.suggestions!]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message to AI assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applySuggestion = (suggestion: AISuggestion) => {
    const success = aiService.applySuggestion(suggestion.id);
    if (success) {
      toast({
        title: "Suggestion Applied",
        description: "The AI suggestion has been applied to your code.",
      });
      setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'code': return Code;
      case 'improvement': return Lightbulb;
      case 'fix': return AlertTriangle;
      case 'performance': return Zap;
      default: return Lightbulb;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'code': return 'from-blue-500 to-cyan-500';
      case 'improvement': return 'from-green-500 to-teal-500';
      case 'fix': return 'from-red-500 to-orange-500';
      case 'performance': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="w-80 bg-card border-l dyad-border flex flex-col">
      {/* AI Panel Header */}
      <div className="p-4 border-b dyad-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Brain className="h-3 w-3 text-white" />
            </div>
            <h3 className="font-semibold dyad-text">AI Assistant</h3>
          </div>
          <Badge variant="secondary" className="bg-secondary/10 border-secondary/20 text-secondary">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse mr-1"></div>
            Active
          </Badge>
        </div>
      </div>

      {/* AI Chat Interface */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* AI Suggestions */}
          <div className="space-y-3">
            {suggestions.map((suggestion) => {
              const IconComponent = getSuggestionIcon(suggestion.type);
              const colorClass = getSuggestionColor(suggestion.type);
              
              return (
                <Card key={suggestion.id} className="bg-card/50 border dyad-border">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-2">
                      <div className={`w-6 h-6 bg-gradient-to-br ${colorClass} rounded flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <IconComponent className="h-3 w-3 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm dyad-text mb-2">{suggestion.message}</p>
                        {suggestion.codeSnippet && (
                          <div className="dyad-code-bg rounded p-2 text-xs font-mono mb-2 overflow-x-auto">
                            <code className="dyad-text">{suggestion.codeSnippet}</code>
                          </div>
                        )}
                        <Button
                          size="sm"
                          className={`text-xs bg-gradient-to-r ${colorClass} hover:opacity-90 text-white`}
                          onClick={() => applySuggestion(suggestion)}
                        >
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Chat Messages */}
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted dyad-text'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.suggestions && (
                    <div className="mt-2 space-y-2">
                      {message.suggestions.map((suggestion) => (
                        <div key={suggestion.id} className="text-xs bg-black/20 rounded p-2">
                          <div className="font-medium mb-1">{suggestion.message}</div>
                          {suggestion.codeSnippet && (
                            <code className="block font-mono bg-black/30 rounded p-1 mb-2">
                              {suggestion.codeSnippet}
                            </code>
                          )}
                          <Button
                            size="sm"
                            variant="secondary"
                            className="text-xs"
                            onClick={() => applySuggestion(suggestion)}
                          >
                            Apply
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Chat Input */}
        <div className="p-4 border-t dyad-border">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask AI for help..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-secondary hover:bg-secondary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
