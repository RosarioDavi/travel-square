from fastapi import FastAPI
from routers import requests

app = FastAPI()
app.include_router(requests.router)
