import * as fs from "fs";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI with API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

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

export class GeminiService {
  /**
   * Analyze code and provide AI-powered suggestions
   */
  async analyzeCode(code: string, fileName: string): Promise<CodeAnalysisResult> {
    try {
      const prompt = `You are an expert code reviewer. Analyze the following ${fileName} code and provide detailed feedback:

${code}

Please provide:
1. Code quality suggestions
2. Performance optimizations  
3. Potential bugs or issues
4. Refactoring opportunities
5. Best practices improvements

Format your response as JSON with this structure:
{
  "suggestions": [
    {
      "type": "suggestion|warning|optimization|bug|refactor",
      "severity": "low|medium|high", 
      "title": "Brief title",
      "description": "Detailed description",
      "line": 10,
      "confidence": 85,
      "fix": "Optional code fix"
    }
  ],
  "summary": "Overall code quality summary"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              suggestions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: { type: "string", enum: ["suggestion", "warning", "optimization", "bug", "refactor"] },
                    severity: { type: "string", enum: ["low", "medium", "high"] },
                    title: { type: "string" },
                    description: { type: "string" },
                    line: { type: "number" },
                    confidence: { type: "number" },
                    fix: { type: "string" }
                  },
                  required: ["type", "severity", "title", "description", "confidence"]
                }
              },
              summary: { type: "string" }
            },
            required: ["suggestions", "summary"]
          }
        },
        contents: prompt,
      });

      const result = JSON.parse(response.text || '{"suggestions": [], "summary": "Analysis failed"}');
      return result;
    } catch (error) {
      console.error('Gemini code analysis error:', error);
      return {
        suggestions: [{
          type: 'warning',
          severity: 'low',
          title: 'AI Analysis Unavailable',
          description: 'Unable to analyze code with AI at this time. Please check your connection.',
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
      const prompt = `Generate ${request.language} code${request.framework ? ` using ${request.framework}` : ''} based on this request:

${request.prompt}

${request.context ? `\nContext:\n${request.context}` : ''}

Requirements:
- Write clean, production-ready code
- Include proper error handling
- Add helpful comments
- Follow best practices for ${request.language}${request.framework ? ` and ${request.framework}` : ''}
- Make the code type-safe where applicable

Only return the code, no explanations.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text || "// Code generation failed";
    } catch (error) {
      console.error('Gemini code generation error:', error);
      return `// Code generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  /**
   * Get intelligent code suggestions for autocomplete
   */
  async getCodeSuggestions(code: string, cursorPosition: number, fileName: string): Promise<string[]> {
    try {
      const beforeCursor = code.substring(0, cursorPosition);
      const afterCursor = code.substring(cursorPosition);
      
      const prompt = `You are an intelligent code completion assistant. Given this code context, suggest the most likely completions:

File: ${fileName}
Code before cursor:
${beforeCursor}

Code after cursor:
${afterCursor}

Provide 3-5 most relevant code completions that would make sense at the cursor position. Return only the completion text, one per line, no explanations.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const suggestions = response.text?.split('\n')
        .filter(line => line.trim().length > 0)
        .slice(0, 5) || [];

      return suggestions;
    } catch (error) {
      console.error('Gemini suggestions error:', error);
      return [];
    }
  }

  /**
   * Explain code functionality
   */
  async explainCode(code: string): Promise<string> {
    try {
      const prompt = `Explain what this code does in clear, simple terms:

${code}

Provide a concise explanation that covers:
1. Main purpose
2. Key functionality
3. Important details
4. Any potential issues or improvements`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text || "Unable to explain code at this time.";
    } catch (error) {
      console.error('Gemini code explanation error:', error);
      return "Code explanation service temporarily unavailable.";
    }
  }

  /**
   * Generate unit test for code
   */
  async generateTests(code: string, framework: string = 'jest'): Promise<string> {
    try {
      const prompt = `Generate comprehensive unit tests for this code using ${framework}:

${code}

Requirements:
- Test all public methods/functions
- Include edge cases and error scenarios
- Use proper test structure and naming
- Include setup and teardown if needed
- Mock external dependencies appropriately

Return only the test code, properly formatted.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
      });

      return response.text || "// Test generation failed";
    } catch (error) {
      console.error('Gemini test generation error:', error);
      return `// Test generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  /**
   * Refactor code with AI suggestions
   */
  async refactorCode(code: string, refactorType: string): Promise<string> {
    try {
      const prompt = `Refactor this code with focus on: ${refactorType}

Original code:
${code}

Refactoring goals:
- Improve readability and maintainability
- Follow best practices
- Optimize performance where possible
- Maintain the same functionality
- Add proper TypeScript types if applicable

Return only the refactored code, no explanations.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
      });

      return response.text || code; // Return original if refactoring fails
    } catch (error) {
      console.error('Gemini refactoring error:', error);
      return code; // Return original code on error
    }
  }

  /**
   * Generate documentation for code
   */
  async generateDocumentation(code: string): Promise<string> {
    try {
      const prompt = `Generate comprehensive documentation for this code:

${code}

Include:
- JSDoc/TSDoc comments for functions and classes
- Parameter descriptions
- Return value descriptions
- Usage examples
- Any important notes or warnings

Return the code with added documentation comments.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text || code;
    } catch (error) {
      console.error('Gemini documentation error:', error);
      return code;
    }
  }
}

export const geminiService = new GeminiService();