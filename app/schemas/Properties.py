from typing import Optional, UUID
from pydantic import BaseModel, Field


class Properties(BaseModel):
  ID: UUID = Field(...)
  experimentID: Optional[UUID] = Field(None)
  averageThicknessOfGrowth: Optional[float] = Field()