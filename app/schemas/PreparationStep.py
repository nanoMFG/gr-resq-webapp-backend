from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID


class PreparationStep(BaseModel):
  ID: UUID = Field(...)
  recipeID: UUID = Field(...)
  step: Optional[int] = Field(None)
  name: str = Field(...)
  duration: float = Field(...)
  furnaceTemperature: float = Field(...)
  furnacePressure: float = Field(...)
  sampleLocation: Optional[float] = Field(None)
  heliumFlowRate: Optional[float] = Field(None)
  hydrogenFlowRate: Optional[float] = Field(None)
  carbonSourceRate: float = Field(...)
  argonFlowRate: Optional[float] = Field(None)
  coolingRate: Optional[float] = Field(None)
  