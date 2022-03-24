from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from uuid import UUID
from .Role import Role

class User(BaseModel):
  email: EmailStr = Field(...)


class UserInDB(User):
  ID: UUID = Field(...)
  passwordHash: str = Field(...)
  role: Role = Field(...)
  authorID: Optional[int] = Field(None, description="Author ID")
