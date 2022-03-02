from pydantic import BaseModel
from app.db.serializer import generate_user_key, generate_institution_key
import bcrypt
from datetime import datetime
from typing import Optional, Literal
from decimal import Decimal


class SignUpForm(BaseModel):
    '''
    JSON representation of the sign up form
    '''
    email: str
    password: str
    firstName: str
    lastName: str
    role: Optional[Literal["basic_user",
                           "system_admin",
                           "group_member",
                           "group_moderator"]] = 'basic_user'
    institution: str
    addNewInstitution: bool

    def to_db_obj(self) -> dict:
        '''
        Converts the SignUpForm to dictionary that will be stored in the data
        '''
        key = generate_user_key(self.email)
        pw_hash = bcrypt.hashpw(self.password.encode(), bcrypt.gensalt())
        inst_key = generate_institution_key(self.institution)
        return {
            'PK': key['PK'],
            'SK': key['SK'],
            'Email': self.email,
            'PasswordHash': pw_hash,
            'FirstName': self.firstName,
            'LastName': self.lastName,
            'Institution': {
                'PK': inst_key['PK'],
                'SK': inst_key['SK'],
                'Name': self.institution
            },
            'Role': self.role,
            'CreatedAt':  Decimal(datetime.now().timestamp()),
        }
