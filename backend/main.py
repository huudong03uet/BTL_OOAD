from fastapi import FastAPI

from setting import SessionLocal

app = FastAPI()


db = SessionLocal()


@app.get("/")
async def root():
    return {"message": "Hello World"}
