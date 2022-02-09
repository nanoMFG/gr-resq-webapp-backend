from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID


class Recipe(BaseModel):
  ID: UUID = Field(...)
  carbonSource: str = Field(...)
  basePressure: float = Field(...)
  