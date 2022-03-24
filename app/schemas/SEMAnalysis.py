from typing import Optional
from pydantic import BaseModel, Field, AnyHttpUrl


class SEMAnalysis(BaseModel):
  ID: int = Field(..., title="SEM Analysis ID")
  SEMFileID: int = Field(..., title="SEM File ID")
  softwareName: str = Field(..., title="Analysis Software", max_length=20)
  softwareVersion: str = Field(..., title="Software Version")
  maskURL: AnyHttpUrl = Field(..., title="Mask URL", max_length=256)
  pxPerUm: int = Field(..., title="Pixels/um")
  growthCoverage: Optional[float] = Field(None, title="Growth Coverage", description='''
    - std_unit: %
    - conversions:
      - %: 1
  ''')
  automated: bool = Field(False, title="Automated Detection")