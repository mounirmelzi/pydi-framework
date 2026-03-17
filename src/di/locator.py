from contextlib import contextmanager
from collections import deque
from typing import Optional, Type, Callable
from di.registry import Registry
from di.registration_mode import RegistrationMode
from di.exceptions import NotRegistered


class Locator:
    def __init__(self):
        self.registries = deque()
        self.open_scope()

    def open_scope(self) -> None:
        self.registries.append(Registry())

    def close_scope(self) -> None:
        self.registries.pop()

    @contextmanager
    def override(self):
        self.open_scope()
        try:
            yield self
        finally:
            self.close_scope()

    @property
    def active_registry(self) -> Registry:
        return self.registries[-1]

    def register[T](
        self,
        interface: Type[T],
        factory: Callable[[], T],
        mode: RegistrationMode,
        tag: Optional[str] = None,
    ) -> None:
        self.active_registry.register(interface, factory, mode, tag)

    def resolve[T](
        self,
        interface: Type[T],
        tag: Optional[str] = None,
    ) -> T:
        for index, registry in enumerate(reversed(self.registries)):
            try:
                return registry.resolve(interface, tag)
            except NotRegistered as exception:
                if index == len(self.registries) - 1:
                    raise exception
