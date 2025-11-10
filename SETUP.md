# Crop Copilot AI - Setup Guide

## Prerequisites

Before running this project, you need to install:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Or use nvm: https://github.com/nvm-sh/nvm#installing-and-updating
   - Verify installation: `node --version` and `npm --version`

## Installation Steps

### 1. Install Node.js
If Node.js is not installed:
- Visit https://nodejs.org/ and download the LTS version
- Run the installer and follow the instructions
- Restart your terminal/PowerShell after installation

### 2. Install Dependencies
Once Node.js is installed, run:
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory:
```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your Supabase credentials:
- Get your Supabase URL and anon key from: https://app.supabase.com
- Open your Supabase project → Settings → API

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```

The application will be available at: `http://localhost:8080`

## Project Structure

```
crop-copilot-ai/
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn-ui components
│   │   ├── AIChatbot.tsx
│   │   ├── Navigation.tsx
│   │   ├── WeatherWidget.tsx
│   │   └── VoiceInterface.tsx
│   ├── pages/          # Page components
│   │   ├── Dashboard.tsx
│   │   ├── CropPlanning.tsx
│   │   ├── AiDoctor.tsx
│   │   ├── Reports.tsx
│   │   └── Auth.tsx
│   ├── contexts/        # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── integrations/   # External service integrations
│   │   └── supabase/
│   └── locales/        # i18n translation files
├── supabase/           # Supabase configuration
│   ├── functions/      # Edge functions
│   └── migrations/     # Database migrations
└── public/             # Static assets
```

## Available Scripts

- `npm run dev` - Start development server (port 8080)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

- ✅ User Authentication (Supabase)
- ✅ Dashboard with farm statistics
- ✅ Crop Planning tools
- ✅ AI Doctor for crop health
- ✅ Reports and analytics
- ✅ AI Chatbot assistant
- ✅ Weather widget
- ✅ Voice interface
- ✅ Multi-language support (English, Hindi, Telugu)
- ✅ Dark/Light theme

## Troubleshooting

### "npm is not recognized"
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`

### Supabase connection errors
- Verify your `.env` file has correct values
- Check that your Supabase project is active
- Ensure the URL and key are correct (no extra spaces)

### Port 8080 already in use
- Change the port in `vite.config.ts` or kill the process using port 8080

## Next Steps

1. Set up your Supabase project at https://app.supabase.com
2. Run the database migrations in `supabase/migrations/`
3. Configure your Supabase project settings
4. Start developing!

