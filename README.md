# Mercora Dashboard

> A modern analytics dashboard for campaign data, anomaly detection, and AI-assisted insights.

Mercora Dashboard is the frontend application for **Mercora**, an analytics platform designed to transform campaign data into actionable insights through interactive visualizations, anomaly detection, and AI-generated explanations.

The dashboard is built with React and Vite and communicates with a separate FastAPI backend.

---

## 🚧 Project Status

**Currently in active development.**

The dashboard is being developed alongside the Mercora backend. Some features, UI components, and backend integrations are still being refined.

The project will continue to evolve as the complete Mercora platform is developed and deployed.

---

## ✨ Planned / Current Features

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

- **React**
- **Vite**
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
