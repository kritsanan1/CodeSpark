import { Template } from '@shared/schema';

export interface TemplateCategory {
  id: string;
  name: string;
  icon: string;
  templates: Template[];
}

class TemplateService {
  async getTemplates(): Promise<Template[]> {
    const response = await fetch('/api/templates');
    if (!response.ok) {
      throw new Error('Failed to fetch templates');
    }
    return response.json();
  }

  async getTemplate(id: string): Promise<Template> {
    const response = await fetch(`/api/templates/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch template');
    }
    return response.json();
  }

  async getTemplatesByCategory(category: string): Promise<Template[]> {
    const response = await fetch(`/api/templates?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch templates');
    }
    return response.json();
  }

  getTemplateCategories(): TemplateCategory[] {
    return [
      {
        id: 'frontend',
        name: 'Frontend',
        icon: 'fas fa-desktop',
        templates: []
      },
      {
        id: 'backend',
        name: 'Backend',
        icon: 'fas fa-server',
        templates: []
      },
      {
        id: 'fullstack',
        name: 'Full Stack',
        icon: 'fas fa-layer-group',
        templates: []
      },
      {
        id: 'mobile',
        name: 'Mobile',
        icon: 'fas fa-mobile-alt',
        templates: []
      }
    ];
  }

  getTemplateIcon(name: string): string {
    const iconMap: Record<string, string> = {
      'react': 'fab fa-react',
      'vue': 'fab fa-vuejs',
      'angular': 'fab fa-angular',
      'node': 'fab fa-node-js',
      'express': 'fab fa-node-js',
      'next': 'fas fa-globe',
      'nuxt': 'fab fa-vuejs',
      'gatsby': 'fab fa-react',
      'svelte': 'fas fa-fire',
      'flutter': 'fas fa-mobile-alt',
      'react native': 'fab fa-react',
      'graphql': 'fas fa-database',
      'mongodb': 'fas fa-database',
      'postgresql': 'fas fa-database',
      'mysql': 'fas fa-database',
    };

    const lowerName = name.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }

    return 'fas fa-file-code';
  }

  getTemplateColor(tags: string[]): string {
    const colorMap: Record<string, string> = {
      'react': 'from-blue-500 to-cyan-500',
      'vue': 'from-green-500 to-teal-500',
      'angular': 'from-red-500 to-pink-500',
      'node': 'from-green-600 to-lime-500',
      'typescript': 'from-blue-600 to-indigo-500',
      'javascript': 'from-yellow-500 to-orange-500',
      'python': 'from-yellow-600 to-green-600',
      'java': 'from-orange-600 to-red-600',
      'go': 'from-cyan-500 to-blue-500',
      'rust': 'from-orange-500 to-red-500',
    };

    for (const tag of tags) {
      const lowerTag = tag.toLowerCase();
      if (colorMap[lowerTag]) {
        return colorMap[lowerTag];
      }
    }

    return 'from-gray-500 to-gray-600';
  }
}

export const templateService = new TemplateService();
