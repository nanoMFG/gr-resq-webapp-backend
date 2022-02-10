from pydantic import BaseModel, Field
from typing import Optional


class Furnace(BaseModel):
  ID: int = Field(..., title="Furnace ID")
  tubeDiameter: Optional[float] = Field(None, title="Tube Diameter", description='''
    - std_unit: mm
    - conversions:
      - mm: 1
      - inches: 25.4
    - tooltip: Diameter of the furnace tube
  ''')
  tubeLength: Optional[float] = Field(None, title="Tube Length", description='''
    - std_unit: mm
    - conversions:
      - mm: 1
      - inches: 25.4
    - tooltip: Full length of the furnace tube
  ''')
  crossSectionalArea: Optional[float] = Field(None, title="Cross-sectional Area", description='''
    - std_unit: mm<sup>2</sup>,
    - conversions:
      - mm<sup>2</sup>: 1
      - inch<sup>2</sup>: 645.16
  ''')
  lengthOfHeatedRegion: Optional[float] = Field(None, title="Length of the Heated Region", description='''
    - std_unit: mm
    - conversions:
      - mm: 1
      - inches: 25.4
      - tooltip: Length of the heated region of the tube
  ''')