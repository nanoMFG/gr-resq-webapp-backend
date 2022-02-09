from pydantic import BaseModel, Field
from typing import UUID, Optional, EmailStr


class Experiment(BaseModel):
  ID: UUID = Field(...)
  recipeID: UUID = Field(...)
  enivironmentConditionsID: Optional[UUID] = Field(None)
  substrateID: Optional[UUID] = Field(None)
  furnaceID: Optional[UUID] = Field(None)
  primarySEMFileID: Optional[UUID] = Field(None)
  submittedBy: UUID = Field(...)
  materialName: str = Field(...)
  validated: bool = Field(False)
  authors: Optional[list[UUID]] = Field([]) 