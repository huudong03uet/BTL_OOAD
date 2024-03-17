from fastapi import FastAPI
from sqlalchemy import MetaData
from sqlalchemy.ext.declarative import declarative_base
from orm import Item

from setting import SessionLocal, engine

app = FastAPI()
Base = declarative_base()

metadata = MetaData(bind=engine)
Base.metadata.create_all(bind=engine)
Item.__table__.create(bind=engine, checkfirst=True)


db = SessionLocal()


@app.get("/")
async def root():
    return {"message": "Hello World"}
