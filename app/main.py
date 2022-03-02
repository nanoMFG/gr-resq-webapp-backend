from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, status, HTTPException, Request
import bcrypt
import jwt
from app.core.config import settings
from datetime import datetime, timedelta
from .db import query, serializer
from app.crud.forms.user import SignUpForm, SignInForm
import httpx

app = FastAPI()

# @app.on_event("startup")


# @app.on_event("shutdown")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/", tags=["Root"], status_code=status.HTTP_200_OK)
async def root():
    return {"message": "Gr-RESQ Backend"}


@app.post("/auth/signup", status_code=status.HTTP_201_CREATED)
async def signup(form: SignUpForm):
    user = query.get_user(form.email)
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Email already exists')

    user = form.to_db_obj()
    query.put_user(user)
    institution_key = serializer.generate_institution_key(form.institution)
    institution = query.get_institution(form.institution)
    if not institution:
        query.put_institution({
            'PK': institution_key['PK'],
            'SK': institution_key['SK'],
            'Name': form.institution
        })

    response = query.put_user(user)
    print(response)
    return {"message": "success"}


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


@app.post('/auth/signin/token', status_code=status.HTTP_200_OK)
async def signin_with_token(req: Request):
    auth_type, auth_token = req.headers.get('authorization').split()
    if auth_type == 'Bearer':
        data = decode_auth_token(auth_token)
        if data['exp'] < datetime.now().timestamp():
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token expired')

        user = query.get_user(data.get('email'))
        new_token = assign_auth_token(user)
    return {'token': new_token}


@app.post('/auth/signin/credentials', status_code=status.HTTP_200_OK)
async def signin_with_form(form: SignInForm):
    user = query.get_user(form.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    if not check_password(form.password, user['PasswordHash']):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Incorrect password')
    token = assign_auth_token(user)

    return {
        'token': token,
        'email': user['Email']
    }


@app.get('/auth/institutions', status_code=status.HTTP_200_OK)
async def all_institutions():
    result = query.get_all_institutions()
    return result


@app.get('/experiments/init', status_code=status.HTTP_200_OK)
async def tool_init():
    async with httpx.AsyncClient(base_url=settings.GSA_DATABASE_API) as client:
        res = await client.get('/experiments/init', timeout=60)
    return res.json()


@app.post('/experiments/query', status_code=status.HTTP_200_OK)
async def experiment_query(req: Request):
    data = await req.json()
    with httpx.Client(base_url=settings.GSA_DATABASE_API) as client:
        res = client.post('/experiments/query', json=data, timeout=60)
    return res.json()


@app.get('/experiments/{id}', status_code=status.HTTP_200_OK)
async def experiment_query(id: int):
    with httpx.Client(base_url=settings.GSA_DATABASE_API) as client:
        res = client.get(f'/experiments/{id}', timeout=60)
    return res.json()


@app.get("*", tags=["404 Not found"], status_code=status.HTTP_404_NOT_FOUND)
async def not_found():
    return {"message": "Requested resource not found"}
