from pydantic import BaseModel
from app.db.serializer import generate_user_key, generate_institution_key
import bcrypt
from datetime import datetime


class SignInForm(BaseModel):
    '''
    JSON representation of the sign in form
    '''
    email: str
    password: str

    @property
    def password_hash(self):
        return bcrypt.hashpw(self.password.encode(), bcrypt.gensalt())