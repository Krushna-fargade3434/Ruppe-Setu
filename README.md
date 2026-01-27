# Rupee-Setu

**Your Money, Your Control** - A modern personal finance tracker for students

## About

Rupee-Setu is a web-based expense and income tracking application designed specifically for students. Built with React, TypeScript, and Supabase, it provides a simple and intuitive interface to manage your finances.

## Features

- 💰 Track income and expenses
- 📊 View financial statistics and summaries
- 🔐 Secure authentication with Supabase
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with shadcn/ui components
- 🌙 Clean and intuitive interface

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Backend**: Supabase (PostgreSQL + Auth)
- **State Management**: React Query + Context API
- **Form Handling**: React Hook Form + Zod
- **Routing**: React Router DOM

## Prerequisites

- Node.js 16+ and npm (or use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Supabase account and project

## Setup Instructions

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd PAISA-VAULT
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   
   Run the migration file in your Supabase SQL editor:
   - Navigate to `supabase/migrations/20260109134755_d6bab5c3-42e8-4801-a997-07f2bea4c48b.sql`
   - Copy and execute the SQL in your Supabase project

5. **Start the development server**
   ```sh
   npm run dev
   ```
   
   The app will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
PAISA-VAULT/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── ui/        # shadcn/ui components
│   │   ├── dashboard/ # Dashboard-specific components
│   │   └── layout/    # Layout components
│   ├── pages/         # Route pages
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   ├── integrations/  # Third-party integrations (Supabase)
│   └── lib/          # Utility functions
├── supabase/         # Supabase configuration and migrations
└── public/           # Static assets
```

## Database Schema

- **profiles** - User profiles with display names and budgets
- **income** - Income transaction records
- **expenses** - Expense transaction records with categories

All tables have Row Level Security (RLS) enabled for data protection.

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request
