# Palworld Master Breeding Planner

A professional-grade breeding calculator and assistant for Palworld, designed to help players optimize their Paldeck through precise calculations and AI-driven insights.

## 🚀 Features

- **Breeding Calculator**: Select any two Pals to see their potential offspring based on the "Breeding Power" formula.
- **Reverse Search**: Find which parent combinations lead to a specific target Pal.
- **AI Breeding Assistant**: A built-in "Master Palworld Breeder" AI that answers complex questions about breeding tiers, rare combos, and base stat optimization (without using markdown for a clean, structured text output).
- **Automated Image Fallbacks**: Intelligent image loading system that attempts multiple sources (GitHub, CDNs) before falling back to a unique seeded placeholder.
- **Type Integration**: Full support for Pal types (Ground, Fire, Dragon, etc.) and rarity tiers.

## 🛠 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animations**: Motion (framer-motion)
- **Icons**: Lucide React
- **AI**: OpenRouter API (Gemini-powered)

## 🧬 Breeding Logic

The application follows the official Palworld breeding power mechanic:
`Offspring Power = floor((Parent A Power + Parent B Power + 1) / 2)`

The calculated offspring is the Pal whose `breedingPower` is closest to the result.

## 📁 Project Structure

- `/app`: Next.js routes and API endpoints. 
  - `api/chat/route.ts`: Integration with AI models for breeding advice.
- `/components`: 
  - `BreedingPlanner.tsx`: The core logic for finding intersections and combinations.
  - `AIChatAssistant.tsx`: The chat interface for the Master Breeder.
  - `SafeImage.tsx`: Robust image handling with sequential retry logic.
- `/data`:
  - `pals.ts`: The central database of Pals, their types, and breeding power values.
- `/lib`: Helper utilities for Tailwind merging and logic.

## 🔮 Future Roadmap

- [x] Support for Passive Skill inheritance tracking.
- [x] IV (Individual Values) calculator integration.
- [x] "Pathfinder" tool: Find the shortest breeding path from a common Pal to a Legendary.
- [ ] User authentication for saving favored breeding pairs (Firebase).

---
*Created with Google AI Studio Build.*
