from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Literal
from uuid import UUID


class User(BaseModel):
    email: EmailStr = Field(...)


class UserInDB(User):
    ID: UUID = Field(...)
    passwordHash: str = Field(...)
    role: Literal[
        "basic_user",
        "system_admin",
        "group_member",
        "group_moderator"] = Field(...)
    authorID: Optional[int] = Field(None, description="Author ID")
