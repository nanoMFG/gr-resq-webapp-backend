from app.core.config import settings
import bcrypt
import jwt
from datetime import datetime, timedelta
import httpx


def get_author_id(user: dict):
    first_name = user["FirstName"]
    last_name = user["LastName"]
    institution = user["Institution"]["Name"]
    with httpx.Client(base_url=settings.GSA_DATABASE_API) as client:
        res = client.get(f'/authors?first_name={first_name}&last_name={last_name}&institution={institution}')
    author = res.json()
    return author['id']


def assign_auth_token(user: dict):
    payload = {
        'type': 'auth',
        'email': user['Email'],
        'exp': (datetime.now() + timedelta(hours=1)).timestamp()
    }
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm='HS256')
    return token


def decode_auth_token(token: str):
    return jwt.decode(token, settings.JWT_SECRET, algorithms="HS256")


def check_password(password: str, hashed_password):
    return bcrypt.checkpw(password.encode(), hashed_password.value)
