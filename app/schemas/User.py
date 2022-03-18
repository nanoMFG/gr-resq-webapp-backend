from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Literal
from uuid import UUID
from .Role import Role


class User(BaseModel):
  email: EmailStr = Field(...)
  
class UserInDB(User):
  ID: UUID = Field(...)
  passwordHash: str = Field(...)
  role: Role
  authorID: Optional[int] = Field(None, "Author ID")