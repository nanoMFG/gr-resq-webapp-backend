from pydantic import BaseModel, Field
from typing import Optional


class Author(BaseModel):
  ID: int = Field(..., title="Author ID")
  firstName: Optional[str] = Field(None, title="Author First Name", max_length=64)
  lastName: Optional[str] = Field(None, title="Author Last Name", max_length=64)
  institution: Optional[str] = Field(None, title="Author Institution", max_length=64)
  nanohubUserID: int = Field(..., title="nanoHub Submitter User ID")
  
  class Config:
    orm_mode = True