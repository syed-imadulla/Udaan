from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class EchoIn(BaseModel):
    message: str


@router.post("/echo")
def echo(body: EchoIn):
    return {"message": body.message, "length": len(body.message)}
