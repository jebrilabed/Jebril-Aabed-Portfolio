# 🚀 Jebril Aabed | Modern Interactive Portfolio & AI Assistant

<div align="center">
  <img src="https://jebril-aabed-portfolio.vercel.app/projects/protofolio.png" alt="Portfolio Preview" width="850" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.2);">
  <p align="center">
    <br />
    <a href="https://jebril-aabed-portfolio.vercel.app/"><strong>Explore the Live Portfolio »</strong></a>
    ·
    <a href="https://jebril-aabed-portfolio.vercel.app/journey"><strong>Play the 2D Pixel Journey »</strong></a>
    <br />
    <br />
    <a href="https://github.com/jebrilabed/Jebril-Aabed-Portfolio/issues">Report Bug</a>
    ·
    <a href="https://github.com/jebrilabed/Jebril-Aabed-Portfolio/issues">Request Feature</a>
  </p>
</div>

---

## 🌟 Overview

A high-performance, visually stunning personal portfolio and interactive developer experience built with **Next.js 16 (Turbopack)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

The portfolio features:
- **Gamified 2D Pixel Art Developer Journey (`/journey`)**: A side-scrolling retro experience with animated sprites, physics, sound effects, and bilingual keyboard/touch controls.
- **Production-Ready AI Portfolio Assistant**: A grounded, streaming conversational agent powered by **RAG (Retrieval-Augmented Generation)**, **LangChain**, and **Google Gemini**, with both native TypeScript integration and a dedicated **Python (FastAPI)** microservice.

---

### 🛠 Tech Stack

| Category | Technologies |
|---|---|
| **Frontend Core** | Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS, Framer Motion |
| **Interactive 2D World** | HTML5 Canvas & CSS Sprites, Web Audio API (Retro 8-bit sound synth), Mobile Virtual Touch Controls |
| **AI & Backend** | Python 3.13, FastAPI, Uvicorn, LangChain (LCEL), Google Gemini (3.5 Flash), Google Embeddings, RAG, ChromaDB |
| **Full-Stack & Databases** | Next.js API Routes, PostgreSQL, Prisma ORM, MongoDB, Supabase, Auth.js |
| **Deployment & Tooling** | Vercel, Docker, Postman, ESLint |

<div align="center">

