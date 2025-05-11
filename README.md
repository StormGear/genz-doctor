# GenZ Doctor 💊⛓️

A modern health platform that combines AI analysis with medical expertise, designed with a clean, user-friendly interface for the next generation of healthcare users. Alternatively login with socials and start a healthy-life onchain with our CivicWeb3 integrations, giving you your own wallet onchain💊⛓️

## Features

- **AI-Powered Symptom Analysis**: Get instant insights about your health conditions
- **Medical Image Analysis**: Upload images for AI-assisted medical evaluation
- **Virtual Doctor Consultations**: Connect with healthcare professionals
- **Personalized Health Tracking**: Save and monitor your health history
- **Family Health Management**: Create profiles for family members (Family plan)
- **Cross-Platform Support**: Access your health information anywhere

## Tech Stack

- **Frontend**: React with TypeScript
- **UI Components**: Shadcn/UI component system
- **Authentication**:
  - Email/password authentication
  - Civic authentication integration
- **Routing**: React Router
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom gradient styles

## File Structure

```
src/
├── components/      # Reusable UI components
│   ├── ui/          # Base UI components from Shadcn
|   ├── WalletStatus.tsx  # Contains integrations for embedded wallets
├── context/         # React context providers
│   ├── AuthContext.tsx  # Authentication state management
├── hooks/           # Custom React hooks
├── pages/           # Main application pages
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Pricing.tsx
│   └── ...
├── styles/          # Global styles
└── main.tsx         # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- bun

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/genz-health-ai-doc.git
   cd genz-health-ai-doc
   bun install

   ```

2. Start the development server
   ```bash
   bun run dev
   ```

## LICENSE
MIT LICENSE

## Authors
[StormGear](https://github.com/StormGear), Software Developer
[Qwekumingle](https://github.com/Qwekumingle), Medical Doctor


