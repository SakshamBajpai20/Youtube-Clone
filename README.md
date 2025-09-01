# 📖 YouTube Clone -- Full Stack Project Documentation

## 📌 1. Introduction

The **YouTube Clone** is a full-stack application built using the **MERN
stack (MongoDB, Express.js, React, Node.js)**.\
It allows users to: - Sign up and log in\
- Browse videos (seeded or from API)\
- View video details\
- Explore channel pages

The design and functionality are modeled after **YouTube**, providing a
familiar and user-friendly interface.

------------------------------------------------------------------------

## 📌 2. Project Structure

    youtube-clone/
    │
    ├── backend/                  # Express + MongoDB server
    │   ├── src/
    │   │   ├── models/           # Mongoose models
    │   │   ├── routes/           # Express routes
    │   │   ├── controllers/      # Route handlers
    │   │   ├── seed.js           # Seeds sample videos
    │   │   └── server.js         # Server entry point
    │   ├── package.json
    │   └── .env
    │
    ├── frontend/                 # React + Vite frontend
    │   ├── src/
    │   │   ├── components/       # Reusable UI components
    │   │   ├── pages/            # Home, VideoPage, AuthPage
    │   │   ├── services/         # API wrapper (axios)
    │   │   ├── context/          # AuthContext
    │   │   └── App.jsx           # App routes
    │   ├── package.json
    │   └── vite.config.js

------------------------------------------------------------------------

## 📌 3. Backend

### 🔹 Tech Stack

-   **Node.js** (runtime)\
-   **Express.js** (framework)\
-   **MongoDB + Mongoose** (database)\
-   **JWT Authentication**\
-   **bcryptjs** (password hashing)

### 🔹 Setup

``` bash
cd youtube-clone/backend
npm install
```

`.env` file:

``` env
MONGO_URI=mongodb://127.0.0.1:27017/youtube_clone
JWT_SECRET=supersecret123
PORT=5000
```

### 🔹 Scripts

``` json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js",
  "seed": "node src/seed.js"
}
```

Run backend:

``` bash
npm run seed   # populate sample data
npm run dev    # start server at http://localhost:5000
```

------------------------------------------------------------------------

## 📌 4. Backend Models

### User Model

-   username\
-   email\
-   password (hashed)

### Channel Model

-   name\
-   description\
-   user (reference to User)

### Video Model

-   title\
-   description\
-   videoUrl\
-   thumbnailUrl\
-   channel (reference to Channel)

------------------------------------------------------------------------

## 📌 5. Backend Routes

  Route                  Method   Description
  ---------------------- -------- ----------------------------
  `/api/auth/register`   POST     Register a new user
  `/api/auth/login`      POST     Login and get JWT token
  `/api/videos`          GET      Fetch all videos
  `/api/videos/:id`      GET      Fetch a single video
  `/api/channels/:id`    GET      Fetch channel + its videos

------------------------------------------------------------------------

## 📌 6. Frontend

### 🔹 Tech Stack

-   **React (Vite)**\
-   **Axios** (API requests)\
-   **React Router** (routing)

### 🔹 Setup

``` bash
cd youtube-clone/frontend
npm install
npm run dev
```

Frontend runs at → <http://localhost:5173>

------------------------------------------------------------------------

## 📌 7. Frontend Pages

### 🔹 Home Page

-   Fetches all videos (`/api/videos`)\
-   Displays in a **grid** using `VideoCard` component

### 🔹 Video Page

-   Fetches single video (`/api/videos/:id`)\
-   Displays video player, title, description

### 🔹 Auth Page

-   Register & Login form\
-   Uses JWT + stores token in `localStorage`\
-   Updates **AuthContext**

------------------------------------------------------------------------

## 📌 8. Auth Flow

1.  User registers or logs in → gets a **JWT**.\
2.  Token stored in `localStorage`.\
3.  `setAuthToken(token)` sets Authorization headers for API.\
4.  Navbar shows **Sign In / Logout** based on AuthContext.

------------------------------------------------------------------------

## 📌 9. Database Seeding

To provide demo content:

``` bash
cd youtube-clone/backend
npm run seed
```

This creates: - 1 test user\
- 1 demo channel\
- 2 demo videos (with working thumbnails & URLs)

------------------------------------------------------------------------

## 📌 10. Running the Project

### Step 1: Start backend

``` bash
cd youtube-clone/backend
npm run dev
```

Backend → <http://localhost:5000>

### Step 2: Start frontend

``` bash
cd youtube-clone/frontend
npm run dev
```

Frontend → <http://localhost:5173>

------------------------------------------------------------------------

## 📌 11. Future Enhancements

-   Video upload with **Multer + Cloudinary**\
-   Like/Dislike system\
-   Subscriptions to channels\
-   Comment system\
-   YouTube API integration for real-time videos

------------------------------------------------------------------------

✅ With this documentation, you can:\
- Set up backend & frontend\
- Seed demo videos\
- Browse videos on Home page\
- Watch details on Video page\
- Sign in/out properly
