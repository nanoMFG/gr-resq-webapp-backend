from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID


class EnvironmentConditions(BaseModel):
  ID: UUID = Field(...)
  experiments: Optional[list[UUID]] = Field([])
  dewPoint: Optional[float] = Field(None)
  ambientTemperature: Optional[float] = Field(None)
  