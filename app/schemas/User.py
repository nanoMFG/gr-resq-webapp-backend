from pydantic import BaseModel, Field
from typing import UUID, Optional, EmailStr


class User(BaseModel):
  ID: UUID = Field(...)
  email: EmailStr = Field(...)
  
class UserInDB(User):
  password: str = Field(...)
  role: str = Field(...)
  authorID: Optional[UUID] = Field(None)