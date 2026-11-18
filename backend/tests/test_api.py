import os

os.environ["DATABASE_URL"] = "sqlite:///./test_app.db"  # set before importing the app

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c


def test_health(client):
    assert client.get("/api/health").json() == {"status": "ok"}


def test_echo(client):
    r = client.post("/api/echo", json={"message": "hello"})
    assert r.status_code == 200
    assert r.json() == {"message": "hello", "length": 5}


def test_echo_rejects_missing_message(client):
    assert client.post("/api/echo", json={}).status_code == 422


def test_notes_crud(client):
    created = client.post("/api/notes", json={"text": "first"})
    assert created.status_code == 201
    note_id = created.json()["id"]
    assert any(n["id"] == note_id for n in client.get("/api/notes").json())
    assert client.delete(f"/api/notes/{note_id}").status_code == 204
    assert client.delete(f"/api/notes/{note_id}").status_code == 404


def test_ai_ask_fails_cleanly_without_ai_setup(client):
    r = client.post("/api/ai/ask", json={"prompt": "hi"})
    assert r.status_code in (200, 502)  # 502 until ai-engine and a key exist
