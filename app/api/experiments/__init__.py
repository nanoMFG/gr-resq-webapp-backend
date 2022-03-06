from fastapi import APIRouter, status, Request
from app.core.config import settings
import httpx

router = APIRouter()


@router.get('/init', status_code=status.HTTP_200_OK)
async def tool_init():
    async with httpx.AsyncClient(base_url=settings.GSA_DATABASE_API) as client:
        res = await client.get('/experiments/init', timeout=60)
    return res.json()


@router.post('/query', status_code=status.HTTP_200_OK)
async def experiment_query(req: Request):
    data = await req.json()
    with httpx.Client(base_url=settings.GSA_DATABASE_API) as client:
        res = client.post('/experiments/query', json=data, timeout=60)
    return res.json()


@router.get('/{experiment_id}', status_code=status.HTTP_200_OK)
async def experiment_query(experiment_id: int):
    with httpx.Client(base_url=settings.GSA_DATABASE_API) as client:
        res = client.get(f'/experiments/{experiment_id}', timeout=60)
    return res.json()
