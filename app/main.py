from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, status
import sys


app = FastAPI()


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


@app.get("*", tags=["404 Not found"], status_code=status.HTTP_404_NOT_FOUND)
async def not_found():
  return {"message": "Requested resource not found"}
