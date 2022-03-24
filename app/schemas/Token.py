from pydantic import BaseModel, Field


class Token(BaseModel):
  tokenType: str = Field("Bearer")
  accessToken: str = Field(...)