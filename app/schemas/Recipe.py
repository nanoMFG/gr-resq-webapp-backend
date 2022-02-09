from typing import Optional, UUID
from pydantic import BaseModel, Field


class Recipe(BaseModel):
  ID: UUID = Field(...)
  carbonSource: str = Field(...)
  basePressure: float = Field(...)
  