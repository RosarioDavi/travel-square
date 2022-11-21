from fastapi import FastAPI
from routers import venues
from routers import requests, accounts
from authenticator import authenticator

app = FastAPI()

app = FastAPI()
app.include_router(venues.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(requests.router)