from contextlib import contextmanager
from collections import deque
from typing import Optional, Type, Callable
from di.registry import Registry
from di.registration_mode import RegistrationMode
from di.exceptions import NotRegisteredError, RootScopeCloseError


class Locator:
    def __init__(self):
        self.reset_all_scopes()

    def open_scope(self) -> None:
        self.registries.append(Registry())

    def close_scope(self) -> None:
        if len(self.registries) == 1:
            raise RootScopeCloseError()
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

    def reset_current_scope(self):
        self.registries[-1] = Registry()

    def reset_all_scopes(self):
        self.registries = deque()
        self.open_scope()

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
        for registry in reversed(self.registries):
            try:
                return registry.resolve(interface, tag)
            except NotRegisteredError:
                continue
        raise NotRegisteredError(interface, tag)
