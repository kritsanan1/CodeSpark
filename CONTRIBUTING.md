# Contributing to Dyad AI App Builder

Thank you for your interest in contributing to Dyad! This document provides guidelines and information for contributors.

## 🌟 Ways to Contribute

- 🐛 **Bug Reports:** Help us identify and fix issues
- ✨ **Feature Requests:** Suggest new features and improvements
- 📝 **Documentation:** Improve our docs and guides
- 💻 **Code Contributions:** Submit bug fixes and new features
- 🎨 **Design:** Contribute to UI/UX improvements
- 🧪 **Testing:** Help improve test coverage and quality
- 🌍 **Community:** Help other users and spread the word

## 🚀 Getting Started

### Prerequisites

- **Node.js:** >= 18.0.0 (LTS recommended)
- **npm:** >= 8.0.0 or **yarn:** >= 1.22.0
- **Git:** >= 2.30.0
- **Code Editor:** VS Code recommended with suggested extensions

### Development Setup

1. **Fork and Clone**
   ```bash
   # Fork the repository on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/dyad.git
   cd dyad
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Verify Setup**
   - Open http://localhost:5173 in your browser
   - Ensure the application loads without errors
   - Check that AI features work (requires GEMINI_API_KEY)

## 📋 Development Workflow

### Branch Strategy

We use **Git Flow** with the following branches:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features and enhancements
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

### Branch Naming Convention

```
[type]/[ticket-number]-[short-description]

Examples:
feature/DYD-123-ai-code-suggestions
bugfix/DYD-456-editor-syntax-highlighting
hotfix/DYD-789-authentication-error
docs/DYD-101-update-contributing-guide
```

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer(s)]
```

**Types:**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**
```
feat(editor): add AI-powered code completion
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
refactor(api): optimize database queries
test(editor): add unit tests for code editor
```

## 🔧 Code Standards

### TypeScript Guidelines

- **Strict Mode:** All code must pass TypeScript strict mode
- **Type Safety:** Avoid `any` types; use proper interfaces and types
- **Naming:** Use PascalCase for types/interfaces, camelCase for variables/functions
- **Exports:** Use named exports over default exports where possible

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export const createUser = (profile: UserProfile): Promise<User> => {
  // Implementation
};

// ❌ Avoid
const createUser = (profile: any) => {
  // Implementation
};
```

### React Guidelines

- **Functional Components:** Use function components with hooks
- **TypeScript:** All components must be properly typed
- **Props Interface:** Define clear interfaces for component props
- **Hooks:** Follow React hooks rules and best practices

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant, 
  onClick, 
  children, 
  disabled = false 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

### CSS/Styling Guidelines

- **Tailwind CSS:** Use Tailwind utility classes
- **Component Styles:** Keep styles close to components
- **Responsive Design:** Mobile-first approach
- **Accessibility:** Follow WCAG 2.1 AA guidelines

```typescript
// ✅ Good
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Click me
</button>
```

### File Organization

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (atoms)
│   └── [feature]/       # Feature-specific components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── services/            # API and business logic
└── types/               # TypeScript type definitions
```

## 🧪 Testing Guidelines

### Test Types

1. **Unit Tests:** Test individual functions and components
2. **Integration Tests:** Test component interactions
3. **E2E Tests:** Test complete user workflows

### Testing Requirements

- **Coverage:** Aim for 80%+ test coverage
- **Critical Paths:** All critical user flows must have E2E tests
- **Components:** All public components should have unit tests
- **Services:** All service functions should be tested

### Writing Tests

```typescript
// Component Test Example
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 📝 Documentation Standards

### Code Documentation

- **JSDoc:** Document all public functions and classes
- **README:** Keep README files up to date
- **Comments:** Explain complex logic and business rules
- **Types:** Use descriptive type names and interfaces

```typescript
/**
 * Analyzes code and provides AI-powered suggestions
 * @param code - The source code to analyze
 * @param language - Programming language of the code
 * @returns Promise resolving to analysis results
 */
