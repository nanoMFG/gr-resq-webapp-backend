from sqlalchemy.orm import declarative_base
from sqlalchemy.ext.declarative import declared_attr
import enum
import re


class GlobalRole(enum.Enum):
    basic_user = 1
    submit_user = 2
    group_moderator = 3
    site_manager = 4


class GroupRole(enum.Enum):
    member = 1
    admin = 2


class Base(object):
    @declared_attr
    def __tablename__(cls):
        return re.sub(r"(?<!^)(?=[A-Z])", "_", cls.__name__).lower()


Base = declarative_base(cls=Base)
