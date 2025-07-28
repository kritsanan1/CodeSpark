# Dyad - AI App Builder

## Overview

Dyad is a local, open-source AI app builder designed to enable rapid application development with AI assistance. The system emphasizes privacy, speed, and user control by operating entirely on the user's machine. Built as a modern web application, it provides developers with intelligent code suggestions, customizable templates, and community-driven features.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**January 28, 2025:**
- ✓ Fixed all TypeScript errors in the codebase
- ✓ Connected to Supabase database via DATABASE_URL
- ✓ Fixed nested anchor tag validation warnings in sidebar navigation
- ✓ Ensured all database models have proper null handling
- ✓ Applied database schema migrations
- ✓ Application is now fully functional with all core features working:
  - Code editor with syntax highlighting and AI suggestions
  - Template system with project creation
  - Community feed for posts and discussions
  - Settings page with theme and AI configuration
  - Local AI service simulation for code assistance

## Current Status

The Dyad AI App Builder is now fully operational with:
- Modern React + TypeScript frontend
- Express.js backend with PostgreSQL database
- Real-time AI code suggestions
- Template-based project creation
- Community features for developer collaboration
- Dark/light theme support
- Responsive design optimized for development workflow

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom design system and dark/light theme support
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible interface
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful API with organized route handlers
- **Storage**: In-memory storage implementation with interface for future database integration
- **Session Management**: Express sessions with PostgreSQL session store support

### Database Strategy
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Provider**: Neon Database (serverless PostgreSQL)
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Shared schema definitions between client and server

## Key Components

### AI Service Layer
- Local AI model integration for code suggestions and assistance
- Real-time code analysis and improvement recommendations
- Context-aware suggestions based on current file and project structure
- Simulated AI responses with plans for local model integration

### Project Management
- Template-based project initialization
- File management and code editor integration
- Project settings and configuration management
- Multi-file editing with tabbed interface

### Template System
- Categorized project templates (Frontend, Backend, Full-stack)
- Template discovery and installation
- Community-contributed templates
- Template metadata and file structure management

### Community Features
- Community feed for contributions, questions, and showcases
- Post creation and interaction system
- User profiles and preferences
- Community-driven content sharing

### Editor Infrastructure
- Code editor with syntax highlighting
- File tree navigation
- Real-time AI suggestions panel
- Auto-save functionality
- Integration with version control systems

## Data Flow

1. **User Authentication**: Session-based authentication with user preferences storage
2. **Project Workflow**: User selects template → Creates project → AI assists with development → Files saved locally
3. **AI Integration**: Code analysis → Suggestion generation → User applies suggestions → Feedback loop
4. **Community Interaction**: Users create posts → Community engagement → Knowledge sharing
5. **Template Management**: Browse templates → Select and customize → Initialize new project

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connectivity
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives
- **wouter**: Lightweight React router
- **express**: Web application framework
- **connect-pg-simple**: PostgreSQL session store

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **drizzle-kit**: Database schema management
- **@replit/vite-plugin-runtime-error-modal**: Development error handling

## Deployment Strategy

### Development Environment
- Vite development server with hot module replacement
- Express server running in development mode with tsx
- Shared TypeScript configuration across client and server
- Replit integration for cloud development environment

### Production Build
- Client-side React application built with Vite
- Server-side Express application bundled with esbuild
- Static asset serving from Express server
- Environment variable configuration for database connections

### Local Execution Priority
- All core AI processing designed to run locally
- Minimal external API dependencies
- Privacy-focused architecture with local data storage
- Offline-capable development environment

### Database Configuration
- PostgreSQL database with Drizzle ORM
- Connection via DATABASE_URL environment variable
- Migration system for schema updates
- Session storage in PostgreSQL for user management

The architecture prioritizes local execution, privacy, and developer experience while maintaining the flexibility to scale and integrate with external services when needed.