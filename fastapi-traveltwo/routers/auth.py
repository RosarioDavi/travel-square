import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from models import AccountOut, Account
from queries.accounts import AccountQueries
from queries.sessions import SessionQueries
