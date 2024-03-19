from fastapi import FastAPI

from router.auth import router_auth

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(router_auth, prefix="/auth")
