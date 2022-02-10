from typing import Optional
from pydantic import BaseModel, Field, AnyHttpUrl


class SEMFile(BaseModel):
  ID: int = Field(..., title="SEM File ID")
  experimentID: int = Field(..., title="Experiment ID")
  fileName: str = Field(..., title="File Name", max_length=64)
  URL: AnyHttpUrl = Field(..., title="URL", max_length=256)
  defaultAnalysisID: int = Field(..., title="ID of the SEM analysis that is designated as 'default'")