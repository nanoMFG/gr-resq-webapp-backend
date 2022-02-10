from typing import Optional, Literal
from pydantic import BaseModel, Field


class Properties(BaseModel):
  ID: int = Field(..., title="Properties ID")
  experimentID: int = Field(..., title="Experiment ID")
  averageThicknessOfGrowth: Optional[float] = Field(None, title="Average Thickness of Growth", description='''
    - std_unit: nm
    - conversions:
      - nm: 1
    - tooltip: Thickness of graphene present on the catalyst
  ''')
  standardDeviationOfGrowth: Optional[float] = Field(None, title="Standard Deviation of Growth", description='''
    - std_unit: nm
    - conversions:
      - nm: 1
  ''')
  numberOfLayers: Optional[int] = Field(None, title="Number of Layers", description='''
    - tooltip: Number of layers of graphene present on the catalyst                                      
  ''')
  growthCoverage: Optional[float] = Field(None, title="Growth Coverage", description='''
    - std_unit: %,
    - conversions":
      - %: 1
    - tooltip: Percentage of area covered by graphene, for a minimum area of 100 x 100 microns
  ''')
  domainSize: Optional[float] = Field(None, title="Domain Size", description='''
    - std_unit: um<sup>2</sup>
    - conversions:
      - um<sup>2</sup>: 1
    - tooltip: Average size of graphene domains on the sample
  ''')
  shape: Optional[Literal["Nondescript", "Hexagonal", "Square", "Circle"]] = Field(None, title="Shape",
  description='''
    - choices: ["Nondescript", "Hexagonal", "Square", "Circle"]
    - tooltip: Shape of the graphene domains
  ''',
  max_length=32)