export interface AISuggestion {
  id: string;
  type: 'code' | 'improvement' | 'fix' | 'performance';
  message: string;
  codeSnippet?: string;
  filePath?: string;
  lineNumber?: number;
}

export interface AIMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: AISuggestion[];
}

class AIService {
  private suggestions: AISuggestion[] = [];
  private messages: AIMessage[] = [];

  // Simulate local AI model responses
  async generateSuggestions(code: string, filePath: string): Promise<AISuggestion[]> {
    // In a real implementation, this would connect to a local AI model
    const suggestions: AISuggestion[] = [];
    
    // Analyze code patterns and generate contextual suggestions
    if (code.includes('React.FC') && !code.includes('onClick')) {
      suggestions.push({
        id: `suggestion-${Date.now()}-1`,
        type: 'improvement',
        message: 'Consider adding onClick handler for interactive components',
        codeSnippet: `const handleClick = () => {\n  // Add your click logic here\n};`,
        filePath,
        lineNumber: code.split('\n').findIndex(line => line.includes('return (')) + 1
      });
    }

    if (code.includes('useState') && !code.includes('useCallback')) {
      suggestions.push({
        id: `suggestion-${Date.now()}-2`,
        type: 'performance',
        message: 'Consider using useCallback for event handlers to optimize performance',
        codeSnippet: `const handleCallback = useCallback(() => {\n  // Your callback logic here\n}, [dependencies]);`,
        filePath,
      });
    }

    if (code.includes('img') && !code.includes('loading=')) {
      suggestions.push({
        id: `suggestion-${Date.now()}-3`,
        type: 'improvement',
        message: 'Add lazy loading to images for better performance',
        codeSnippet: `<img loading="lazy" alt="..." />`,
        filePath,
      });
    }

    this.suggestions = suggestions;
    return suggestions;
  }

  async sendMessage(message: string): Promise<AIMessage> {
    const userMessage: AIMessage = {
      id: `msg-${Date.now()}-user`,
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    this.messages.push(userMessage);

    // Simulate AI response
    const aiResponse = await this.generateAIResponse(message);
    this.messages.push(aiResponse);

    return aiResponse;
  }

  private async generateAIResponse(userMessage: string): Promise<AIMessage> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let response = '';
    const suggestions: AISuggestion[] = [];

    if (userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('suggestion')) {
      response = "I'm here to help! I can provide code suggestions, identify potential improvements, and assist with best practices. What specific area would you like help with?";
    } else if (userMessage.toLowerCase().includes('performance')) {
      response = "For better performance, consider:\n• Using React.memo for components that don't need frequent re-renders\n• Implementing lazy loading for images and components\n• Optimizing bundle size with code splitting";
      suggestions.push({
        id: `suggestion-${Date.now()}-perf`,
        type: 'performance',
        message: 'Use React.memo to prevent unnecessary re-renders',
        codeSnippet: `export const MyComponent = React.memo(({ prop1, prop2 }) => {\n  return (\n    // Component JSX\n  );\n});`,
      });
    } else if (userMessage.toLowerCase().includes('error') || userMessage.toLowerCase().includes('bug')) {
      response = "I can help debug your code. Please share the specific error message or describe the issue you're experiencing. Common solutions include:\n• Checking for typos in variable names\n• Ensuring all imports are correct\n• Verifying component props are passed correctly";
    } else {
      response = "I understand you're working on your code. Could you be more specific about what you'd like help with? I can assist with code suggestions, debugging, performance optimization, or best practices.";
    }

    return {
      id: `msg-${Date.now()}-ai`,
      type: 'assistant',
      content: response,
      timestamp: new Date(),
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    };
  }

  getSuggestions(): AISuggestion[] {
    return this.suggestions;
  }

  getMessages(): AIMessage[] {
    return this.messages;
  }

  clearMessages(): void {
    this.messages = [];
  }

  applySuggestion(suggestionId: string): boolean {
    const suggestion = this.suggestions.find(s => s.id === suggestionId);
    if (suggestion) {
      // In a real implementation, this would apply the code change
      console.log('Applying suggestion:', suggestion);
      return true;
    }
    return false;
  }
}

export const aiService = new AIService();
