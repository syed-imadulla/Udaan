# Team workflow

Branches: main (stable), dev (integration), feature/<name> (one per task).
Preparation branches: feature/backend, feature/frontend, feature/ai-engine, feature/qa-devops.
Hackathon day: short-lived branches such as feat/login-page, merged into dev every 1 to 2 hours.

Rules
- Work only inside your own folder. Ask in the group chat before touching shared files.
- Never use git add . ; add your own folders.
- Pull dev at least every hour: git pull origin dev
- Every pull request is reviewed by the team leader before merging into dev.
- dev is merged into main only when the smoke test passes.
- Commit messages: feat(scope): ..., fix(scope): ..., docs: ..., chore: ...
- Never commit .env or real keys. If a key leaks, revoke it immediately.

Ownership: backend/ and docs/ = Member 1, frontend/ = Member 2, ai-engine/ = Member 3,
tests/, scripts/, .github/workflows/, Dockerfile = Member 4.
