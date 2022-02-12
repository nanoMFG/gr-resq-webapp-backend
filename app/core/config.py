from pydantic import BaseSettings


class Settings(BaseSettings):
  debug_mode: bool = False
  secret: str
  host: str
  port: int

  class Config:
    env_file = ".env.development"


settings = Settings()