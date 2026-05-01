# Kat Seguros — Linktree Clone

A fashionable, insurance-branded linktree clone built with **Node.js**, **React**, **Express.js**, and **MongoDB**.

![Kat Seguros Preview](https://github.com/user-attachments/assets/f23c8f4e-84f8-41a7-b8a7-9761b2822eac)

## ✨ Features

- 🔗 **Link cards** — customizable links with icons and descriptions
- 📱 **Social network icons** — Instagram, Twitter/X, Facebook, WhatsApp, LinkedIn, and more
- 🎬 **Video embeds** — YouTube and Vimeo inline players (supports `watch?v=`, `youtu.be/`, and `/embed/` URL formats)
- ⚙️ **Admin panel** — full CRUD management (add/edit/delete/reorder/toggle links and edit brand profile)
- 🎨 **Fashion insurance theme** — deep navy + gold glassmorphism design with smooth animations
- 🚀 **Docker ready** — one-command startup with `docker compose up`

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Icons | react-icons |
| HTTP Client | Axios |
| Security | express-rate-limit + express-mongo-sanitize |

## 🚀 Quick Start

### With Docker (recommended)

```bash
docker compose up
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Admin panel: http://localhost:5173/admin

### Without Docker (requires MongoDB)

```bash
# Backend
cd backend
cp .env.example .env        # edit MONGODB_URI if needed
npm install
npm run dev                 # starts on port 5000

# Frontend (separate terminal)
cd frontend
npm install
npm run dev                 # starts on port 5173
```

## 📁 Project Structure

```
katpseguros/
├── backend/
│   ├── src/
│   │   ├── models/        # Mongoose schemas (Profile, Link)
│   │   ├── routes/        # REST API routes (/api/profile, /api/links)
│   │   └── server.js      # Express app + MongoDB connection + seed data
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # ProfileHeader, LinkCard, VideoEmbed, SocialLinks, AdminPanel
│   │   ├── pages/         # LinktreePage (public), AdminPage (admin)
│   │   ├── App.jsx        # React Router setup
│   │   └── index.css      # Tailwind + custom styles
│   └── package.json
└── docker-compose.yml
```

## 🔌 API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/profile` | Get brand profile |
| PUT | `/api/profile` | Update brand profile |
| GET | `/api/links` | Get all active links (public) |
| GET | `/api/links/all` | Get all links including inactive (admin) |
| POST | `/api/links` | Create new link |
| PUT | `/api/links/reorder` | Reorder links |
| PUT | `/api/links/:id` | Update a link |
| DELETE | `/api/links/:id` | Delete a link |

## 🔗 Link Types

| Type | Description |
|---|---|
| `link` | Regular external link with custom icon |
| `social` | Social network icon button (renders in social row) |
| `youtube` | Embedded YouTube player |
| `vimeo` | Embedded Vimeo player |
