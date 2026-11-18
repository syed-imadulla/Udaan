from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


class AskIn(BaseModel):
    prompt: str


@router.post("/ai/ask")
def ask(body: AskIn):
    try:
        # imported here so the app still starts before the AI package exists
        from ai_engine.llm import ask_llm
        return {"answer": ask_llm(body.prompt)}
    except Exception as exc:  # missing package, missing key, quota, network
        raise HTTPException(status_code=502, detail=str(exc))
