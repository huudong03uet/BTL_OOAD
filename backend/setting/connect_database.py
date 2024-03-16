import os
import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv


load_dotenv()

SQLALCHEMY_DATABASE_URL = f'postgresql+asyncpg://{os.environ.get("USER_NAME")}:{os.environ.get("PASSWORD")}@{os.environ.get("HOST")}/{os.environ.get("DATABSE_NAME")}'
engine = sa.create_engine(SQLALCHEMY_DATABASE_URL)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
