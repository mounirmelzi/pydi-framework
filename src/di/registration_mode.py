from enum import StrEnum, auto


class RegistrationMode(StrEnum):
    SINGLETON = auto()
    LAZY_SINGLETON = auto()
    FACTORY = auto()
