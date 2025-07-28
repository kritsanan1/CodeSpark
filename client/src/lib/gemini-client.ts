// Gemini client for AI-powered features

export interface CodeAnalysisResult {
  suggestions: Array<{
    type: 'suggestion' | 'warning' | 'optimization' | 'bug' | 'refactor';
    severity: 'low' | 'medium' | 'high';
    title: string;
    description: string;
    line?: number;
    confidence: number;
    fix?: string;
  }>;
  summary: string;
}

export interface CodeGenerationRequest {
  prompt: string;
  context?: string;
  language: string;
  framework?: string;
}

export class GeminiClient {
  /**
   * Analyze code and get AI-powered suggestions
   */
  async analyzeCode(code: string, fileName: string): Promise<CodeAnalysisResult> {
    try {
      const response = await fetch('/api/ai/analyze-code', {
        method: 'POST',
        body: JSON.stringify({ code, fileName }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Code analysis failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Code analysis error:', error);
      return {
        suggestions: [{
          type: 'warning',
          severity: 'low',
          title: 'AI Analysis Unavailable',
          description: 'Unable to analyze code with AI at this time.',
          confidence: 0
        }],
        summary: 'Code analysis service temporarily unavailable'
      };
    }
  }

  /**
   * Generate code from natural language description
   */
  async generateCode(request: CodeGenerationRequest): Promise<string> {
    try {
      const response = await fetch('/api/ai/generate-code', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Code generation failed');
      }
      
      const result = await response.json();
      return result.code;
    } catch (error) {
      console.error('Code generation error:', error);
      return `// Code generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  /**
   * Get intelligent code suggestions for autocomplete
   */
  async getCodeSuggestions(code: string, cursorPosition: number, fileName: string): Promise<string[]> {
    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        body: JSON.stringify({ code, cursorPosition, fileName }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Code suggestions failed');
      }
      
      const result = await response.json();
      return result.suggestions || [];
    } catch (error) {
      console.error('Code suggestions error:', error);
      return [];
    }
  }

  /**
   * Explain what code does
   */
  async explainCode(code: string): Promise<string> {
    try {
      const response = await fetch('/api/ai/explain-code', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Code explanation failed');
      }
      
      const result = await response.json();
      return result.explanation;
    } catch (error) {
      console.error('Code explanation error:', error);
      return 'Code explanation service temporarily unavailable.';
    }
  }

  /**
   * Generate unit tests for code
   */
  async generateTests(code: string, framework: string = 'jest'): Promise<string> {
    try {
      const response = await fetch('/api/ai/generate-tests', {
        method: 'POST',
        body: JSON.stringify({ code, framework }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Test generation failed');
      }
      
      const result = await response.json();
      return result.tests;
    } catch (error) {
      console.error('Test generation error:', error);
      return `// Test generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  /**
   * Refactor code with AI assistance
   */
  async refactorCode(code: string, refactorType: string): Promise<string> {
    try {
      const response = await fetch('/api/ai/refactor-code', {
        method: 'POST',
        body: JSON.stringify({ code, refactorType }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Code refactoring failed');
      }
      
      const result = await response.json();
      return result.code;
    } catch (error) {
      console.error('Code refactoring error:', error);
      return code; // Return original code on error
    }
  }

  /**
   * Generate documentation for code
   */
  async generateDocumentation(code: string): Promise<string> {
    try {
      const response = await fetch('/api/ai/generate-docs', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Documentation generation failed');
      }
      
      const result = await response.json();
      return result.code;
    } catch (error) {
      console.error('Documentation generation error:', error);
      return code; // Return original code on error
    }
  }
}

export const geminiClient = new GeminiClient();