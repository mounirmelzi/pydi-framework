from di.locator import Locator
from di.registry import Registry
from di.inject import inject
from di.registration_mode import RegistrationMode
from di.exceptions import NotRegisteredError, RootScopeCloseError


locator: Locator = Locator()


__all__ = [
    "Locator",
    "locator",
    "Registry",
    "inject",
    "RegistrationMode",
    "NotRegisteredError",
    "RootScopeCloseError",
]
