from turtle import title
from typing import Optional
from pydantic import BaseModel, Field


class RamanAnalysis(BaseModel):
  ID: int = Field(..., title="Raman Analysis ID")
  ramanFileID: int = Field(...)
  softwareName: str = Field(..., title="Analysis Software", max_length=20)
  softwareVersion: str = Field(..., title="Software Version", max_length=20)
  xCoord: int = Field(..., title="X Coordinate")
  yCoord: int = Field(..., title="Y Coordinate")
  percent: float = Field(..., title="Characteristic Percent", description='''
    - std_unit: %
    - conversions:
      - %: 1
  ''')
  dToG: float = Field(..., title="Weighted D/G")
  gpToG: float = Field(..., title="Weighted G'/G")
  dPeakShift: Optional[float] = Field(..., title="D Peak Shift", description='''
    - std_unit: cm<sup>-1</sup>
  ''')
  dPeakAmplitude: Optional[float] = Field(None, title="D Peak Amplitude")
  dFWHM: Optional[float] = Field(None, title="D FWHM", description='''
    - std_unit: cm<sup>-1</sup>
  ''')
  gPeakShift: Optional[float] = Field(None, title="G Peak Shift", description='''
    - std_unit: cm<sup>-1</sup>
  ''')
  gPeakAmplitude: Optional[float] = Field(None, title="G Peak Amplitude")
  gFWHM: Optional[float] = Field(None, title="G FWHM", description='''
    - std_unit: cm<sup>-1</sup>
  ''')
  gPrimePeakShift: Optional[float] = Field(None, title="G Prime Peak Shift", description='''
    - std_unit: cm<sup>-1</sup>
  ''')
  gPrimePeakAmplitude: Optional[float] = Field(None, title="G Prime Peak Amplitude")
  gPrimeFWHM: Optional[float] = Field(None, title="G Prime FWHM", description='''
    - std_unit: cm<sup>-1</sup>
  ''')