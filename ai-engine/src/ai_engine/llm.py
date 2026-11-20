import json
import os

from dotenv import load_dotenv
from google import genai

load_dotenv()    # finds the .env in the repo root


def _client() -> genai.Client:
    key = os.getenv("GEMINI_API_KEY")
    if not key:
        raise RuntimeError("GEMINI_API_KEY is not set (see .env.example)")
    return genai.Client(api_key=key)


def _model() -> str:
    return os.getenv("GEMINI_MODEL", "gemini-flash-latest")


def ask_llm(prompt: str) -> str:
    """Send a prompt, get plain text back."""
    resp = _client().models.generate_content(model=_model(), contents=prompt)
    return resp.text


def ask_json(prompt: str) -> dict:
    """Ask for JSON output and return it as a Python dict."""
    resp = _client().models.generate_content(
        model=_model(),
        contents=prompt,
        config={"response_mime_type": "application/json"},
    )
    return json.loads(resp.text)
