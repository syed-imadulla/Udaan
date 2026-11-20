# Udaan Frontend

## 1. What is in this folder

The `frontend/` folder contains the React frontend for the Udaan hackathon starter.

- **React + TypeScript**: Builds the user interface with typed components.
- **Vite**: Runs the local development server and creates production builds.
- **Tailwind CSS**: Provides utility-based styling.
- **Routing**: `react-router-dom` handles the Home (`/`) and Demo (`/demo`) pages.
- **Reusable components**: Button, Card, Input, Modal and Table are in `src/components/`.
- **API client and mock data**: `src/lib/api.ts` is the frontend's API client. Mock responses are in `src/mocks/`.

## 2. How to run it

From the `frontend/` directory, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local development URL:
[http://localhost:5173](http://localhost:5173)

## 3. How to switch between mock and real API

The frontend reads its API settings from environment variables.

- **Mock mode**: Set `VITE_USE_MOCK=true` in `.env.local`. The frontend uses the local responses in `src/mocks/` and does not need the backend running.
- **Real API mode**: Set `VITE_USE_MOCK=false` in `.env.local`, start the FastAPI backend, and use `VITE_API_URL` if the backend is hosted at a different base URL. When `VITE_API_URL` is empty, the Vite development proxy forwards `/api` requests to `http://localhost:8000`.

The local `.env.local` file is ignored by Git. Do not commit secrets or real API keys. `.env.example` provides the environment-variable names.

## 4. How to run tests

Run the frontend test suite:

```bash
npm test
```

Create and verify a production build:

```bash
npm run build
```
