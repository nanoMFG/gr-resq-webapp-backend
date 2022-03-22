from pydantic import BaseModel, Field
from uuid import UUID


class Share(BaseModel):
  experimentID: int = Field(...)
  sender: UUID = Field(...)
  recipients: list[UUID] = Field(...)
  isRecipientGroup: bool = Field(False)