import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries, AccountIn, AccountOut


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ):
        return accounts.get_one_account(username)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ) -> AccountQueries:
        return accounts

    def get_hashed_password(self, account: AccountIn):
        return account.get('password')

    def get_account_data_for_cookie(self, account: AccountOut) -> AccountOut:
        return account.get('username'), AccountOut(**account)


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
