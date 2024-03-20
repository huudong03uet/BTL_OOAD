from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from schemas.user import UserCreate
from crud.user import create_user
from settings import SessionLocal

router_sign_up = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router_sign_up.post("/sign_up")
def sign_up(
    user: UserCreate, db: Session = Depends(get_db)
) -> None:
    user, commit = create_user(db, user)

    if not commit:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Create User errors.",
        )

    return user
