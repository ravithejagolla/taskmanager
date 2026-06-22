# Task Manager Frontend

This React frontend is part of the Task Manager fullstack application. It provides the user interface for viewing, creating, updating, and deleting tasks.

## Features

- View a list of tasks
- Add new tasks with title and description
- Mark tasks as completed or incomplete
- Delete tasks
- Refresh the task list

## Setup and run

1. Open a terminal inside `Frontend/taskmanager`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend reads the backend origin from the environment variable `VITE_API_BASE`.
If this variable is not set, it defaults to `http://localhost:5000`.

## Build

Create a production build with:
```bash
npm run build
```

Preview the production build with:
```bash
npm run preview
```

## App structure

- `src/App.jsx` — main application UI and API integration
- `src/App.css` — task manager styling
- `src/main.jsx` — React entry point

## Backend requirement

The frontend expects the backend origin to be available at the address configured in `VITE_API_BASE`.
By default this is `http://localhost:5000`, and the frontend will call `/api/task` on that origin.

Start the backend from the `Backend` folder with:
```bash
npm install
npm run dev
```
