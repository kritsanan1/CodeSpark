# AI Development Rules

This document outlines the tech stack and development rules for the Thai Recovery mobile application. Following these rules ensures consistency and maintainability of the codebase.

## Tech Stack

The application is built using the following technologies:

*   **Framework:** React Native with Expo for cross-platform mobile development.
*   **Language:** TypeScript for type safety and improved developer experience.
*   **Routing:** Expo Router for file-based navigation between screens.
*   **Styling:** Standard React Native `StyleSheet` for all component styling.
*   **Icons:** `lucide-react-native` is the exclusive library for all icons.
*   **Data Persistence:** A custom `DataManager` utility handles storing and retrieving user data locally.
*   **Notifications:** A custom `NotificationManager` utility manages all local notifications.
*   **Gradients:** `expo-linear-gradient` is used for creating gradient backgrounds.

## Development Rules

*   **Component Creation:**
    *   Build all UI components from scratch using core React Native components (`View`, `Text`, `TouchableOpacity`, `ScrollView`, etc.).
    *   Do **not** add any third-party UI component libraries (e.g., React Native Paper, NativeBase). The existing custom component approach should be maintained.

*   **Styling:**
    *   All styles must be defined in a `StyleSheet.create()` object at the bottom of each component file.
    *   Avoid using inline styles to keep the JSX clean and maintainable.
    *   Adhere to the existing design language, color palette, and layout conventions.

*   **Navigation:**
    *   Use the file-based routing system provided by **Expo Router**.
    *   For programmatic navigation (e.g., button presses), import and use the `router` object from `expo-router`.

*   **Icons:**
    *   Only use icons from the `lucide-react-native` library.

*   **State and Data Management:**
    *   For local, component-level state, use React hooks like `useState` and `useEffect`.
    *   For all persistent user data (e.g., profile settings, sobriety date, craving logs), you **must** use the `DataManager` utility. Do not interact with `AsyncStorage` directly.

*   **Utilities:**
    *   Encapsulate reusable logic into utility files within the `src/utils` directory.
    *   All notification-related functionality must be handled through the `NotificationManager`.
    *   Use `expo-linear-gradient` for any UI that requires a color gradient.