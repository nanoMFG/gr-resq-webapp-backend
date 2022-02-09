from typing import Optional, UUID, AnyUrl
from pydantic import BaseModel, Field


class RamanFile(BaseModel):
  ID: UUID = Field(...)
  experimentID: UUID = Field(...)
  fileName: str = Field(...)
  URL: AnyUrl = Field()
  wavelength: float = Field(...)
  