# from queries.sessions import SessionQueries
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from typing import Optional
from authenticator import authenticator

from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError
)

router = APIRouter()

class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

@router.get("/api/accounts", response_model=list[AccountOut])
def get_all_accounts(repo: AccountQueries = Depends()):
    return {
        "users": repo.get_all_accounts()
    }


@router.get("/api/accounts/{username}", response_model=Optional[AccountOut])
def get_one_account(
    username: str,
    response: Response,
    repo: AccountQueries = Depends(),
) -> bool:
    account = repo.get_one_account(username)
    if account is None:
        response.status_code = 404
    return {
        "user": account
    }


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create_account(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(
        username=info.username,
        full_name=info.full_name,
        password=info.password,
        avatar=info.avatar
        )
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


# @router.delete("/api/sessions/{account_id}", response_model=bool)
# async def delete_session(
#     account_id: str,
#     account: dict = Depends(authenticator.get_current_account_data),
#     repo: SessionQueries = Depends(),
# ) -> bool:
#     if "admin" not in account["roles"]:
#         raise not_authorized
#     repo.delete_sessions(account_id)
#     return True
