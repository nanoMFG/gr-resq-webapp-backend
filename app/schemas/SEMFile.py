from typing import UUID, Optional, AnyUrl
from pydantic import BaseModel, Field


class SEMFile(BaseModel):
  ID: UUID = Field(...)
  experimentID: UUID = Field(...)
  fileName: str = Field(...)
  URL: AnyUrl = Field(...)
  defaultAnalysisID: UUID = Field(...)