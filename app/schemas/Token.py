from pydantic import BaseModel, Field
from uuid import UUID


class Token(BaseModel):
  tokenType: str = Field("Bearer")
  accessToken: str = Field(...)