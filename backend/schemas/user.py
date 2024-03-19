from typing import Optional
from datetime import datetime

from pydantic import BaseModel

__all__ = ["UserCreate", "User", "UserReponse"]


class UserBase(BaseModel):
    user_name: str
    email: str


class UserCreate(UserBase):
    user_name: str
    email: str
    password: str


class User(UserBase):
    avatar_path: Optional[str]
    phone: Optional[str]
    evaluate: Optional[str]
    coin: Optional[str]

    class Config:
        orm_mode = True


class UserReponse(UserBase):
    id: int
    avatar_path: str
    phone: str
    evaluate: str
    coin: str
    created_at: datetime
    update_at: datetime
