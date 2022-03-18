from pydantic import BaseModel, Field
from typing import Optional, Literal
from uuid import UUID


class Experiment(BaseModel):
  ID: int = Field(..., title="Experiment ID")
  recipeID: int = Field(..., title="Recipe ID")
  enivironmentConditionsID: int = Field(..., title="Environment Conditions ID")
  substrateID: int = Field(..., title="Substrate ID")
  furnaceID: int = Field(..., title="Furnace ID")
  primarySEMFileID: int = Field(...)
  submittedBy: int = Field(..., title="Submitted by")
  materialName: Literal["Graphene", "other"] = Field(..., title="Material Name", description='''
   - choices: ["Graphene", "other"]
  ''',
  max_length=32)
  isValidated: bool = Field(False, title="Validated")
  isPrivate: bool = Field(True)