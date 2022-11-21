from fastapi import FastAPI
from routers import venues


app = FastAPI()
app.include_router(venues.router)