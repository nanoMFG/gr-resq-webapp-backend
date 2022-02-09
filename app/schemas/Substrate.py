from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID


class Substrate(BaseModel):
  ID: UUID = Field(...)
  catalyst: Optional[str] = Field(None)
  thickness: float = Field(...)
  diameter: Optional[float] = Field(None)
  length: Optional[float] = Field(None)
  surfaceArea: Optional[float] = Field(None)
  
  