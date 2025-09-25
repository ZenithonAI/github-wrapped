# 🚀 GitHub Wrapped

> Your 2025 coding journey, beautifully visualized

Transform your GitHub activity into stunning, shareable cards that showcase your developer year. Built with Next.js 14, TypeScript, and AI-powered insights.

## 🌟 Features

- **Stunning Visuals**: Beautiful cards designed for social sharing
- **Deep Insights**: AI-powered personality analysis and coding patterns
- **12 Unique Cards**: Overview, Night Owl, Languages, Streaks, and more
- **Share & Export**: Download images and share across platforms
- **Pro Features**: Advanced analytics and custom themes
- **Mobile Responsive**: Perfect experience on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI/UX**: Framer Motion, Glassmorphism effects
- **Backend**: Supabase (Auth + Database)
- **APIs**: GitHub GraphQL/REST, Claude API
- **Payments**: Stripe
- **Deployment**: Vercel

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/codebyaaron/github-wrapped.git
   cd github-wrapped
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Fill in your environment variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
├── app/                 # Next.js App Router
│   ├── api/            # API endpoints
│   ├── wrapped/        # Wrapped pages
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── ui/            # Base UI components
│   ├── cards/         # Wrapped card components
│   ├── landing/       # Landing page sections
│   └── wrapped/       # Wrapped experience
├── lib/               # Utilities and services
│   ├── github.ts      # GitHub API client
│   ├── supabase.ts    # Supabase client
│   └── types.ts       # TypeScript types
└── hooks/             # Custom React hooks
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks
- `npm run format` - Format code with Prettier

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Claude API
ANTHROPIC_API_KEY=your-anthropic-api-key

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

## 🎯 Development Phases

### Phase 1: Foundation (Current)
- [x] Next.js setup with TypeScript and Tailwind
- [x] Landing page components
- [x] Basic UI components
- [ ] Supabase integration
- [ ] Demo cards

### Phase 2: Core Features
- [ ] GitHub API integration
- [ ] Card components (12 total)
- [ ] Image generation
- [ ] Share functionality
- [ ] AI insights

### Phase 3: Launch
- [ ] Performance optimization
- [ ] Analytics
- [ ] SEO optimization
- [ ] Payment processing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Built By

**The Vibe Coder** ([@CodeByAaron](https://twitter.com/CodeByAaron))
- Built with Cursor & Claude Code
- 5 nights of late-night coding sessions

---

⭐ **Star this repo if you like it!**

Built for developers, by a developer. Let's celebrate our coding journeys together! 🌙✨