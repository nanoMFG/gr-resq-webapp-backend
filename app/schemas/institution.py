from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from . import Base


class Institution(Base):
    id = Column(Integer, primary_key=True)

    name = Column(String(256))

    users = relationship('User', back_populates='institution')

    def __repr__(self):
        return f'<User id={self.id} name={self.name}>'
