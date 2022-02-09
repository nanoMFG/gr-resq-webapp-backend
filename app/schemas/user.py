from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from . import Base
from .group import association_table


class User(Base):
    id = Column(Integer, primary_key=True)

    first_name = Column(String(64))

    last_name = Column(String(64))

    email = Column(String(256))

    pw_hash = Column(String(256))

    institution_id = Column(Integer, ForeignKey('institution.id'))

    institution = relationship('institution', back_populates='users')

    # Group will automatically create User.groups
    # groups = relationship("Group", secondary=association_table, back_populates='members')

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __repr__(self):
        return f'<User id={self.id} name={self.full_name}>'
