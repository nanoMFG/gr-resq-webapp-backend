from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID


class Properties(BaseModel):
  ID: UUID = Field(...)
  experimentID: Optional[UUID] = Field(None)
  averageThicknessOfGrowth: Optional[float] = Field(None)
  standardDeviationOfGrowth: Optional[float] = Field(None)
  numberOfLayers: Optional[int] = Field(None)
  growthCoverage: Optional[float] = Field(None)
  domainSize: Optional[float] = Field(None)
  shape: Optional[str] = Field(None)
  