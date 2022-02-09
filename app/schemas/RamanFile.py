from typing import Optional
from pydantic import BaseModel, Field, AnyUrl
from uuid import UUID


class RamanFile(BaseModel):
  ID: UUID = Field(...)
  experimentID: UUID = Field(...)
  fileName: str = Field(...)
  URL: AnyUrl = Field()
  wavelength: float = Field(...)
  