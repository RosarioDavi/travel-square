import os
from pydantic import BaseModel
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class DuplicateAccountError(ValueError):
    pass


class Account(BaseModel):
    id: int
    username: str
    full_name: str
    hashed_password: str
    avatar: str | None


class AccountOut(BaseModel):
    id: int
    username: str
    full_name: str
    avatar: str | None


class AccountIn(BaseModel):
    username: str
    full_name: str
    password: str
    avatar: str | None


class AccountQueries:
    def get_all_accounts(self) -> list[AccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, username, full_name, avatar
                    FROM accounts
                    ORDER BY username;
                """
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)

                return results

    def get_one_account(self, username: str) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT id, username, full_name, avatar
                    FROM accounts
                    WHERE username = %s;
                """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return AccountOut(
                    id=record[0],
                    username=record[1],
                    full_name=record[2],
                    avatar=record[3]
                )

    def create_account(self, account: AccountIn, hashed_password: str) -> Account:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO accounts (username, full_name, hashed_password, avatar)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [account.username, account.full_name, hashed_password, account.avatar]
                )

                id = result.fetchone()[0]
                return Account(
                    id=id,
                    username=account.username,
                    full_name=account.full_name,
                    hashed_password=hashed_password,
                    avatar=account.avatar
                )

    def delete_account(self, account_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM accounts
                    WHERE id = %s
                    """,
                    [account_id],
                )

    # def update_account(self, account_id, data):
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             params = [
    #                 data.username,
    #                 data.full_name,
    #                 data.password,
    #                 data.avatar,
    #                 account_id
    #             ]
    #             cur.execute(
    #                 """
    #                 UPDATE accounts
    #                 SET first = %s
    #                   , last = %s
    #                   , avatar = %s
    #                   , email = %s
    #                   , username = %s
    #                 WHERE id = %s
    #                 RETURNING id, first, last, avatar, email, username
    #                 """,
    #                 params,
    #             )

    #             record = None
    #             row = cur.fetchone()
    #             if row is not None:
    #                 record = {}
    #                 for i, column in enumerate(cur.description):
    #                     record[column.name] = row[i]

    #             return record
