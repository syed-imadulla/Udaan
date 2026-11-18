# Project rules for AI coding assistants

## What this project is
A 24-hour hackathon project built by 4 students. Goal: a working, demonstrable MVP, not a perfect product.
Problem statement: (fill in on event day)
If a file named graphify-out/GRAPH_REPORT.md exists, read it before searching the code.

## Layout and ownership
- frontend/   React + Vite + TypeScript + Tailwind (Member 2)
- backend/    Python FastAPI + SQLModel, SQLite by default (Member 1)
- ai-engine/  Python package imported by the backend, never a separate server (Member 3)
- tests/, scripts/, .github/  integration tests, smoke test, CI (Member 4)
- docs/API_CONTRACT.md is the single source of truth for every endpoint.

## Commands
- Backend:  cd backend && uv sync && uv run fastapi dev app/main.py
- AI tests: cd ai-engine && uv run pytest
- Integration tests: uv run --project backend pytest tests
- Frontend: cd frontend && npm install && npm run dev (npm test, npm run build)
- Smoke test: ./scripts/smoke_test.sh

## Rules
1. Only edit files inside the folder you were asked to work in. If another folder needs a change, say so instead of editing it.
2. Follow docs/API_CONTRACT.md exactly. If an endpoint must change, update the contract in the same change and state it clearly.
3. Keep it simple. Do not add a library, framework, service or database without asking first. Prefer the standard library.
4. Never write secrets in code or docs. Read them from environment variables and add the name (not the value) to .env.example.
5. Do not invent endpoints, environment variables or files that are not in the docs. Ask if something is missing.
6. Make small, reviewable changes. After each change, explain what changed, which files, and how to test it.
7. Run the relevant tests or build before saying a task is done, and report the real result.
8. Do not delete or rewrite working code that you were not asked to change.
9. Python: type hints, small functions. TypeScript: strict mode, no any.
10. Build the core user flow first. Polish and extra features come only after the MVP works end to end.

## Git
- Branch from dev, commit messages like feat(scope): message.
- Never commit .env, node_modules, .venv or database files. Never use git add . (add your own folder).

## When unsure
Ask a short question before making an assumption that affects another member's module.