export async function analyzeCode(
  code: string, 
  language: string
): Promise<AnalysisResult> {
  // Implementation
}
```

### Documentation Updates

When contributing, ensure you update relevant documentation:

- **README.md** - For setup or usage changes
- **API Documentation** - For API changes
- **Component Documentation** - For new components
- **Migration Guides** - For breaking changes

## 🔍 Code Review Process

### Before Submitting

- [ ] Code follows project conventions
- [ ] All tests pass locally
- [ ] TypeScript compilation succeeds
- [ ] Documentation is updated
- [ ] Self-review completed

### Pull Request Guidelines

1. **Create Feature Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/DYD-123-new-feature
   ```

2. **Make Changes**
   - Write code following our standards
   - Add tests for new functionality
   - Update documentation

3. **Test Locally**
   ```bash
   npm run lint
   npm run check
   npm run test
   npm run build
   ```

4. **Submit Pull Request**
   - Use our PR template
   - Provide clear description
   - Link related issues
   - Add screenshots for UI changes

### Review Criteria

**Must Have ✅**
- [ ] Functionality works as described
- [ ] Code follows project standards
- [ ] Tests pass and coverage is adequate
- [ ] No security vulnerabilities
- [ ] Documentation is updated

**Should Have 🔍**
- [ ] Code is readable and well-structured
- [ ] Performance considerations addressed
- [ ] Error handling implemented
- [ ] Accessibility standards followed

**Nice to Have 💡**
- [ ] Performance optimizations included
- [ ] Additional test coverage
- [ ] Code comments for complex logic

## 🐛 Bug Reports

### Before Reporting

1. **Search Existing Issues** - Check if the bug is already reported
2. **Reproduce the Bug** - Ensure you can consistently reproduce it
3. **Test Latest Version** - Verify the bug exists in the latest version

### Bug Report Template

Use our bug report template and include:

- **Clear Description** - What happened vs. what was expected
- **Steps to Reproduce** - Detailed steps to reproduce the bug
- **Environment Info** - OS, browser, Node.js version, etc.
- **Screenshots/Logs** - Visual evidence and error logs
- **Minimal Reproduction** - Simplified code that demonstrates the issue

## ✨ Feature Requests

### Before Requesting

1. **Check Existing Requests** - Search for similar feature requests
2. **Consider Alternatives** - Think about different approaches
3. **Assess Impact** - Consider how it affects other users

### Feature Request Template

Use our feature request template and include:

- **Problem Statement** - What problem does this solve?
- **Proposed Solution** - How should it work?
- **User Stories** - Who benefits and how?
- **Technical Considerations** - Implementation complexity
- **Mockups/Examples** - Visual representation if applicable

## 🏆 Recognition

We appreciate all contributions! Contributors will be:

- **Listed in Contributors** - Added to our contributors list
- **Mentioned in Releases** - Credited in release notes
- **Community Recognition** - Highlighted in community channels

### Contribution Types

- 🐛 **Bug Fixes** - Fixing reported issues
- ✨ **Features** - Adding new functionality
- 📝 **Documentation** - Improving docs and guides
- 🧪 **Testing** - Adding or improving tests
- 🎨 **Design** - UI/UX improvements
- 🔧 **Tooling** - Development tools and processes
- 🌍 **Community** - Helping other contributors

## 📞 Getting Help

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and ideas
- **Discord** - Real-time chat with the community
- **Email** - Direct contact with maintainers

### Development Help

- **Setup Issues** - Check our troubleshooting guide
- **Code Questions** - Ask in GitHub Discussions
- **Architecture Decisions** - Review our architecture docs
- **Best Practices** - Follow our coding standards

## 📜 Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

### Our Standards

**Positive Behavior:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable Behavior:**
- Harassment or discriminatory language
- Trolling, insulting, or derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct inappropriate in a professional setting

## 📄 License

By contributing to Dyad, you agree that your contributions will be licensed under the same [MIT License](LICENSE) that covers the project.

---

**Thank you for contributing to Dyad! 🚀**

Your contributions help make AI-assisted development accessible to everyone. Whether you're fixing a typo or adding a major feature, every contribution matters.

*Happy coding!* 💻✨