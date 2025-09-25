# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitHub Wrapped - A web application that transforms GitHub activity into beautiful, shareable cards (similar to Spotify Wrapped). Built with Next.js 14, TypeScript, Tailwind CSS, Supabase, and the GitHub API.

**Current Status**: Phase 1 Complete - Spectacular landing page with interactive demo, animations, and all sections built. Production-ready foundation established.

## Development Commands

### Initial Setup
```bash
# Install dependencies
npm install

# Set up environment variables (copy .env.example to .env.local)
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start
```

### Code Quality
```bash
# Run TypeScript type checking
npm run typecheck

# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run E2E tests
npm run test:e2e
```

## Project Architecture

### Tech Stack
- **Frontend Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with glassmorphism effects
- **Database/Auth**: Supabase (PostgreSQL + Auth)
- **APIs**: GitHub GraphQL & REST APIs, Claude API for AI insights
- **Deployment**: Vercel
- **Image Generation**: html-to-image for social sharing
- **Animations**: Framer Motion
- **State Management**: SWR for data fetching

### Core Directory Structure
```
/app - Next.js App Router pages and API routes
  /api - API endpoints for auth, GitHub data, and card generation
  /wrapped/[username] - Dynamic wrapped page for each user
/components - React components organized by feature
  /cards - Individual wrapped card components (12 total)
  /landing - Landing page sections
  /wrapped - Wrapped experience components
/lib - Core utilities and services
  github.ts - GitHub API client with caching
  supabase.ts - Supabase client configuration
/hooks - Custom React hooks for data fetching and state

```

### Completed Features (Phase 1)

**Landing Page Components (All Complete)**:
1. **Hero Section** - Animated gradients, floating preview cards, user counter, scroll indicator
2. **Interactive Demo** - 5-card carousel with auto-advance, navigation, real wrapped data
3. **Features Section** - 9 features with gradient icons, stats grid, background decorations
4. **How It Works Timeline** - 4-step process with animated visuals and progress tracking
5. **Pricing Section** - Free vs Pro comparison with testimonials and guarantees
6. **CTA Section** - Primary CTA, email signup form, social proof metrics
7. **Footer** - Social links, credits, professional polish

**Visual Systems**:
- Dark theme (#0a0a0a) with purple/indigo gradients
- Glassmorphism effects on cards and interactive elements
- Framer Motion animations throughout (60fps performance)
- Mobile-first responsive design
- Particle effects with floating orbs

**Technical Foundation**:
- Next.js 14 with App Router and TypeScript
- Tailwind CSS with custom theme and utilities
- PostCSS + Autoprefixer configured
- All dependencies installed and working
- Production build successful (64kB optimized)

### Key Features & Implementation Notes

1. **GitHub Data Fetching** (`/lib/github.ts`)
   - Uses both GraphQL (contribution calendar) and REST API (detailed stats)
   - Implements aggressive caching in Supabase to avoid rate limits
   - Batch requests where possible
   - 60-second target for full data fetch

2. **Card Components** (`/components/cards/`)
   - 12 unique cards (5 free, 7 pro)
   - Each card is 1200x630px for optimal social sharing
   - Dark theme with purple/indigo gradients
   - Exportable as PNG/JPEG via html-to-image

3. **AI Personality Analysis**
   - Claude API integration for generating personality types
   - Analyzes commit patterns, languages, and contribution times
   - Generates poems from commit messages (pro feature)
   - Caches responses to minimize API calls

4. **Authentication Flow**
   - GitHub OAuth via Supabase Auth
   - Stores user data and wrapped stats in PostgreSQL
   - Row-level security policies for data protection

5. **Share System**
   - Platform-specific sharing (Twitter, LinkedIn, Instagram)
   - Dynamic OG meta tags for link previews
   - Watermark on free tier images
   - Batch download for pro users

## Database Schema

Key tables in Supabase:
- `users` - GitHub user profiles and subscription status
- `wrapped_stats` - Cached GitHub statistics per user/year
- `waitlist` - Email collection for pre-launch
- `shares` - Track sharing analytics

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
ANTHROPIC_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## Development Workflow

1. **Feature Development**
   - Create feature branch from main
   - Implement component with proper TypeScript types
   - Add loading states and error handling
   - Ensure mobile responsiveness
   - Test with mock data first

2. **Performance Considerations**
   - Use dynamic imports for heavy components
   - Implement skeleton loaders for all data fetching
   - Cache GitHub API responses aggressively
   - Optimize images with next/image

3. **Styling Guidelines**
   - Dark theme (#0a0a0a background)
   - Purple/indigo gradients for accents
   - Glassmorphism effects on cards
   - Consistent padding and typography
   - Mobile-first responsive design

## Common Tasks

### Adding a New Card Component
1. Create component in `/components/cards/`
2. Follow existing card structure and styling
3. Ensure 1200x630px dimensions
4. Add to card carousel in `/components/wrapped/card-carousel.tsx`
5. Update types in `/lib/types.ts`

### Modifying GitHub Data Fetching
1. Update queries in `/lib/github.ts`
2. Add caching logic for new endpoints
3. Update `wrapped_stats` table schema if needed
4. Test rate limiting behavior

### Implementing New AI Features
1. Add prompt templates in `/lib/ai-prompts.ts`
2. Cache responses in database
3. Implement fallback for API failures
4. Consider pro vs free tier access
- Always add new tasks and completed tasks to the @TODO.md so nothing is forgotton.