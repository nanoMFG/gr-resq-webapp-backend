from pydantic import BaseModel, Field
from typing import Optional, Literal


class Substrate(BaseModel):
  ID: int = Field(..., "Substrate ID")
  catalyst: Literal["Copper", "Palladium", "Platinum", "Other"] = Field(..., title="Catalyst", description='''
    - choices: ["Copper", "Palladium", "Platinum", "Other"]
  ''')
  thickness: float = Field(..., title="Thickness", description='''
    - std_unit: um
    - conversions:
      - um: 1
      - nm: 1 / 1000.0
      - mm: 1000.0
    - tooltip: Thickness of the catalyst used
  ''')
  diameter: Optional[float] = Field(None, title="Diameter", description='''
    - std_unit: mm
    - conversions:
      - mm: 1
      - um: 1 / 1000.0
      - cm: 10.0
    - tooltip: Diameter of the substrate
  ''')
  length: Optional[float] = Field(None, title="Length", description='''
    - std_unit: mm
    - conversions:
      - mm: 1
      - um: 1 / 1000.0
      - cm: 10.0
    - tooltip: Length of the substrate
  ''')
  surfaceArea: Optional[float] = Field(None, title="Sample Surface Area", description='''
    - std_unit: mm<sup>2</sup>
    - conversions:
      - mm<sup>2</sup>: 1
      - um<sup>2</sup>: 1 / 10.0<sup>6</sup>, "cm2": 100.0
      - tooltip: Surface area of the substrate
  ''')