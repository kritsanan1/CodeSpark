# File Structure Documentation

## Project Overview
**Total Files:** 147 files  
**Complexity Distribution:** 🟢 Low: 89 files | 🟡 Medium: 42 files | 🔴 High: 16 files

## Root Level Files
```
.replit                           🟢 - Replit configuration for cloud development environment
replit.md                         🟢 - Project documentation and development notes
package.json                      🟡 - Node.js project dependencies and scripts configuration
tsconfig.json                     🟢 - TypeScript compiler configuration
server/                           📁 - Backend server implementation
client/                           📁 - Frontend React application
shared/                           📁 - Shared types and schemas between client/server
vite.config.ts                    🟡 - Vite build tool configuration
components.json                   🟢 - shadcn/ui component configuration
postcss.config.js                🟢 - PostCSS configuration for Tailwind CSS
tailwind.config.ts               🟡 - Tailwind CSS framework configuration
drizzle.config.ts                🟢 - Drizzle ORM database configuration
attached_assets/                  📁 - Project planning and documentation assets
```

## Server Directory (`server/`)
```
server/
├── index.ts                      🟡 - Express server entry point with middleware setup
├── routes.ts                     🔴 - API route handlers for all endpoints
├── storage.ts                    🔴 - In-memory storage implementation with data models
├── vite.ts                       🟡 - Vite development server integration
└── gemini-service.ts             🔴 - Google Gemini AI service integration
```

## Shared Directory (`shared/`)
```
shared/
└── schema.ts                     🔴 - Database schema definitions and Zod validation
```

## Client Directory (`client/`)
```
client/
├── index.html                    🟢 - HTML entry point for React application
└── src/                          📁 - React application source code
```

## Client Source (`client/src/`)
```
client/src/
├── main.tsx                      🟡 - React application entry point
├── App.tsx                       🟡 - Main application component with routing
├── index.css                     🟢 - Global CSS styles and Tailwind configuration
├── lib/                          📁 - Utility libraries and services
├── hooks/                        📁 - Custom React hooks
├── pages/                        📁 - Page components for routing
└── components/                   📁 - Reusable UI components
```

## Library Directory (`client/src/lib/`)
```
lib/
├── utils.ts                      🟢 - Utility functions for class names and common operations
├── queryClient.ts                🟡 - TanStack Query client configuration
├── ai-service.ts                 🟡 - Local AI service simulation and management
├── template-service.ts           🟡 - Template management and categorization service
└── gemini-client.ts              🔴 - Gemini AI client for code analysis and generation
```

## Hooks Directory (`client/src/hooks/`)
```
hooks/
├── use-toast.ts                  🔴 - Toast notification system hook
├── use-theme.tsx                 🟡 - Theme management hook for dark/light mode
└── use-mobile.tsx                🟢 - Mobile device detection hook
```

## Pages Directory (`client/src/pages/`)
```
pages/
├── editor.tsx                    🔴 - Main code editor page with AI assistance
├── templates.tsx                 🔴 - Template selection and project creation page
├── community.tsx                 🔴 - Community feed and social features page
├── settings.tsx                  🔴 - Application settings and preferences page
└── not-found.tsx                 🟢 - 404 error page component
```

## Components Directory (`client/src/components/`)
```
components/
├── ui/                           📁 - shadcn/ui component library
├── layout/                       📁 - Layout components (sidebar, topbar)
├── editor/                       📁 - Code editor related components
├── ai/                           📁 - AI assistance components
├── community/                    📁 - Community features components
├── debugging/                    📁 - Debugging tools components
├── templates/                    📁 - Template management components
├── productivity/                 📁 - Developer productivity tools
└── monitoring/                   📁 - Performance monitoring components
```

