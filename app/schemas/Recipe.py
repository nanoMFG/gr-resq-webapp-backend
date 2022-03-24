from typing import Optional, Literal
from pydantic import BaseModel, Field


class Recipe(BaseModel):
  ID: int = Field(..., title="Recipe ID")
  carbonSource: Literal["CH4", "C2H4", "C2H2", "C6H6"] = Field(..., title="Carbon Source",
    description='''
      - choices: ["CH4", "C2H4", "C2H2", "C6H6"]
    ''',
    max_length=16
  )
  basePressure: float = Field(..., title="Base Pressure", description='''
    - std_unit: Torr
    - conversions:
      - Torr: 1
      - Pa: 1 / 133.322
      - mbar: 1 / 1.33322
      - mTorr: 1.0e-3
      - tooltip: Pressure inside the tube before starting the flow of gases
  ''')