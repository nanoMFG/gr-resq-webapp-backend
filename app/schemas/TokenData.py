from pydantic import BaseModel, Field
from uuid import UUID
from typing import Literal


class TokenData(BaseModel):
  userID: UUID = Field(...)
  groupID: UUID = Field(...)
  role: Literal["basic", "admin", "member", "moderator"] = Field(...)