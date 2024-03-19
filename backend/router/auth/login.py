from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from schemas.user import User
from crud.user import get_user_by_email, get_user_by_user_name
from util.hash_and_verify_password import verify_password
from settings import SessionLocal

router_login = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router_login.get("/login", response_model=User)
def login(
    password: str,
    user_name: Optional[str] = "",
    email: Optional[str] = "",
    db: Session = Depends(get_db)
):
    if user_name:
        user = get_user_by_user_name(db, user_name)
    else:
        user = get_user_by_email(db, email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
        )

    if verify_password(password, user.password):
        return user

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Password incorrect."
    )
