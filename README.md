# Chrono Weaver AI

**Navigate Tomorrow, Today.**

Chrono Weaver AI is a cutting-edge, conceptual platform that harnesses the power of advanced multimodal AI to analyze historical data, industry trends, and user inputs—such as goals, target sectors, and potential disruptions—to generate predictive future scenarios. With interactive, data-driven timeline visualizations, users can explore, refine, and weave their optimal futures.

---

## 🎯 Core Features

- **Predictive Scenario Generation**: Input goals, industry, and time horizons to see AI-crafted timelines.
- **Interactive Timeline Explorer**: Dynamic, scroll- and hover-driven visual interface for exploring multiple potential futures.
- **Step-by-Step Workflow**: Four-step process:
  1. **Input Data**: Define objectives, industry, and horizon.
  2. **AI Analysis**: Securely connect to a multimodal AI backend (e.g., Gemini-like model).
  3. **Visualize**: Render interactive, holographic-style timeline graphs.
  4. **Refine & Explore**: Adjust parameters and drill into insights.
- **Rich Animations & Microinteractions**: Futuristic preloader, parallax scroll, hover glow, and card lift effects.
- **Modular, Responsive Design**: Tailwind CSS + custom CSS ensures seamless experience on desktop, tablet, and mobile.

---

## 🚀 Getting Started

These instructions will help you set up the Chrono Weaver AI front-end and server locally.

### Prerequisites

- Node.js v18+ and npm (or yarn)
- A backend AI key (e.g., `CHRONO_AI_API_KEY`) for connecting to your Gemini-like AI service.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saad-Chaoui/chrono-weaver-ai.git
   cd chrono-weaver-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the root with:
   ```ini
   CHRONO_AI_API_KEY=your_api_key_here
   ```

4. **Run in development mode**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 🗂️ Project Structure

```
├── public/                # Static assets (images, fonts, favicon)
├── src/                   # Front-end source
│   ├── components/        # Reusable React components
│   ├── pages/             # Route-based views
│   ├── styles/            # Custom CSS / Tailwind overrides
│   └── utils/             # Helpers and hooks
├── server/                # Express/TypeScript backend
│   ├── index.ts           # Entry point
│   └── api/               # AI integration endpoints
├── .env                   # Environment variables
├── package.json           # Scripts, dependencies
└── README.md              # You are here!
```

---

## 🔧 Usage

1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Enter your **Goal**, **Industry**, and **Time Horizon** in the **Timeline Explorer (Demo)** section.
3. Click **Generate Prediction**.
4. Watch the placeholder graph animate in; replace with your own data or connect to a live AI backend.

> **Note:** <!-- BACKEND AI integration needed here. Connect to Gemini API using a secure backend process and API Key stored in secrets. -->

---

## 📐 Design & Aesthetics

- **Layout**: Asymmetric grids, generous dark or white space
- **Palette**: Charcoal / midnight blue background with electric cyan, neon magenta, and glowing orange accents
- **Typography**: Modern sans-serif; stylized headings for hierarchy
- **Visuals**: Abstract geometry, neural net motifs, light-trail animations

---

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "feat: Describe your feature here"`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a Pull Request.


---

## 📜 License

This project is licensed under the MIT License.

---

© 2025 Chrono Weaver AI — Weave your optimal future, today.

