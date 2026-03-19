import di
from models import User
from db import Database


@di.inject(di.locator)
def create_user(name: str, email: str, _db: Database):
    user = User(name=name, email=email)
    with _db.connection() as session:
        session.add(user)
        session.commit()
        session.refresh(user)
    return user


@di.inject(di.locator)
def get_users(_db: Database):
    with _db.connection() as session:
        return session.query(User).all()
