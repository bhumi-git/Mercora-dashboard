# Mercora Dashboard

> A modern analytics dashboard for campaign data, anomaly detection, and AI-assisted insights.

Mercora Dashboard is the frontend application for **Mercora**, an analytics platform designed to transform campaign data into actionable insights through interactive visualizations, anomaly detection, and AI-generated explanations.

The dashboard is built with React and Vite and communicates with a separate FastAPI backend.

Here are project related links:

**Live app**: https://mercora-b190.web.app
**Live API docs**: https://mercora-api.onrender.com/docs
**Build Logs Gist**: https://gist.github.com/bhumi-git

---

## ✨ Current Features

- 📊 Interactive campaign analytics dashboard
- 📈 Data visualization and performance metrics
- 🚨 Campaign anomaly detection
- 🤖 AI-assisted explanations and insights
- 🔍 Campaign-level analysis
- 📋 Structured analytics views
- 🎨 Modern and responsive dashboard interface
- 🔗 Integration with the Mercora FastAPI backend

> Features marked or described here may change during development.

---

## 🛠️ Tech Stack

### Frontend

- **React(Vite)**
- **Tailwind CSS v4**
- **Recharts, Lucide icons**
- **JavaScript**
- **HTML5**
- **CSS**
- **npm**

### Backend Integration

The dashboard communicates with the separate Mercora backend:

- **FastAPI**
- **Python**
- **SQLAlchemy**
- **PostgreSQL / Neon**
- **Gemini API**

---

## 🏗️ Architecture

Mercora is being developed as a separate frontend and backend architecture.

```text
                    MERCORA
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
     Mercora Dashboard     Mercora Backend
       React + Vite           FastAPI
              │                 │
              │    API Calls    │
              └────────►────────┘
                                │
                       ┌────────┴────────┐
                       ▼                 ▼
                 PostgreSQL/Neon     Gemini API
