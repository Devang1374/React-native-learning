This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Speed & Workflow Rules
- **Fast Execution**: Do NOT run slow full-project commands (`npx expo lint`, `tsc --noEmit`, etc.) on simple edits, UI/style tweaks, or when the user asks for quick fixes.
- **Be Direct**: Provide solutions, direct edits, and concise answers immediately without unnecessary analysis or preamble.
- **Git Enabled**: Git is initialized for this project.

## Project Architecture
- `src/app/`: Expo Router screens and `_layout.tsx` navigators.
- `src/components/`: Reusable components (e.g. `WellcomeMessage.tsx`).
- `src/constants/`: Themes and styles (`theme.ts`).

## Commands & Rules
- Use `npx expo install <package>` for adding SDK-compatible dependencies.
- Use **Expo Router** for navigation (`Link`, `router`, `useLocalSearchParams` from `expo-router`).
- Do not edit or create `ios/` or `android/` directories by hand (CNG).
