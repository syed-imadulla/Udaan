# Backend

## What this is
The FastAPI + SQLModel backend for the Udaan hackathon starter. It uses SQLite by default.
It is a reusable foundation: health, echo, an AI endpoint and a small notes example
that shows the database working.

## Requirements
- Python 3.11+
- [uv](https://docs.astral.sh/uv/)

## Run
```bash
cd backend
uv sync
uv run fastapi dev app/main.py
```
Open http://localhost:8000/docs for the interactive API docs.
Stop the server with Ctrl+C.

## Test
```bash
cd backend
uv run pytest
```
The tests use their own database file, `test_app.db`. It is git-ignored and safe to delete.

## Environment variables
All of these are read from the `.env` file in the repo root. Copy `.env.example` to `.env`
and fill it in. Never commit `.env`.

| Name | Purpose | Default |
| --- | --- | --- |
| DATABASE_URL | Database connection string | `sqlite:///./app.db` (created inside `backend/`) |
| CORS_ORIGINS | Comma-separated origins allowed to call the API | `http://localhost:5173` |
| GEMINI_API_KEY | Key used by the ai-engine package | none |
| GEMINI_MODEL | Model name used by the ai-engine package | see `.env.example` |

## Endpoints
`docs/API_CONTRACT.md` is the single source of truth for every endpoint.

## How to add a route in 3 steps
1. Create `app/routes/<name>.py` with `router = APIRouter()` and your endpoints.
2. In `app/main.py`, import the module and add it to the loop:
   `for module in (health, echo, ai, notes, <name>):`. Every router gets the `/api` prefix.
3. Add the endpoint to `docs/API_CONTRACT.md` in the same change.

## How to switch to Postgres
1. Add `psycopg[binary]` to `dependencies` in `pyproject.toml` (ask the team first), then run `uv sync`.
2. Change only `DATABASE_URL` in `.env`, for example
   `postgresql+psycopg://user:password@localhost:5432/udaan`.

No code changes are needed. `app/db.py` only adds the SQLite-specific option when the URL starts with `sqlite`.

## How the AI package connects
`app/routes/ai.py` imports `ai_engine.llm.ask_llm` inside the request handler,
so the app still starts when the package is missing. Until then `POST /api/ai/ask`
returns 502 with the error in `detail`.
Once Member 3's `ai-engine` is merged into dev, it is added to this project as a
path dependency (pointing at `../ai-engine`) and the endpoint starts returning answers.