![Next.js 16](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)
![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=chainlink&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75C2?style=for-the-badge&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## ✨ Key Features

### 1. 🤖 AI Portfolio Assistant (RAG + LangChain)
- **Floating AI Chat Widget**: Accessible from every page with smooth open/minimize/close controls, auto-scroll, markdown parsing, and one-click response copy.
- **Hybrid RAG Retrieval**: Combines Google Gemini semantic embeddings (`gemini-embedding-001`) with lexical BM25 token matching for zero-hallucination, strictly grounded answers.
- **Bilingual & RTL Native**: Auto-detects user language (Arabic / English) and formats text with native bidirectional layout (RTL/LTR).
- **Dual Backend Architecture**:
  - **Embedded Engine**: Next.js API route (`/api/chat`) running streaming RAG via `@google/generative-ai` & `@langchain/core`.
  - **Python FastAPI Microservice**: Dedicated service inside `backend/` powered by **FastAPI** + **LangChain** with Server-Sent Events (SSE) streaming and interactive Swagger docs (`/docs`).
  - **Smart Failover**: Next.js proxies incoming requests to the Python server when active, with seamless automatic fallback to the internal engine if offline.

### 2. 🎮 Interactive 2D Pixel Developer Journey (`/journey`)
- **Pixel Art Character Engine**: 5 animated sprite states (`idle`, `walking`, `waving`, `working`, `jumping`) with pixel-exact coordinate locking and zero sub-pixel shimmer.
- **Dual Keyboard Layout Support**: Seamless control using standard English keys (`WASD`, arrow keys, `Space`, `F`, `E`) or Arabic keyboard layout (`ش`, `ي`, `ص`, `ب`, `ث`).
- **Interactive Scenery & Stations**: Side-scrolling parallax world with interactive workstations, credentials terminal, and project showcases.
- **Web Audio API Synth**: Custom retro 8-bit sound effects for footsteps, jumping, waving, and station interactions with mute toggle.
- **Mobile Touch Controls**: Floating on-screen joystick and action buttons for phones and tablets.

### 3. 📜 Intel Storage & Credentials
- **Verified Credentials**: Showcasing industry certifications from **Anthropic** (Claude Code, Subagents, Agent Skills, MCP), **LangChain**, **DataCamp** (MCP, SQL), **TAQAT**, **Meta**, **IEEE**, and **Udemy**.
- **Categorized Tabs**: Filter dynamically across **All Credentials**, **AI & LLMs**, **Frontend & Web**, and **Algorithms & CS / Databases**.

---

## 📂 Project Structure

```text
├── backend/                    # Python & LangChain AI Microservice
│   ├── main.py                 # FastAPI app with CORS, rate limiting, and SSE streaming
│   ├── retriever.py            # LangChain hybrid RAG retriever (Google Embeddings + BM25)
│   ├── prompts.py              # LangChain ChatPromptTemplate with strict guardrails
│   ├── config.py               # Environment variables & configuration
│   ├── test_chat.py            # Terminal script to test the LangChain pipeline
│   ├── requirements.txt        # Python dependencies (fastapi, langchain, google-genai)
│   └── knowledge/              # Structured knowledge base modules (personal, skills, projects)
│
├── src/
│   ├── app/                    # Next.js App Router, layout, metadata & API routes
│   │   ├── api/chat/           # Streaming chat API route with Python proxy & fallback
│   │   ├── api/contact/        # Contact form handler
│   │   ├── journey/            # Interactive 2D Pixel Journey page
│   │   └── layout.tsx          # Root layout with AI Assistant & Theme Provider
│   │
│   ├── components/             # Reusable React components
│   │   ├── ai-assistant/       # Modular AI Chat widget components
│   │   ├── journey/            # 2D character, physics, audio synth, and world scene
│   │   ├── Intel.tsx           # Credentials & certifications display
│   │   ├── Projects.tsx        # Project showcase grid
│   │   └── ...
│   │
│   ├── data/                   # Centralized portfolio data (portfolio.ts)
│   └── lib/                    # Shared utilities, AI client, and RAG knowledge base
│
├── public/                     # Static assets, project thumbnails, and pixel art sprite sheets
├── .env.example                # Example environment variables
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.x
- **Python** >= 3.10 (optional, for running the Python LangChain backend)
- **Google Gemini API Key** (free tier from [Google AI Studio](https://aistudio.google.com/))

---

### 1. Clone the Repository
```bash
git clone https://github.com/jebrilabed/Jebril-Aabed-Portfolio.git
cd Jebril-Aabed-Portfolio
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your configuration:
```env
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional model overrides
GEMINI_MODEL=gemini-3.5-flash
GOOGLE_EMBEDDING_MODEL=gemini-embedding-001

# Optional Python Backend URL (for local development)
PYTHON_BACKEND_URL=http://127.0.0.1:8000
```

---

### 4. Run the Application

#### Option A: Run Next.js Frontend Only
The frontend runs with the built-in TypeScript RAG engine automatically:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Option B: Run with the Python & LangChain Backend
1. **Set up Python Virtual Environment**:
   ```bash
   python -m venv backend/venv
   backend/venv/Scripts/pip install -r backend/requirements.txt
   ```

2. **Start the FastAPI LangChain Server**:
   ```bash
   npm run ai:server
   ```
   * FastAPI runs on: `http://localhost:8000`
   * Interactive Swagger Docs: `http://localhost:8000/docs`

3. **Test the LangChain Pipeline from Terminal**:
   ```bash
   npm run ai:test
   ```

4. **Start the Next.js Frontend**:
   ```bash
   npm run dev
   ```

---

## 🏗 Featured Projects

- **[PayPerView](https://payperview.apps.taqat.academy/en)**: Full-stack influencer marketing platform connecting brands with creators. Served as **AI Engineer & Frontend Team Lead** (*Next.js, React, Tailwind CSS, Python, FastAPI, LangChain, Gemini, RAG, ChromaDB, MongoDB*).
- **[RAWNQ Home & Living](https://rawnq-store-kohl.vercel.app/)**: Multilingual home decor e-commerce platform with live Best Route shipping API integration and Cloudinary media optimization (*Next.js, React, TypeScript, PostgreSQL, Prisma ORM, Auth.js*).
- **[Organaza Fashion](https://organza-fashion.vercel.app/)**: Modern Arabic RTL fashion e-commerce storefront with admin inventory dashboard and integrated AI styling assistant (*Next.js, PostgreSQL, Prisma, Auth.js*).
- **[Bara’a Store](https://bara-a-store.vercel.app/)**: Skincare and fragrance e-commerce store with full Arabic RTL UX and admin management (*Next.js, TypeScript, PostgreSQL, Prisma*).
- **[Academic Library](https://academic-library.vercel.app/)**: Academic resource repository for university students with multi-criteria search and structured courses (*React, Material UI, Axios*).
- **[Educational Platform](https://soft-druid-b82fbd.netlify.app/)**: Interactive learning roadmap and course navigation web application (*JavaScript, Tailwind CSS, HTML5*).
- **[Interactive Portfolio & Pixel Journey](https://jebril-aabed-portfolio.vercel.app/journey)**: Gamified developer portfolio featuring 2D pixel art sprites, Web Audio sound effects, and an AI chat assistant (*Next.js 16, React 19, TypeScript, Framer Motion*).

---

## 📬 Contact & Connect

- **Email**: [jebrilaabed9@gmail.com](mailto:jebrilaabed9@gmail.com)
- **LinkedIn**: [Jebril Aabed](https://www.linkedin.com/in/jebril-aabed-233634289/)
- **GitHub**: [@jebrilabed](https://github.com/jebrilabed)
- **WhatsApp**: [Connect on WhatsApp](https://wa.me/qr/OK4HMSQXWPT2C1)
- **Portfolio**: [jebril-aabed-portfolio.vercel.app](https://jebril-aabed-portfolio.vercel.app/)

---

<div align="center">
  <p>Crafted with precision by <strong>Jebril Aabed</strong></p>
  <p>Show some ❤️ by starring this repository!</p>
  <img src="https://img.shields.io/github/stars/jebrilabed/Jebril-Aabed-Portfolio?style=social" alt="GitHub stars">
</div>
