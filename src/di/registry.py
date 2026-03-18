from typing import Optional, Type, Callable
from di.store import Store, create_store
from di.registration_mode import RegistrationMode
from di.exceptions import NotRegisteredError


class Registry:
    def __init__(self):
        self.store: Store = create_store()

    def register[T](
        self,
        interface: Type[T],
        factory: Callable[[], T],
        mode: RegistrationMode,
        tag: Optional[str] = None,
    ) -> None:
        match mode:
            case RegistrationMode.SINGLETON:
                registration = factory()
            case RegistrationMode.LAZY_SINGLETON:
                registration = factory
            case RegistrationMode.FACTORY:
                registration = factory

        key = (interface, tag)
        self.store[key] = (mode, registration)

    def resolve[T](
        self,
        interface: Type[T],
        tag: Optional[str] = None,
    ) -> T:
        key = (interface, tag)
        if key not in self.store:
            raise NotRegisteredError(interface, tag)

        mode, registration = self.store[key]

        match mode:
            case RegistrationMode.SINGLETON:
                return registration
            case RegistrationMode.LAZY_SINGLETON:
                self.store[key] = (RegistrationMode.SINGLETON, registration())
                return self.resolve(interface, tag)
            case RegistrationMode.FACTORY:
                return registration()
