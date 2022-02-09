from typing import Optional, UUID
from pydantic import BaseModel, Field


class Institution(BaseModel):
  id: UUID = Field(...)
  name: str = Field(...)
  country: Optional[str] = Field(None)