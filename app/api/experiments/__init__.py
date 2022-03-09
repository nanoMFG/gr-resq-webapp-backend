from fastapi import APIRouter, status, Request
from fastapi.responses import RedirectResponse
from app.core.config import settings
import httpx

router = APIRouter()


@router.get('/init')
async def tool_init():
    return RedirectResponse(settings.GSA_DATABASE_API + '/experiments/init')


@router.post('/query')
async def experiment_query():
    return RedirectResponse(settings.GSA_DATABASE_API + '/experiments/query')


@router.post('/submit')
async def submit_data():
    return RedirectResponse(settings.GSA_DATABASE_API + '/experiments/submit')


@router.get('/{experiment_id}')
async def experiment_query(experiment_id: int):
    return RedirectResponse(settings.GSA_DATABASE_API + '/experiments/' + str(experiment_id))
