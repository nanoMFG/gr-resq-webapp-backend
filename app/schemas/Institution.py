from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID


class Institution(BaseModel):
  id: UUID = Field(...)
  name: str = Field(...)
  country: Optional[str] = Field(None)