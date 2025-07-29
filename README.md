# Dyad - AI App Builder

> A local, open-source AI app builder designed to enable rapid application development with AI assistance, emphasizing privacy, speed, and user control.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/dyad.git
cd dyad

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

## 📋 Technical Requirements

### System Prerequisites
- **Node.js:** >= 18.0.0 (LTS recommended)
- **npm:** >= 8.0.0 or **yarn:** >= 1.22.0
- **Git:** >= 2.30.0
- **Operating System:** Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)

### Development Environment
- **TypeScript:** ^5.6.3
- **React:** ^18.3.1
- **Vite:** ^5.4.19
- **Tailwind CSS:** ^3.4.17
- **Supabase:** Latest stable version

### Browser Support
- Chrome/Chromium >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/dyad_db"

# Supabase Configuration (if using Supabase)
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"

# AI Service Configuration
GEMINI_API_KEY="your-gemini-api-key"

# Development Configuration
NODE_ENV="development"
PORT="5000"
VITE_API_URL="http://localhost:5000"

# Optional: Replit Configuration
REPL_ID="your-repl-id"
```

### Environment Variable Descriptions

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `VITE_SUPABASE_URL` | Supabase project URL | Yes | - |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes | - |
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes | - |
| `NODE_ENV` | Environment mode | No | `development` |
| `PORT` | Server port | No | `5000` |
| `VITE_API_URL` | API base URL | No | `http://localhost:5000` |

## 📦 Installation Guide

### Local Development Setup

1. **Clone and Navigate**
   ```bash
   git clone https://github.com/your-org/dyad.git
   cd dyad
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Database Setup**
   ```bash
   # Push database schema
   npm run db:push
   
   # Generate database types (optional)
   npm run db:generate
   ```

4. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your specific values
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

### Production Deployment

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

### Docker Setup (Optional)

```bash
# Build Docker image
docker build -t dyad .

# Run container
docker run -p 5000:5000 --env-file .env dyad
```

## 🛠 Development Guidelines

### Code Style Conventions

- **TypeScript:** Strict mode enabled with comprehensive type checking
- **ESLint:** Extended from `@typescript-eslint/recommended`
- **Prettier:** Automatic code formatting on save
- **Import Organization:** Absolute imports using `@/` prefix for src directory

### File Naming Conventions

```
components/     → PascalCase (e.g., UserProfile.tsx)
pages/         → kebab-case (e.g., user-settings.tsx)
hooks/         → camelCase with 'use' prefix (e.g., useAuth.ts)
utils/         → camelCase (e.g., formatDate.ts)
types/         → PascalCase with .types.ts suffix
```

### Git Workflow

#### Branch Naming Format
```
[type]/[ticket-number]-[description]

Examples:
feature/DYD-123-ai-code-suggestions
bugfix/DYD-456-editor-syntax-highlighting
hotfix/DYD-789-authentication-error
chore/DYD-101-update-dependencies
```

#### Commit Message Format
```
type(scope): description

Examples:
feat(editor): add AI-powered code completion
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
refactor(api): optimize database queries
```

### Pull Request Template

```markdown
## 📝 Description
Brief description of changes made.

## 🔄 Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## 🧪 Testing Steps
1. Step one
2. Step two
3. Step three

## 📸 Screenshots (if applicable)
Add screenshots to help explain your changes.

## ✅ Review Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Code is commented, particularly in hard-to-understand areas
- [ ] Corresponding changes to documentation made
- [ ] Changes generate no new warnings
- [ ] Tests added that prove fix is effective or feature works
- [ ] New and existing unit tests pass locally
```

### Code Review Criteria

#### Must Have ✅
- [ ] Code compiles without errors or warnings
- [ ] All tests pass
- [ ] Code follows established patterns and conventions
- [ ] Security considerations addressed
- [ ] Performance implications considered

#### Should Have 🔍
- [ ] Code is self-documenting with clear variable/function names
- [ ] Complex logic includes explanatory comments
- [ ] Error handling implemented appropriately
- [ ] Accessibility standards followed (WCAG 2.1 AA)

#### Nice to Have 💡
- [ ] Code includes performance optimizations
- [ ] Additional test coverage beyond requirements
- [ ] Documentation updates included

## 🚀 Deployment Process

### Development Environment
```bash
# Start development server with hot reload
npm run dev

# Run type checking
npm run check

# Run linting
npm run lint

# Run tests
npm run test
```

### Staging Environment
```bash
# Build for staging
npm run build:staging

# Deploy to staging
npm run deploy:staging
```

### Production Environment
```bash
# Build for production
npm run build

# Deploy to production
npm run deploy:production

# Health check
npm run health-check
```

### Environment-Specific Configuration

| Environment | Database | API URL | AI Service |
|-------------|----------|---------|------------|
| Development | Local PostgreSQL | `localhost:5000` | Gemini API (dev key) |
| Staging | Supabase (staging) | `staging-api.dyad.dev` | Gemini API (staging key) |
| Production | Supabase (prod) | `api.dyad.dev` | Gemini API (prod key) |

### Rollback Procedures

#### Immediate Rollback
```bash
# Revert to previous deployment
npm run rollback:immediate

# Check application health
npm run health-check
```

#### Planned Rollback
```bash
# Create rollback plan
npm run rollback:plan --version=v1.2.3

# Execute rollback
npm run rollback:execute
```

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or use different port
PORT=3000 npm run dev
```

#### Database Connection Issues
```bash
# Check database status
npm run db:status

# Reset database
npm run db:reset

# Migrate database
npm run db:migrate
```

#### Build Failures
```bash
# Clear build cache
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

#### AI Service Errors
- Verify `GEMINI_API_KEY` is set correctly
- Check API quota and rate limits
- Ensure network connectivity to AI service

### Getting Help

- 📖 **Documentation:** Check `/docs` directory for detailed guides
- 🐛 **Bug Reports:** Create an issue with reproduction steps
- 💬 **Discussions:** Join our community discussions
- 📧 **Support:** Contact the development team

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup for Contributors

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Google Gemini](https://ai.google.dev/) - AI assistance

---

**Made with ❤️ by the Dyad team**