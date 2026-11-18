from dotenv import load_dotenv
from sqlmodel import Session, select

load_dotenv()  # same .env as the server, so the seed goes to the same database

from app.db import engine, init_db  # noqa: E402
from app.models import Note  # noqa: E402


def seed() -> None:
    init_db()
    with Session(engine) as session:
        if session.exec(select(Note)).first():
            print("already seeded")
            return
        session.add_all([Note(text="Welcome to Udaan"),
                         Note(text="Edit app/seed.py to add your demo data")])
        session.commit()
        print("seeded")


if __name__ == "__main__":
    seed()
