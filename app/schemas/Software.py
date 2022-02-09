from typing import Optional
from pydantic import BaseModel, Field, AnyUrl
from datetime import date


class Software(BaseModel):
  name: str = Field(...)
  version: str = Field(...)
  releaseDate: date = Field(...)
  branch: Optional[str] = Field(None)
  commitSH: Optional[str] = Field(None)
  URL: AnyUrl = Field(...)