# ⚡ DebugArena — Competitive Debugging & Programming Platform

A production-grade, multi-round competitive debugging platform featuring an interactive participant portal, real-time proctoring, live scoreboard, and sandboxed code execution.

---

## 🎯 Architecture
- **Frontend:** React 18, Vite, Tailwind CSS, Monaco Editor / CodeMirror, Lucide Icons.
- **Backend:** Node.js, Express, TypeScript, Socket.IO WebSockets.
- **Database:** PostgreSQL with Prisma ORM.
- **Proctoring:** Live tab-switch detection, fullscreen enforcement, single active session verification.
- **Scoring Engine:** Authoritative background timer, test case evaluations, real-time live projector view.

---

## 🚀 Quick Start (Local & Unified Production)

### 1. Install dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```

### 3. Launch Platform
```bash
npm start
```
Access at [http://localhost:3000](http://localhost:3000).

---

## 🐳 Docker Deployment
```bash
docker compose up --build -d
```
Access at [http://localhost:5173](http://localhost:5173).
