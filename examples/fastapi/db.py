import di
from contextlib import contextmanager
from functools import partial
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session


class Database:
    Base = declarative_base()

    def __init__(self, url: str):
        self.engine = create_engine(url, connect_args={"check_same_thread": False})
        self.Base.metadata.create_all(bind=self.engine)
        self.create_session = sessionmaker(
            bind=self.engine,
            autoflush=False,
            autocommit=False,
        )

    @contextmanager
    def connection(self):
        session: Session = self.create_session()
        try:
            yield session
        finally:
            session.close()


di.locator.register(
    interface=Database,
    factory=partial(Database, url="sqlite:///./app.db"),
    mode=di.RegistrationMode.LAZY_SINGLETON,
)
