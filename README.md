# 🐾 PalBreed AI: Ultimate Palworld Breeding Planner

**A professional-grade breeding calculator and assistant for Palworld**, designed to help players optimize their Paldeck through precise calculations and AI-driven insights.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Language](https://img.shields.io/badge/language-TypeScript-blue)
![Framework](https://img.shields.io/badge/framework-Next.js_15-black)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Features

### Core Features
- **🧬 Breeding Calculator**: Select any two Pals to see their potential offspring based on the "Breeding Power" formula
- **🔍 Reverse Search**: Find which parent combinations lead to a specific target Pal
- **🤖 AI Breeding Assistant**: A built-in "Master Palworld Breeder" AI that answers complex questions about breeding tiers, rare combos, and base stat optimization (without using markdown for a clean interface)
- **🎨 Automated Image Fallbacks**: Intelligent image loading system that attempts multiple sources (GitHub, CDNs) before falling back to unique seeded placeholders
- **🏷️ Type Integration**: Full support for Pal types (Ground, Fire, Dragon, etc.) and rarity tiers

### Advanced Features
- ✅ **Passive Skill Inheritance Tracking**: Monitor skill inheritance across breeding chains
- ✅ **IV (Individual Values) Calculator Integration**: Calculate and track individual values for stat optimization
- ✅ **Pathfinder Tool**: Find the shortest breeding path from a common Pal to a Legendary
- 📅 **User Profiles** (Roadmap): Save favored breeding pairs with user authentication (Firebase)

### Performance Optimizations
- Deferred Google Analytics & Clarity scripts
- Replaced render-blocking avatar images with inline SVG placeholders
- Inlined critical CSS to speed up first paint
- Responsive mobile-first design with CSS keyframes animations
- Optimized bundle size (45.2 kB → 4.01 kB for /pals route)
- Touch-friendly interface with proper hover states

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15+ (App Router) |
| **Language** | TypeScript 5.9+ |
| **Styling** | Tailwind CSS 4.0 |
| **Icons & Animations** | Lucide React + CSS Keyframes |
| **AI/LLM** | OpenRouter API (Gemini-powered) |
| **Database/Auth** | Firebase |
| **Form Handling** | React Hook Form + Resolvers |
| **Package Manager** | npm |

### Key Dependencies
```json
{
  "@google/genai": "^1.17.0",
  "next": "^15.4.9",
  "react": "^19.2.1",
  "firebase": "^12.12.1",
  "lucide-react": "^0.553.0",
  "tailwindcss": "4.1.11",
  "typescript": "5.9.3"
}
```

---

## 🧬 Breeding Logic

The application follows the official Palworld breeding power mechanic:

```
Offspring Power = floor((Parent A Power + Parent B Power + 1) / 2)
```

The calculated offspring is the Pal whose `breedingPower` is **closest to the result**, ensuring accuracy in breeding simulations.

### Example
- Parent A Power: 50
- Parent B Power: 48
- Offspring Power: floor((50 + 48 + 1) / 2) = floor(49.5) = **49**
- Result: Pal with breedingPower closest to 49 is selected

---

## 📁 Project Structure

```
PalWorld/
├── /app                          # Next.js App Router
│   ├── api/chat/route.ts        # AI integration endpoint
│   └── ...                       # Route handlers
├── /components                   # React Components
│   ├── BreedingPlanner.tsx       # Core breeding logic & intersections
│   ├── AIChatAssistant.tsx       # Master Breeder chat interface
│   └── SafeImage.tsx             # Image handling with retry logic
├── /data
│   └── pals.ts                   # Central Pal database (types, power values)
├── /lib                          # Utility functions
│   └── ...                       # Tailwind merging & logic helpers
├── /hooks                        # Custom React hooks
├── /public                       # Static assets
│   └── /offpage-seo              # SEO strategy documentation
├── /deploy_package               # Deployment configuration
├── package.json                  # Dependencies
├── next.config.ts                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── generate-map-data.js          # Data generation script
└── README.md                     # This file
```

---

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/HamzaAhmedAI/PalWorld.git
cd PalWorld

# Install dependencies
npm install

# Set up environment variables
# Create .env.local with required API keys:
# NEXT_PUBLIC_OPENROUTER_API_KEY=your_key_here
# NEXT_PUBLIC_FIREBASE_CONFIG=your_config_here
```

### Development
```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🔮 Roadmap

| Feature | Status | Description |
|---------|--------|-------------|
| Breeding Calculator | ✅ Complete | Core breeding formula and Pal combinations |
| Reverse Breeding Search | ✅ Complete | Find parent combinations for target Pals |
| AI Breeding Assistant | ✅ Complete | Gemini-powered breeding advice |
| Passive Skill Tracking | ✅ Complete | Monitor skill inheritance |
| IV Calculator | ✅ Complete | Optimize stats through IVs |
| Pathfinder Tool | ✅ Complete | Shortest path to Legendary Pals |
| User Authentication | 🔄 In Progress | Firebase integration for saving profiles |
| Community Breeding Chains | 📅 Planned | Share and discover breeding strategies |
| Mobile App | 📅 Planned | Native mobile experience |

---

## 📊 Performance Metrics

### Latest Optimization (June 1, 2026)
- **Bundle Size Reduction**: 45.2 kB → 4.01 kB (/pals route)
- **First Contentful Paint**: Improved with inlined critical CSS
- **Mobile Responsiveness**: Fully responsive design (2-col mobile → 5-col desktop)
- **Touch Support**: Optimized for mobile devices with hover:none media query
- **Analytics Impact**: Deferred script loading for better performance

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenRouter API for AI Features
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

---

## 📈 SEO Strategy

A comprehensive off-page SEO strategy is included in `/public/offpage-seo/`:

- **Reddit Strategy**: Community engagement and organic backlinks
- **Quora Answers**: Authority building through Q&A platforms
- **Pinterest Strategy**: Visual content promotion
- **Directory Submissions**: High-quality backlink sources
- **90-Day Action Plan**: Master calendar for consistent growth

**Goal**: 45-60 quality backlinks in 3 months with $0 budget

For details, see [public/offpage-seo/README.md](public/offpage-seo/README.md)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Steps to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Development Notes

### Key Scripts
- `npm run dev` - Development server with hot reload
- `npm run build` - Optimized production build
- `npm run start` - Run production build
- `npm run lint` - Run ESLint
- `npm run clean` - Clean Next.js cache

### Data Updates
- `node generate-map-data.js` - Generate Pal map data
- `node update-pals-data.js` - Update Pal database
- `node update_pals.js` - Alternative Pal update script

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎯 Project Info

- **Created**: May 3, 2026
- **Last Updated**: July 10, 2026
- **Repository Size**: 1.07 MB
- **Language**: TypeScript
- **Author**: [@HamzaAhmedAI](https://github.com/HamzaAhmedAI)

---

## 🙏 Acknowledgments

- Built with [Google AI Studio](https://ai.google.dev/)
- Powered by [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- AI capabilities powered by [OpenRouter](https://openrouter.ai/) and Google Gemini
- Icons by [Lucide React](https://lucide.dev/)

---

## 📞 Support

For issues, questions, or suggestions, please:
1. Check existing [Issues](https://github.com/HamzaAhmedAI/PalWorld/issues)
2. Create a new [Issue](https://github.com/HamzaAhmedAI/PalWorld/issues/new)
3. Submit a [Discussion](https://github.com/HamzaAhmedAI/PalWorld/discussions)

---

**Happy Breeding! 🐾**

*Created with ❤️ for the Palworld community*
