import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv


load_dotenv()

SQLALCHEMY_DATABASE_URL = f'postgresql://{os.environ["USER"]}:{os.environ["PASSWORD"]}@{os.environ["HOST"]}:{os.environ["PORT"]}/{os.environ["DATABASE"]}'
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
