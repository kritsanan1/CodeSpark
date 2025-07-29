import { 
  type User, 
  type InsertUser, 
  type Project, 
  type InsertProject,
  type Template,
  type InsertTemplate,
  type CommunityPost,
  type InsertCommunityPost,
  type AiSuggestion,
  type InsertAiSuggestion
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPreferences(id: string, preferences: any): Promise<User | undefined>;

  // Projects
  getProject(id: string): Promise<Project | undefined>;
  getProjectsByUser(userId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, updates: Partial<Project>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Templates
  getTemplate(id: string): Promise<Template | undefined>;
  getTemplates(): Promise<Template[]>;
  getTemplatesByCategory(category: string): Promise<Template[]>;
  createTemplate(template: InsertTemplate): Promise<Template>;

  // Community
  getCommunityPosts(): Promise<CommunityPost[]>;
  getCommunityPost(id: string): Promise<CommunityPost | undefined>;
  createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost>;

  // AI Suggestions
  getAiSuggestions(projectId: string): Promise<AiSuggestion[]>;
  createAiSuggestion(suggestion: InsertAiSuggestion): Promise<AiSuggestion>;
  markSuggestionApplied(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private templates: Map<string, Template>;
  private communityPosts: Map<string, CommunityPost>;
  private aiSuggestions: Map<string, AiSuggestion>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.templates = new Map();
    this.communityPosts = new Map();
    this.aiSuggestions = new Map();
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize default templates
    const defaultTemplates: Template[] = [
      {
        id: randomUUID(),
        name: "React SPA",
        description: "Single-page application with routing",
        category: "frontend",
        icon: "fab fa-react",
        tags: ["React", "TypeScript"],
        files: {
          "src/App.tsx": "import React from 'react';\n\nfunction App() {\n  return (\n    <div className=\"App\">\n      <h1>Hello World</h1>\n    </div>\n  );\n}\n\nexport default App;",
          "package.json": JSON.stringify({
            name: "react-spa",
            version: "1.0.0",
            dependencies: {
              "react": "^18.0.0",
              "react-dom": "^18.0.0"
            }
          }, null, 2)
        },
        isPublic: true,
        authorId: null,
        downloads: "150",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Express API",
        description: "RESTful API with Express.js",
        category: "backend",
        icon: "fab fa-node-js",
        tags: ["Node.js", "JavaScript"],
        files: {
          "src/index.js": "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.json({ message: 'Hello World' });\n});\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});",
          "package.json": JSON.stringify({
            name: "express-api",
            version: "1.0.0",
            dependencies: {
              "express": "^4.18.0"
            }
          }, null, 2)
        },
        isPublic: true,
        authorId: null,
        downloads: "89",
        createdAt: new Date(),
      }
    ];

    defaultTemplates.forEach(template => {
      this.templates.set(template.id, template);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      preferences: {},
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserPreferences(id: string, preferences: any): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      user.preferences = preferences;
      this.users.set(id, user);
      return user;
    }
    return undefined;
  }

  // Projects
  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByUser(userId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.userId === userId
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      description: insertProject.description || null,
      templateId: insertProject.templateId || null,
      files: insertProject.files || {},
      settings: insertProject.settings || {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (project) {
      const updatedProject = { ...project, ...updates, updatedAt: new Date() };
      this.projects.set(id, updatedProject);
      return updatedProject;
    }
    return undefined;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Templates
  async getTemplate(id: string): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async getTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }

  async getTemplatesByCategory(category: string): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(
      template => template.category === category
    );
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = randomUUID();
    const template: Template = {
      ...insertTemplate,
      id,
      description: insertTemplate.description || null,
      authorId: insertTemplate.authorId || null,
      tags: insertTemplate.tags || [],
      isPublic: insertTemplate.isPublic ?? true,
      downloads: "0",
      createdAt: new Date(),
    };
    this.templates.set(id, template);
    return template;
  }

  // Community
  async getCommunityPosts(): Promise<CommunityPost[]> {
    return Array.from(this.communityPosts.values()).sort(
      (a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async getCommunityPost(id: string): Promise<CommunityPost | undefined> {
    return this.communityPosts.get(id);
  }

  async createCommunityPost(insertPost: InsertCommunityPost): Promise<CommunityPost> {
    const id = randomUUID();
    const post: CommunityPost = {
      ...insertPost,
      id,
      tags: insertPost.tags || [],
      likes: "0",
      replies: "0",
      createdAt: new Date(),
    };
    this.communityPosts.set(id, post);
    return post;
  }

  // AI Suggestions
  async getAiSuggestions(projectId: string): Promise<AiSuggestion[]> {
    return Array.from(this.aiSuggestions.values()).filter(
      suggestion => suggestion.projectId === projectId
    );
  }

  async createAiSuggestion(insertSuggestion: InsertAiSuggestion): Promise<AiSuggestion> {
    const id = randomUUID();
    const suggestion: AiSuggestion = {
      ...insertSuggestion,
      id,
      applied: false,
      createdAt: new Date(),
    };
    this.aiSuggestions.set(id, suggestion);
    return suggestion;
  }

  async markSuggestionApplied(id: string): Promise<boolean> {
    const suggestion = this.aiSuggestions.get(id);
    if (suggestion) {
      suggestion.applied = true;
      this.aiSuggestions.set(id, suggestion);
      return true;
    }
    return false;
  }
}

export const storage = new MemStorage();
