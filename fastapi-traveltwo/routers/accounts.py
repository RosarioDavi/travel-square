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
from authenticator import authenticator

from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountWithoutPassword,
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


@router.get("/api/accounts/", response_model=list[AccountWithoutPassword])
def get_all_accounts(repo: AccountQueries = Depends()):
    return {
        "accounts": repo.get_all_accounts()
    }


@router.get("/api/accounts/users/{account_id}", response_model=AccountWithoutPassword)
def get_account_username(
    account_id: int,
    response: Response,
    repo: AccountQueries = Depends()
):
    account = repo.get_another_account(account_id)
    if account is None:
        response.status_code = 404
    return account


# Current logged in user
@router.get("/api/accounts/{account_id}", response_model=AccountOut)
def get_account(
    account_id: int,
    response: Response,
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = repo.get(account_id)
    if account is None:
        response.status_code = 404
    return account


@router.post("/api/accounts/", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    avatar = ''
    is_admin = False
    try:
        account = accounts.create_account(
            info,
            hashed_password,
            avatar,
            is_admin
        )
    except DuplicateAccountError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        ) from exc
    form = AccountForm(
        username=info.username,
        password=info.password
        )
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.delete("/api/accounts/{account_id}", response_model=AccountOut)
def delete_account(
    account_id: int,
    repo: AccountQueries = Depends()
):
    repo.delete_account(account_id)
    return True


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


# @router.get("/api/accounts/search/{keyword}", response_model=AccountsOut)
# def get_accounts_keyword(
#     keyword: str,
#     repo: AccountQueries = Depends()
# ):
#     return {
#         "accounts": repo.search_accounts(keyword)
#     }


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
