from typing import Optional
from pydantic import BaseModel, Field, AnyHttpUrl
from datetime import date


class Software(BaseModel):
  name: str = Field(..., title="Software Name", max_length=20)
  version: str = Field(..., title="Software Version", max_length=20)
  releaseDate: date = Field(..., title="Release Date")
  branch: str = Field(None, title="Branch", max_length=32)
  commitSH: str = Field(None, title="Commit SHA", max_length=64)
  URL: AnyHttpUrl = Field(..., title="URL")