
# 🌌 Pandora - Intelligent Prompt Routing

**The Intelligent AI Routing Platform for Modern Dev Teams.**
Pandora is a lightning-fast dashboard designed to analyze developer prompts, calculate real-time token costs, and intelligently route workloads across semantic caches, local AMD inference nodes, and cloud AI models.

**🔗 Live Deployment:** [Pandora Web App](https://pandora-opal-kappa.vercel.app/)
---

##  Key Features

* ** Frictionless Authentication:** Features a beautiful, glassmorphic mock-authentication gate. It is designed specifically for live hackathon demonstrations, allowing instant access without email verification delays or rate limits.
* ** Real-Time Tokenization Engine:** Integrates `js-tiktoken` to accurately predict token consumption for both legacy (GPT-4) and next-gen (GPT-4o) models as the user types.
* ** Dynamic Cost Estimation:** Instantly calculates and compares the estimated input costs across a wide variety of LLM tiers, including OpenAI (GPT-5.5, GPT-5.4) and Anthropic (Claude Opus, Sonnet, Haiku).
* ** Simulated Routing Engine:** Demonstrates intelligent prompt routing. The engine analyzes the payload and simulates a recommendation (e.g., routing to a local Llama-3-8B node) to minimize latency and maximize cost-efficiency.
* ** Modern UI/UX:** Built with a custom, highly responsive, and clean user interface featuring radial gradients, structural grid data displays, and seamless state transitions.

---

##  Tech Stack

* **Frontend Framework:** React.js
* **Build Tool:** Vite
* **Tokenization:** `js-tiktoken` (OpenAI cl100k_base / o200k_base encoding)
* **Styling:** Custom Vanilla CSS (CSS-in-JS injection)
* **Deployment:** Vercel

---

##  Local Development Setup

To run Pandora locally on your machine, follow these steps:

**1. Clone the repository**

```bash
git clone https://github.com/manishkumar134141-spec/Pandora
cd token-counter

```

**2. Install dependencies**

```bash
npm install

```

**3. Start the development server**

```bash
npm run dev

```

**4. View the app**
Open `http://localhost:5173` in your browser.

---