from typing import Optional, UUID
from pydantic import BaseModel, Field


class RamanAnalysis(BaseModel):
  ID: UUID = Field(...)
  ramanFileID: UUID = Field(...)
  softwareName: Optional[str] = Field(None)
  softwareVersion: Optional[str] = Field(None)
  xCoord: Optional[int] = Field(None)
  yCoord: Optional[int] = Field(None)
  percent: float = Field(...)
  dToG: float = Field(...)
  gpToG: float = Field(...)
  dPeakShift: Optional[float] = Field(None)
  dPeakAmplitude: Optional[float] = Field(None)
  dFWHM: Optional[float] = Field(None)
  gPeakShift: Optional[float] = Field(None)
  gPeakAmplitude: Optional[float] = Field(None)
  gFWHM: Optional[float] = Field(None)
  gPrimePeakShift: Optional[float] = Field(None)
  gPrimePeakAmplitude: Optional[float] = Field(None)
  gPrimeFWHM: Optional[float] = Field(None)