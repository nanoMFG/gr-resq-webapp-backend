from typing import Optional
from pydantic import BaseModel, Field, AnyHttpUrl


class RamanFile(BaseModel):
  ID: int = Field(..., title="Raman File ID")
  experimentID: int = Field(..., title="Experiment ID")
  fileName: str = Field(..., title="File Name", max_length=64)
  URL: Optional[AnyHttpUrl] = Field(..., title="URL", max_length=256)
  wavelength: float = Field(..., title="Wavelength", description='''
    - std_unit: nm
    - conversions:
      - nm: 1
  ''')