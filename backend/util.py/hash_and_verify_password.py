import bcrypt


__all__ = ["hash_password", "verify_password"]

ENCODER = 'utf-8'


def hash_password(password: str) -> str:
    hashed_password = bcrypt.hashpw(
        password.encode(ENCODER), bcrypt.gensalt()
    )
    return hashed_password.decode(ENCODER)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode(ENCODER), hashed_password.encode(ENCODER)
    )
