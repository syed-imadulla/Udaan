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

## Database
SQLite by default: the file `backend/app.db` is created on first start and is git-ignored.

**Seed demo data**
```bash
cd backend
uv run python -m app.seed
```
It prints `seeded` the first time and `already seeded` after that. Edit `app/seed.py` to add your own demo data.

**Add a table**
1. In `app/models.py`, copy the `Note` model, rename it and add your fields.
2. Delete `backend/app.db`. There are no migrations, so existing tables are not altered.
3. Restart the server. The new table is created on startup.

**Switch to Postgres**
1. `uv add "psycopg[binary]"` (ask the team first: it adds a dependency).
2. Set `DATABASE_URL` in `.env` to the Supabase or Render connection string.
   `postgres://` and `postgresql://` URLs are converted to the psycopg driver automatically.
3. Restart the server.

**Warning:** on Render's free tier the disk is wiped on every deploy and restart,
so SQLite data is lost. Use Postgres for anything you need to keep.

## How the AI package connects
`app/routes/ai.py` imports `ai_engine.llm.ask_llm` inside the request handler,
so the app still starts when the package is missing. Until then `POST /api/ai/ask`
returns 502 with the error in `detail`.
Once Member 3's `ai-engine` is merged into dev, it is added to this project as a
path dependency (pointing at `../ai-engine`) and the endpoint starts returning answers.
