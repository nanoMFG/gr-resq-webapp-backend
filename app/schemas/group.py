from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Table, Enum
from sqlalchemy.orm import relationship

from . import Base, GroupRole

association_table = Table(
    'user_group_association', Base.metadata,
    Column('user_id', ForeignKey('user.id'), primary_key=True),
    Column('group_id', ForeignKey('group.id'), primary_key=True),
    Column('role', Enum(GroupRole)),
    Column('joined_at', DateTime())
)


class Group(Base):
    id = Column(Integer, primary_key=True)

    name = Column(String(64))

    created_at = Column(DateTime())

    join_code = Column(String(16))

    code_expiration = Column(DateTime())

    members = relationship("User",
                           secondary=association_table,
                           backref='groups'
                           )


    def __repr__(self):
        return f'<Group id={self.id} name={self.name}>'