## UI Components (`client/src/components/ui/`)
```
ui/
├── card.tsx                      🟢 - Card container component
├── button.tsx                    🟡 - Button component with variants
├── input.tsx                     🟢 - Input field component
├── badge.tsx                     🟢 - Badge/tag component
├── dialog.tsx                    🟡 - Modal dialog component
├── form.tsx                      🔴 - Form handling components
├── tabs.tsx                      🟡 - Tab navigation component
├── alert.tsx                     🟢 - Alert notification component
├── avatar.tsx                    🟡 - User avatar component
├── chart.tsx                     🔴 - Chart visualization component
├── label.tsx                     🟡 - Form label component
├── sheet.tsx                     🟡 - Slide-out panel component
├── table.tsx                     🟢 - Data table component
├── toast.tsx                     🟡 - Toast notification component
├── tooltip.tsx                   🟡 - Tooltip component
├── calendar.tsx                  🔴 - Date picker calendar component
├── carousel.tsx                  🔴 - Image/content carousel component
├── checkbox.tsx                  🟡 - Checkbox input component
├── progress.tsx                  🟢 - Progress bar component
├── skeleton.tsx                  🟢 - Loading skeleton component
├── textarea.tsx                  🟢 - Multi-line text input component
├── accordion.tsx                 🟡 - Collapsible content component
├── input-otp.tsx                 🟡 - OTP input component
├── resizable.tsx                 🟡 - Resizable panel component
├── separator.tsx                 🟡 - Visual separator component
├── breadcrumb.tsx                🟡 - Navigation breadcrumb component
├── hover-card.tsx                🟡 - Hover popup card component
├── pagination.tsx                🟡 - Pagination navigation component
├── select.tsx                    🔴 - Dropdown select component
├── slider.tsx                    🟡 - Range slider component
├── switch.tsx                    🟡 - Toggle switch component
├── toggle.tsx                    🟡 - Toggle button component
├── command.tsx                   🔴 - Command palette component
├── menubar.tsx                   🔴 - Menu bar navigation component
├── popover.tsx                   🟡 - Popover popup component
├── sidebar.tsx                   🔴 - Sidebar navigation component
├── toaster.tsx                   🟡 - Toast container component
├── alert-dialog.tsx              🔴 - Alert dialog component
├── aspect-ratio.tsx              🟢 - Aspect ratio container component
├── context-menu.tsx              🔴 - Right-click context menu component
├── toggle-group.tsx              🟡 - Toggle button group component
├── collapsible.tsx               🟡 - Collapsible content component
├── radio-group.tsx               🟡 - Radio button group component
├── scroll-area.tsx               🟡 - Custom scrollable area component
├── dropdown-menu.tsx             🔴 - Dropdown menu component
└── navigation-menu.tsx           🔴 - Navigation menu component
```

## Layout Components (`client/src/components/layout/`)
```
layout/
├── sidebar.tsx                   🔴 - Main application sidebar with navigation
└── topbar.tsx                    🟡 - Top navigation bar with file info
```

## Editor Components (`client/src/components/editor/`)
```
editor/
├── code-editor.tsx               🔴 - Main code editor with syntax highlighting
├── ai-panel.tsx                  🔴 - AI assistance panel with suggestions
├── file-explorer.tsx             🔴 - File tree navigation component
├── terminal.tsx                  🔴 - Integrated terminal emulator
├── minimap.tsx                   🟡 - Code minimap for navigation
└── file-tabs.tsx                 🟡 - File tab management component
```

## AI Components (`client/src/components/ai/`)
```
ai/
└── advanced-ai-features.tsx      🔴 - Advanced AI tools and code generation
```

## Community Components (`client/src/components/community/`)
```
community/
└── community-feed.tsx            🟡 - Community posts and interactions feed
```

## Debugging Components (`client/src/components/debugging/`)
```
debugging/
└── debugger-panel.tsx            🔴 - Debugging tools with breakpoints and variables
```

## Template Components (`client/src/components/templates/`)
```
templates/
└── template-modal.tsx            🔴 - Template selection modal dialog
```

## Productivity Components (`client/src/components/productivity/`)
```
productivity/
└── code-snippets.tsx             🔴 - Code snippets library and management
```

## Monitoring Components (`client/src/components/monitoring/`)
```
monitoring/
└── performance-monitor.tsx       🔴 - Real-time performance monitoring dashboard
```

## Attached Assets (`attached_assets/`)
```
attached_assets/
├── Pasted--Setup-Infrastructure-Easy-Project-Initialization-Set-up-the-development-1753722908662_1753722908662.txt  🟢 - Project setup checklist
└── Pasted--Project-Name-Dyad-Description-Dyad-is-a-local-open-source-AI-app-builder-designed-to-enab-1753722898533_1753722898533.txt  🟢 - Project requirements document
```

## Architecture Patterns

### Component Organization
- **Feature-based structure** with clear separation of concerns
- **Atomic design principles** with ui components as atoms
- **Domain-driven organization** for business logic components

### Import Complexity Analysis
- 🔴 **High Complexity (16 files):** Core business logic, API routes, and main page components
- 🟡 **Medium Complexity (42 files):** UI components and service integrations
- 🟢 **Low Complexity (89 files):** Utility components and configuration files

### Technology Stack Integration
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Express.js + TypeScript + Drizzle ORM
- **Database:** PostgreSQL via Supabase
- **AI Integration:** Google Gemini API
- **UI Library:** shadcn/ui + Radix UI primitives