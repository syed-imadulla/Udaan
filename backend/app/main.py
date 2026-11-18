import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()  # finds the .env in the repo root

from app.db import init_db  # noqa: E402
from app.routes import ai, echo, health, notes  # noqa: E402


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    yield


app = FastAPI(title="Hackathon API", lifespan=lifespan)
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(CORSMiddleware, allow_origins=origins,
                   allow_methods=["*"], allow_headers=["*"])

for module in (health, echo, ai, notes):
    app.include_router(module.router, prefix="/api")
