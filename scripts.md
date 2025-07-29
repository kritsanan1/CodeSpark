# Scripts Documentation

## Available Scripts

| Script | Description | Parameters | Example | Troubleshooting |
|--------|-------------|------------|---------|-----------------|
| `dev` | Start development server with hot reload | None | `npm run dev` | **Port in use:** Kill process with `npx kill-port 5000` or set `PORT=3000` |
| `build` | Build application for production | None | `npm run build` | **Build fails:** Clear cache with `npm run clean`, reinstall dependencies |
| `start` | Start production server | None | `npm start` | **Server won't start:** Check `NODE_ENV=production` and build exists |
| `check` | Run TypeScript type checking | None | `npm run check` | **Type errors:** Fix TypeScript issues, ensure all imports are correct |
| `db:push` | Push database schema to database | None | `npm run db:push` | **Connection error:** Verify `DATABASE_URL` is correct and database is running |

## Development Scripts

### `npm run dev`
**Purpose:** Starts the development server with hot module replacement and TypeScript compilation.

**What it does:**
- Starts Express server on port 5000 (or `PORT` env var)
- Enables Vite development server with React Fast Refresh
- Watches for file changes and auto-reloads
- Provides source maps for debugging

**Expected Output:**
```bash
$ npm run dev
[express] serving on port 5000
[vite] Local:   http://localhost:5173/
[vite] Network: http://192.168.1.100:5173/
[vite] ready in 1234ms
```

**Common Issues:**
- **Port already in use:** `Error: listen EADDRINUSE :::5000`
  - Solution: `npx kill-port 5000` or set different port
- **TypeScript errors:** Development server may still run but with warnings
  - Solution: Fix TypeScript issues or temporarily ignore with `// @ts-ignore`

### `npm run build`
**Purpose:** Creates optimized production build of the application.

**What it does:**
- Compiles TypeScript to JavaScript
- Bundles React application with Vite
- Optimizes assets (minification, tree-shaking)
- Generates static files in `dist/` directory
- Builds server-side code with esbuild

**Expected Output:**
```bash
$ npm run build
vite v5.4.19 building for production...
✓ 1234 modules transformed.
dist/public/index.html                   0.45 kB │ gzip:  0.30 kB
dist/public/assets/index-a1b2c3d4.js   123.45 kB │ gzip: 45.67 kB
dist/public/assets/index-e5f6g7h8.css   12.34 kB │ gzip:  3.45 kB
✓ built in 5.67s
```

**Parameters:**
- Environment variables affect build:
  - `NODE_ENV=production` (automatically set)
  - `VITE_API_URL` for API endpoint configuration

**Troubleshooting:**
- **Out of memory:** Increase Node.js memory with `NODE_OPTIONS="--max-old-space-size=4096"`
- **Import errors:** Check all imports use correct paths and extensions
- **Asset loading issues:** Verify public assets are in correct directories

### `npm start`
**Purpose:** Starts the production server using built files.

**Prerequisites:** Must run `npm run build` first

**What it does:**
- Starts Express server in production mode
- Serves static files from `dist/public`
- Runs optimized server-side code
- Uses production environment variables

**Expected Output:**
```bash
$ npm start
[express] serving on port 5000
Server running in production mode
```

**Environment Requirements:**
- `NODE_ENV=production`
- All production environment variables set
- Built files exist in `dist/` directory

**Troubleshooting:**
- **Files not found:** Ensure `npm run build` completed successfully
- **Environment errors:** Check all required env vars are set for production
- **Database connection:** Verify production database is accessible

## Development Tools

### `npm run check`
**Purpose:** Runs TypeScript compiler in check mode without emitting files.

**What it does:**
- Validates TypeScript syntax and types
- Checks for type errors across entire codebase
- Validates import/export statements
- Reports unused variables and unreachable code

**Expected Output (Success):**
```bash
$ npm run check
✓ TypeScript check completed successfully
```

**Expected Output (Errors):**
```bash
$ npm run check
src/components/Editor.tsx:45:12 - error TS2339: Property 'invalidProp' does not exist on type 'EditorProps'.

45   const { invalidProp } = props;
              ~~~~~~~~~~~

Found 1 error in src/components/Editor.tsx:45
```

**Troubleshooting:**
- **Type errors:** Fix TypeScript issues by adding proper types or interfaces
- **Import errors:** Ensure all imports have correct paths and exported types
- **Configuration issues:** Check `tsconfig.json` for correct settings

## Database Scripts

### `npm run db:push`
**Purpose:** Pushes the current database schema to the connected database.

**What it does:**
- Reads schema from `shared/schema.ts`
- Generates SQL migrations
- Applies changes to database
- Updates database structure to match code

**Prerequisites:**
- `DATABASE_URL` environment variable set
- Database server running and accessible
- Proper database permissions

**Expected Output:**
```bash
$ npm run db:push
📦 Pushing schema changes...
✅ Schema pushed successfully
📋 Changes applied:
  - Created table: users
  - Created table: projects
  - Added index: idx_users_email
```

**Parameters:**
- Uses `DATABASE_URL` from environment
- Reads schema from `shared/schema.ts`
- Configuration from `drizzle.config.ts`

**Troubleshooting:**
- **Connection refused:** Check database server is running
- **Permission denied:** Verify database user has CREATE/ALTER permissions
- **Schema conflicts:** May need to manually resolve conflicting changes

## Utility Scripts

### Custom Scripts (Add to package.json)

```json
{
  "scripts": {
    "clean": "rm -rf dist node_modules/.cache",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio",
    "type-check": "tsc --noEmit",
    "preview": "vite preview"
  }
}
```

### Additional Utility Scripts

| Script | Purpose | Usage | Notes |
|--------|---------|-------|-------|
| `clean` | Remove build artifacts and cache | `npm run clean` | Run before fresh install |
| `lint` | Check code style and quality | `npm run lint` | Uses ESLint configuration |
| `lint:fix` | Auto-fix linting issues | `npm run lint:fix` | Fixes auto-fixable issues |
| `test` | Run unit tests | `npm run test` | Uses Vitest test runner |
| `db:generate` | Generate database types | `npm run db:generate` | Creates TypeScript types |
| `db:studio` | Open database GUI | `npm run db:studio` | Visual database browser |
| `preview` | Preview production build | `npm run preview` | Test build locally |

## Script Combinations

### Full Development Setup
```bash
# Complete setup from scratch
npm install
npm run db:push
npm run dev
```

### Production Deployment
```bash
# Build and deploy
npm run check
npm run build
npm start
```

### Testing Workflow
```bash
# Run all checks
npm run lint
npm run check
npm run test
npm run build
```

### Database Management
```bash
# Database workflow
npm run db:generate  # Generate types
npm run db:push      # Apply schema
npm run db:studio    # Browse data
```

## Performance Tips

- **Parallel execution:** Use `npm-run-all` for running multiple scripts
- **Caching:** Enable npm cache for faster installs
- **Memory:** Increase Node.js memory for large builds
- **Incremental builds:** Use Vite's built-in incremental compilation

## Environment-Specific Scripts

### Development
```bash
NODE_ENV=development npm run dev
```

### Staging
```bash
NODE_ENV=staging npm run build
NODE_ENV=staging npm start
```

### Production
```bash
NODE_ENV=production npm run build
NODE_ENV=production npm start
```