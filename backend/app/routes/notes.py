from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select

from app.db import get_session
from app.models import Note

router = APIRouter()


class NoteIn(BaseModel):
    text: str


@router.get("/notes", response_model=list[Note])
def list_notes(session: Session = Depends(get_session)):
    return session.exec(select(Note)).all()


@router.post("/notes", response_model=Note, status_code=201)
def create_note(body: NoteIn, session: Session = Depends(get_session)):
    note = Note(text=body.text)
    session.add(note)
    session.commit()
    session.refresh(note)
    return note


@router.delete("/notes/{note_id}", status_code=204)
def delete_note(note_id: int, session: Session = Depends(get_session)):
    note = session.get(Note, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    session.delete(note)
    session.commit()
