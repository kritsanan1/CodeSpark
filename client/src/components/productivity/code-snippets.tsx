import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Search, 
  Copy, 
  Plus, 
  Star,
  Clock,
  Folder,
  Tag
} from "lucide-react";

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  category: string;
  isFavorite: boolean;
  usageCount: number;
  lastUsed?: Date;
}

export default function CodeSnippets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const [snippets] = useState<CodeSnippet[]>([
    {
      id: '1',
      title: 'React Hook Form Setup',
      description: 'Basic React Hook Form with validation',
      code: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}`,
      language: 'typescript',
      tags: ['react', 'forms', 'validation'],
      category: 'Components',
      isFavorite: true,
      usageCount: 15,
      lastUsed: new Date(Date.now() - 86400000)
    },
    {
      id: '2',
      title: 'API Hook with React Query',
      description: 'Custom hook for API calls using React Query',
      code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email: string;
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData: Omit<User, 'id'>): Promise<User> => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Failed to create user');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}`,
      language: 'typescript',
      tags: ['react-query', 'hooks', 'api'],
      category: 'Hooks',
      isFavorite: false,
      usageCount: 8,
      lastUsed: new Date(Date.now() - 2 * 86400000)
    },
    {
      id: '3',
      title: 'Error Boundary',
      description: 'React Error Boundary component with logging',
      code: `import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            {this.state.error?.message}
          </details>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;`,
      language: 'typescript',
      tags: ['react', 'error-handling', 'components'],
      category: 'Components',
      isFavorite: true,
      usageCount: 12,
      lastUsed: new Date(Date.now() - 3 * 86400000)
    },
    {
      id: '4',
      title: 'Debounced Search Hook',
      description: 'Custom hook for debounced search functionality',
      code: `import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useSearch<T>(
  searchFn: (query: string) => Promise<T[]>,
  options: {
    debounceMs?: number;
    minQueryLength?: number;
  } = {}
) {
  const { debounceMs = 300, minQueryLength = 2 } = options;
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, debounceMs);

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchFn(debouncedQuery),
    enabled: debouncedQuery.length >= minQueryLength,
  });

  return {
    query,
    setQuery,
    results: data || [],
    isLoading,
    error,
  };
}`,
      language: 'typescript',
      tags: ['react', 'hooks', 'search', 'debounce'],
      category: 'Hooks',
      isFavorite: false,
      usageCount: 5,
      lastUsed: new Date(Date.now() - 86400000)
    }
  ]);

  const categories = ['all', 'Components', 'Hooks', 'Utils', 'Patterns'];

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = !searchQuery || 
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      // Show toast notification
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleFavorite = (id: string) => {
    // Implementation would update the snippet favorite status
    console.log('Toggle favorite:', id);
  };

  return (
    <div className="w-80 bg-card border-l dyad-border flex flex-col max-h-screen">
      {/* Header */}
      <div className="p-4 border-b dyad-border">
        <div className="flex items-center space-x-2 mb-4">
          <Code2 className="h-5 w-5 text-primary" />
          <h2 className="font-semibold dyad-text">Code Snippets</h2>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Snippets List */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {filteredSnippets.map((snippet) => (
          <Card key={snippet.id} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm dyad-text truncate">
                    {snippet.title}
                  </CardTitle>
                  <p className="text-xs dyad-text-muted mt-1">
                    {snippet.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => toggleFavorite(snippet.id)}
                >
                  <Star 
                    className={`h-3 w-3 ${
                      snippet.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                    }`} 
                  />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {snippet.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Code Preview */}
              <div className="bg-muted p-2 rounded text-xs font-mono mb-3 max-h-32 overflow-auto">
                <pre className="dyad-text whitespace-pre-wrap">
                  {snippet.code.split('\n').slice(0, 6).join('\n')}
                  {snippet.code.split('\n').length > 6 && '\n...'}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs dyad-text-muted">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{snippet.usageCount}</span>
                  </div>
                  {snippet.lastUsed && (
                    <span>
                      {new Date(snippet.lastUsed).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard(snippet.code)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredSnippets.length === 0 && (
          <div className="text-center py-8 dyad-text-muted">
            <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No snippets found</p>
            <p className="text-xs mt-1">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>

      {/* Add Snippet Button */}
      <div className="p-4 border-t dyad-border">
        <Button className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Snippet
        </Button>
      </div>
    </div>
  );
}