from pydantic import BaseModel, Field
from typing import Literal
from uuid import UUID

class RoleType(BaseModel):
  roleType: Literal["basic", "admin", "member", "moderator"] = Field(...)
  groupID: UUID = Field(...)

class Role(BaseModel):
  roleTypes: list[RoleType] = Field([])