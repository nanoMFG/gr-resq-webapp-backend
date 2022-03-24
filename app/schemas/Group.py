from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID


class Group(BaseModel):
  ID: UUID = Field(...)
  name: str = Field(...)
  moderators: list[UUID] = Field([])
  members: list[UUID] = Field([])
  Experiments: list[int] = Field([])
  isPrivate: bool = Field(True)