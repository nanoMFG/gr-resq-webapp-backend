from pydantic import BaseModel, Field
from uuid import UUID


class Group(BaseModel):
  ID: UUID = Field(...)
  name: str = Field(...)
  moderators: list[UUID] = Field([])
  members: list[UUID] = Field([])
  experiments: list[int] = Field([])
  isPrivate: bool = Field(True)