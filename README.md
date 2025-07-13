# 🛠️ NSV Admin Panel

A web-based **Admin Dashboard** for the NSV Highway Inspection App. Built with **React**, this panel enables supervisors and project managers to monitor, and analyze highway inspection data submitted via the mobile app.

---

## 🧰 Features

- 📊 **Dashboard Overview** – Real-time inspection data & summary widgets
- 🗺️ **Map View** – Visualize inspection locations on an interactive map
- 🧾 **Detailed Reports** – View geo-tagged reports with media attachments
- 📦 **Project & Package Tracking** – Track progress by package or region

---

## 🚀 Getting Started

### 1. **Install Dependencies**

```bash
npm install
# or
yarn

2. Start Development Server

npm run dev
# or
yarn dev

The app will run at: http://localhost:3000
⚙️ Tech Stack
Tech	Purpose
React (Vite/CRA)	Frontend framework
Tailwind CSS	Utility-first styling
React Router	SPA routing
Axios	API communication
React Leaflet / Maps	Map visualization
Zustand / Redux	State management
React Query (optional)	Server-state & caching
TanStack Table	Table rendering & filtering
📁 Project Structure

/src
  /components         # Reusable UI elements (tables, modals, buttons)
  /pages              # Route-based views (Dashboard, Users, Reports)
  /hooks              # Custom React hooks
  /services           # API call functions
  /store              # State management (e.g. Zustand/Redux)
  /assets             # Icons, images, logos
  /utils              # Formatters, validators, helpers

🔑 Environment Variables

Create a .env file in the root:

REACT_APP_PUBLIC_API_URL=backend_api_url
REACT_APP_ENV=dev
REACT_APP_GOOGLE_API_KEY=your_google_api_key_here

    Make sure these are injected correctly for deployment.


🚢 Deployment
To Netlify / Vercel / Surge

    Build the app:

npm run build

    Upload the dist/ or build/ folder depending on your bundler.

👨‍💻 Developed By

Ayan Shrivastava & Harshal Bharatkar
Built with ♥️ to digitize highway inspections and improve road safety.