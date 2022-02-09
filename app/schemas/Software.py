from typing import Optional, UUID, AnyUrl
from pydantic import BaseModel, Field
from datetime import date


class Software(BaseModel):
  name: str = Field(...)
  version: str = Field(...)
  releaseDate: date = Field(...)
  branch: Optional[str] = Field(None)
  commitSH: Optional[str] = Field(None)
  URL: AnyUrl = Field(...)