from typing import Optional, Type, Dict, Tuple
from di.registration_mode import RegistrationMode


type Store = Dict[Tuple[Type, Optional[str]], Tuple[RegistrationMode, object]]


def create_store() -> Store:
    return {}
