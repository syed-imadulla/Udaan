# API Contract v1

Base URL in development: http://localhost:8000 (the frontend proxies /api to it).
All endpoints live under /api and use JSON.
Errors use the HTTP status code and the body {"detail": "human readable message"}.
Status codes: 200 ok, 400 bad input, 404 not found, 422 validation error, 502 AI/upstream failure.

| Method | Path | Request body | Success response |
| --- | --- | --- | --- |
| GET | /api/health | none | {"status": "ok"} |
| POST | /api/echo | {"message": string} | {"message": string, "length": number} |
| POST | /api/ai/ask | {"prompt": string} | {"answer": string} |

## Adding an endpoint (copy this block)
- Method and path:
- Purpose (one line):
- Request body:
- Success response:
- Errors:
- Owner (builds it) / Consumer (calls it):
- Mock example added to frontend/src/mocks/index.ts: yes / no

Changing this file is a pull request that the team leader approves and that tags every member it affects.
