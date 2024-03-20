from sqlalchemy.orm import Session

import orm
from schemas import user
from util.hash_and_verify_password import hash_password


def get_user(db: Session, id: int):
    return db.query(orm.User).filter(orm.User.id == id).first()


def get_user_by_user_name(db: Session, user_name: str):
    return db.query(orm.User).filter(orm.User.user_name == user_name).first()


def get_user_by_email(db: Session, email: str):
    return db.query(orm.User).filter(orm.User.email == email).first()


def create_user(db: Session, user: user.UserCreate):
    h_password = hash_password(user.password)
    new_user = orm.User(
        email=user.email, user_name=user.user_name, password=h_password
    )
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user, True
    except Exception:
        db.rollback()
        return new_user, False
