from typing import Optional
from pydantic import BaseModel, Field, AnyUrl
from uuid import UUID


class SEMAnalysis(BaseModel):
  ID: UUID = Field(...)
  SEMFileID: UUID = Field(...)
  softwareName: Optional[str] = Field(None)
  softwareVersion: Optional[str] = Field(None)
  maskURL: AnyUrl = Field(...)
  pxPerUm: int = Field(...)
  growthCoverage: Optional[float] = Field(None)
  automated: bool = Field(False)
  