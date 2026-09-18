# 🚀 Deployment Guide — DebugArena Event Platform

This guide outlines how to deploy both the **Backend** and **Frontend** of the DebugArena Competitive Programming & Debugging Platform.

---

## 🌟 Quick Overview

The platform supports two primary production deployment architectures:
1. **Unified Production Mode (Recommended for Local / Event Server / Cloud VPS):**
   - The compiled frontend (`client/dist`) is served directly by the production Express server on **Port 3000**.
   - Single port for both frontend UI, REST APIs, and real-time Socket.IO WebSockets.
   - Zero CORS issues, automatic fallback routing for React Router.
2. **Containerized Docker Compose Mode (Full Multi-Container Architecture):**
   - Runs **PostgreSQL**, **Redis**, **Judge0 Server**, **Judge0 Worker**, **Backend Node.js API**, and **Frontend Nginx**.

---

## ⚡ Option 1: Unified Production Mode (Fastest & Simplest)

In this mode, both the frontend and backend run seamlessly together on **Port 3000**.

### Step 1: Build Frontend and Backend
From the project root:
```bash
npm run build
```
*(This builds `client/dist` and compiles server TypeScript into `server/dist`)*.

### Step 2: Ensure PostgreSQL Database is Ready
Ensure your PostgreSQL instance is running and migrated:
```bash
# Push schema & seed default data (if not already done)
npm run db:migrate
npm run db:seed
```

### Step 3: Start Production Server
```bash
npm start
```
- Open **http://localhost:3000** in your browser.
- **Participant Portal:** `http://localhost:3000/login`
- **Admin Dashboard:** `http://localhost:3000/admin/login`
- **Public Leaderboard:** `http://localhost:3000/leaderboard`

### 🌐 Accessing from Multiple Devices on College LAN / Wi-Fi
If participants and proctors are on different computers on the same local network:
1. Find the host machine's IPv4 address (`ipconfig` on Windows or `ifconfig` / `ip a` on Linux/macOS, e.g. `192.168.1.50`).
2. Participants simply navigate to:
   ```
   http://192.168.1.50:3000
   ```
3. WebSocket connections automatically resolve to the hosting machine dynamically.

---

## 🐳 Option 2: Docker Compose Deployment

This option starts the entire microservice ecosystem inside isolated Docker containers.

### Prerequisites:
- Ensure **Docker Desktop** is installed and running.

### Step 1: Launch Containers
From the root directory:
```bash
docker compose up --build -d
```

### Step 2: Inspect Container Status
```bash
docker compose ps
```
Services deployed:
- **`debug_frontend`** (Port 5173 / Nginx reverse proxy)
- **`debug_backend`** (Port 3000 / Express & Socket.IO)
- **`debug_postgres`** (Port 5432 / PostgreSQL 15)
- **`debug_redis`** (Port 6379 / Redis 7)
- **`debug_judge0_server`** (Port 2358 / Code Execution Sandbox)
- **`debug_judge0_worker`** (Background isolated execution worker)

### Step 3: Run Database Migrations & Seeds Inside Docker
```bash
docker compose exec backend npx prisma migrate deploy
docker compose exec backend npm run db:seed
```

### Step 4: Access Applications
- Participant & Admin Portal: **http://localhost:5173**
- Backend Health: **http://localhost:3000/api/health**
- Judge0 System Check: **http://localhost:2358/system_info**

### To Stop Containers:
```bash
docker compose down
```

---

## ☁️ Option 3: Cloud Deployment (Render, Railway, or VPS)

### Deploying on a VPS (Ubuntu / Debian / DigitalOcean Droplet / AWS EC2):
1. **Clone repository & install dependencies:**
   ```bash
   git clone <repo-url>
   cd debugging
   npm install
   ```
2. **Setup environment variables (`server/.env`):**
   ```env
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
   JWT_ADMIN_SECRET=your_long_random_admin_secret
   JWT_PARTICIPANT_SECRET=your_long_random_participant_secret
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   ```
3. **Build & run with PM2 (process manager):**
   ```bash
   npm run build
   npm install -g pm2
   pm2 start server/dist/index.js --name "debug-arena"
   pm2 startup
   pm2 save
   ```
4. **Nginx Reverse Proxy & SSL (Optional / Recommended):**
   Configure Nginx to proxy port 80/443 to `http://127.0.0.1:3000` with Certbot for HTTPS.

---

## 🔑 Default Credentials & Roles

| Role | Route | Username / ID | Password |
|---|---|---|---|
| **Admin** | `/admin/login` | `admin` | `adminpassword123` |
| **Team (Python Track)** | `/login` | `PYT01` | `pass123` |
| **Team (C Track)** | `/login` | `C01` | `pass123` |
| **Team (Java Track)** | `/login` | `JAV01` | `pass123` |
| **Public Leaderboard** | `/leaderboard` | *(Public Display)* | *(No auth required)* |

---

## 🛡️ Key Production Safeguards Included
- **Per-Team MCQ Scrambling:** Questions and choices (A, B, C, D) are uniquely randomized per Team ID to prevent screen peeking.
- **Single Active Session Enforcement:** Participants cannot log in on two devices concurrently.
- **Authoritative Server Timer:** Round countdowns are enforced server-side; tampering with client clock has zero effect.
- **Static Asset Serving:** Client bundle is automatically served from backend when running in unified mode.
