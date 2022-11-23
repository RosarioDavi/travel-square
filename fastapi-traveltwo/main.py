from fastapi import FastAPI
from routers import requests, accounts, venues, reviews
from authenticator import authenticator

app = FastAPI()

app.include_router(venues.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(requests.router)
app.include_router(reviews.router)
