from typing import Optional
from pydantic import BaseModel, Field


class Institution(BaseModel):
  ID: int = Field(...)
  name: str = Field(..., max_length=150)
  country: str = Field(..., max_length=50)