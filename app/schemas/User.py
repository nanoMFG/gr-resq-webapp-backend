from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from uuid import UUID


class User(BaseModel):
  ID: UUID = Field(...)
  email: EmailStr = Field(...)
  
class UserInDB(User):
  password: str = Field(...)
  role: str = Field(...)
  authorID: Optional[UUID] = Field(None)