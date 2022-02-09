from pydantic import BaseModel, Field
from typing import UUID, Optional, EmailStr


class EnvironmentConditions(BaseModel):
  ID: UUID = Field(...)
  experiments: Optional[list[UUID]] = Field([])
  dewPoint: Optional[float] = Field(None)
  ambientTemperature: Optional[float] = Field(None)
  