from pydantic import BaseSettings


class Settings(BaseSettings):
    debug_mode: bool = False
    secret: str
    host: str
    port: int
    DYNAMODB_FULL_ACCESS_ACCESS_KEY: str
    DYNAMODB_FULL_ACCESS_SECRET_ACCESS: str
    DYNAMODB_FULL_ACCESS_REGION: str

    DYNAMODB_READ_ONLY_ACCESS_KEY: str
    DYNAMODB_READ_ONLY_SECRET_ACCESS: str
    DYNAMODB_READ_ONLY_REGION: str

    DYNAMODB_READ_WRITE_ACCESS_KEY: str
    DYNAMODB_READ_WRITE_SECRET_ACCESS: str
    DYNAMODB_READ_WRITE_REGION: str

    GSA_DATABASE_API: str
    TABLE_1: str

    JWT_SECRET: str

    class Config:
        env_file = ".env"


settings = Settings()
