from typing import Optional, Literal
from pydantic import BaseModel, Field


class PreparationStep(BaseModel):
  ID: int = Field(..., title="Preparation Step ID")
  recipeID: int = Field(..., title="Recipe ID")
  step: Optional[int] = Field(None)
  name: Literal["Annealing", "Growing", "Cooling"] = Field(..., title="Preparation Step Name", description='''
    - choices: ["Annealing", "Growing", "Cooling"]
  ''')
  duration: float = Field(..., title="Preparation Step Duration", description='''
    - std_unit: min
    - conversions:
      - min: 1
      - sec: 1 / 60.0
      - hrs: 60
    - tooltip: Duration of the step
  ''')
  furnaceTemperature: float = Field(..., title="Furnace Temperature", description='''
    - std_unit: C
    - conversions:
      - C: 1
    - tooltip: Temperature of the furnace during the step
  ''')
  furnacePressure: float = Field(..., title="Furnace Pressure", description='''
    - std_unit: Torr
    - conversions:
      - Torr: 1
      - Pa: 1 / 133.322
      - mbar: 1 / 1.33322
      - mTorr: 1.0e-3
    - tooltip: Pressure in the furnace during the step
  ''')
  sampleLocation: Optional[float] = Field(None, title="Sample Location", description='''
    - std_unit: mm
    - conversions:
      - inches: 25.4
      - mm: 1
    - tooltip: Position of the sample in the tube
  ''')
  heliumFlowRate: Optional[float] = Field(None, title="Helium Flow Rate", description='''
    - std_unit: sccm
    - conversions:
      - sccm: 1
    - tooltip: Leave blank if helium was not used
  ''')
  hydrogenFlowRate: Optional[float] = Field(None, title="Hydrogen Flow Rate", description='''
    - std_unit: sccm
    - conversions:
      - sccm: 1
      - tooltip: Leave blank if hydrogen was not used
  ''')
  carbonSourceRate: float = Field(..., title="Carbon Source Flow Rate", description='''
    - std_unit: sccm
    - conversions:
      - sccm: 1
  ''')
  argonFlowRate: Optional[float] = Field(None, title="Argon Flow Rate", description='''
    - std_unit: sccm
    - conversions:
      - sccm: 1
      - tooltip: Leave blank if argon was not used
  ''')
  coolingRate: Optional[float] = Field(None, title="Cooling Rate", description='''
    - std_unit: C/min
    - conversions:
      - C/min: 1
  ''')