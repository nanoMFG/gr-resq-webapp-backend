from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, status, HTTPException, Request
from app.api import auth, experiments
from app.core.config import settings
from .db import query
import httpx

app = FastAPI()
app.include_router(auth.router, prefix='/auth')
app.include_router(experiments.router, prefix='/experiments')
# @app.on_event("startup")


# @app.on_event("shutdown")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/", tags=["Root"], status_code=status.HTTP_200_OK)
async def root():
    return {"message": "Gr-RESQ Backend"}


@app.get('/auth/institutions', status_code=status.HTTP_200_OK)
async def all_institutions():
    result = query.get_all_institutions()
    return result


@app.get("*", tags=["404 Not found"], status_code=status.HTTP_404_NOT_FOUND)
async def not_found():
    return {"message": "Requested resource not found"}
