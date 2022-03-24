from pydantic import BaseModel, Field
from typing import Optional


class EnvironmentConditions(BaseModel):
  ID: int = Field(..., title="Environment Conditions ID")
  dewPoint: Optional[float] = Field(None, title="Dew Point", description='''
    - std_unit: C
    - conversions:
      - C: 1
    - tooltip: Dew Point of the ambient environment
  ''')
  ambientTemperature: Optional[float] = Field(None, title="Ambient Temperature", description='''
    - std_unit: C
    - conversions:
      - C: 1
    - tooltip: Temperature of the ambient environment
  ''')