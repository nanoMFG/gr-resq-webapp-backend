from typing import Optional
from pydantic import BaseModel, Field, AnyUrl
from uuid import UUID


class SEMFile(BaseModel):
  ID: UUID = Field(...)
  experimentID: UUID = Field(...)
  fileName: str = Field(...)
  URL: AnyUrl = Field(...)
  defaultAnalysisID: UUID = Field(...)