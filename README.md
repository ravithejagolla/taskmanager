# Task Manager

A small fullstack Task Manager application built with React and Node.js.

## Overview

This project includes two separate applications:

- `Backend` — Node.js + Express + MongoDB API
- `Frontend/taskmanager` — React + Vite client interface
## Deployed Link
- Frontend : https://mangertask-app.netlify.app/
- Backend : https://taskmanager-iz3x.onrender.com

The app supports:

- viewing tasks
- adding new tasks
- toggling task completion
- deleting tasks

## Backend

### Location
`Backend`

### Key files

- `src/server.js` — Express server setup and MongoDB connection
- `src/routes/taskRouter.js` — REST API routes for tasks
- `src/controller/taskController.js` — controller actions for CRUD operations
- `src/model/taksmodel.js` — Mongoose task schema

### Setup

1. Change to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or update `.env` with:
   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

## Frontend

### Location
`Frontend/taskmanager`

### Key files

- `src/App.jsx` — task manager interface and API calls
- `src/App.css` — styling for the application
- `src/main.jsx` — React app bootstrap
- `vite.config.js` — development proxy configuration

### Setup

1. Change to the frontend folder:
   ```bash
   cd Frontend/taskmanager
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm run dev
   ```

## Running the application

1. Start the backend from `Backend`:
   ```bash
   npm run dev
   ```
2. Start the frontend from `Frontend/taskmanager`:
   ```bash
   npm run dev
   ```
3. Open the browser at the Vite URL shown in the terminal.

## API Endpoints

- `GET /api/task` — list all tasks
- `POST /api/task` — create a task
- `PUT /api/task/:id` — update a task status
- `DELETE /api/task/:id` — delete a task


