from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Literal
from uuid import UUID


class User(BaseModel):
  email: EmailStr = Field(...)
  
class UserInDB(User):
  ID: UUID = Field(...)
  passwordHash: str = Field(...)
  role: Literal["basic", "admin", "member", "moderator"] = Field(...)
  authorID: Optional[int] = Field(None, "Author ID")