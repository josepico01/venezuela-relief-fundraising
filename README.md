# Melbourne, Australia - Venezuela Earthquake Relief Fundraiser App

A real-time telethon-style dashboard and sales tracking application designed to aid fundraiser events. Specifically built for the **Venezuela Earthquake Disaster Relief** initiative by **Papelón Melbourne** and the **Venezuelan Association of Melbourne**.

This application allows volunteers to track arepa sales in real-time, displaying a dynamic "Telethon" dashboard for the public (TV View) and providing a register interface for staff (Register View).

## 🌟 The Mission

In response to the devastating earthquake in Venezuela, this fundraiser was established to provide urgent relief and support to affected communities. Organized by **Papelón Melbourne** and the **Venezuelan Association of Melbourne**, the initiative brings the community together to raise vital funds.

The goal is to leverage technology to create a transparent, engaging, and efficient fundraising experience. Every arepa sold is a contribution toward food, medicine, and reconstruction for those in need, turning a local event in Melbourne into a lifeline for those back home in Venezuela.

## 🚀 Key Features

- **Live TV Dashboard**: High-visibility metric display cards tracking total arepas sold and funds raised.
- **Real-time Synchronization**: Powered by Firebase Firestore for instant updates across all devices at the venue.
- **Register Terminal**: Easy-to-use interface for volunteers to record sales with quick-add presets.
- **Goal Celebrations**: Automated confetti and overlay alerts when sales milestones and the final goal are reached.
- **Volunteer Ticker**: A scrolling marquee "News Report" ticker highlighting the heroes on duty.
- **Administrative Suite**: Hard reset database, export CSV logs, and dynamic configuration of goals/prices.
- **Robust Offline Support**: LocalStorage fallbacks ensure the app remains functional even with spotty venue Wi-Fi.
- **Dark & Light Mode**: Seamless theme switching for different environments.

## 🛠 Tech Stack

- **Frontend**: React 19 (Vite)
- **Database**: Firebase Firestore (Real-time sync)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Canvas Confetti
- **State Management**: React Hooks (Custom `useFundraiser` hook)

## 📦 Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd venezuela-relief-fundraising
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase (Environment Variables)**
   The app reads Firebase configuration from environment variables. Create a `.env` file in the root directory and add your credentials:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"
   VITE_APP_ID="your-custom-app-identifier"
   ```
   *Note: All variables must be prefixed with `VITE_` to be accessible in the React application.*

4. **Run in development mode**
   ```bash
   npm run dev
   ```
   The app will typically be available at `http://localhost:5173`.

5. **Build for production**
   ```bash
   npm run build
   ```
   The production-ready files will be in the `dist/` directory.

## 📂 Project Structure

The project follows a modular structure to separate concerns and improve maintainability:

- **`src/hooks/`**: Centralized logic and state.
  - `useFundraiser.js`: Custom hook managing Firebase sync, theme state, and fundraiser calculations.
- **`src/components/`**: Modular UI components.
  - `ViewManager.jsx`: Controls which main view (TV, Register, Admin) is active.
  - `AccessPortal.jsx`: Entry screen for role selection and PIN verification.
  - `TvView.jsx` / `RegisterView.jsx` / `AdminView.jsx`: Feature-specific views.
  - `Logos.jsx`: High-quality SVG logos with PNG image fallback support.
  - `Common.jsx`: Shared components like `StatusBanner` and `ResetModal`.
- **`src/utils/`**: Utility functions.
  - `confetti.js`: Handlers for celebration effects.
- **`public/assets/`**: Optional branding assets.
  - *Note: PNG logos are optional. If missing, the app automatically falls back to embedded SVG versions.*

## 🖥 How to Use (Roles & Views)

The app uses URL parameters and LocalStorage to manage different views:

- **Public TV View**: Access via `http://localhost:5173/?tv`
  - *Best for large monitors/projectors at the event.*
- **Volunteer Register**: Access via `http://localhost:5173/` and select "Volunteer Register".
  - *Requires a PIN (Default/fallback is defined in the code).*
- **Admin Panel**: Access via `http://localhost:5173/` and select "System Settings & Admin".
  - *Allows database resets, CSV exports, and goal adjustments.*

## 🤖 AI Co-Pilot & Prompt Architecture

This project was built utilizing a Human-AI collaborative development lifecycle, using **Gemini** as a high-speed pair programmer. Rather than relying on AI for blind code generation, it was leveraged strategically to accelerate scaffolding, UI implementation, and boilerplate logic under an intense 72-hour delivery window.

### 👥 System Roles & Workflow
* **Human (Architect/Lead Engineer):** System architecture design, state management strategy, security rules config, layout UX wireframing, component composition, and local browser persistence engine.
* **AI (Gemini - Pair Programmer):** Tailored component boilerplate generation, Tailwind utility class composition, complex logical switch-case mapping, and edge-case unit logic.

### 📐 Prompt Engineering Strategies Used

To ensure production-grade code, the following prompt structuring methodologies were used:

1. **Role-Based System Prompts:**
   To isolate layout logic from system architecture, the AI context was locked before generating components:
   > *"Act as a Senior React Engineer specializing in Vite and utility-first frameworks. Write a lightweight, self-contained component using Tailwind CSS that adheres to structural layout design..."*

2. **Contextual Constraints & Pseudo-coding:**
   To build the offline-first sync fallback without bloated libraries, a strict constraint-first prompt loop was used:
    * **The Prompt Structure:** `[Context of Firestore snapshots]` -> `[Constraint: LocalStorage fallback buffer]` -> `[Expected Output format: Functional React Hook]`.

3. **Iterative Refactoring Loops:**
   For complex logic (like managing the dynamic color shifting of the progress bar to match the Venezuelan flag), an iterative refinement strategy was used:
    * *Step 1:* Request pure functional logic based on data thresholds.
    * *Step 2:* Supply the resulting code back with specific edge cases: *"Refactor this to ensure that if network latency delays data sync, state transitions gracefully without component flashes."*

---

**Developed with ❤️ in support of the Venezuelan community in Melbourne and in solidarity with the victims of the earthquake in my homeland, Venezuela.**
