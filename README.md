# Python Dependency Injection Framework

A lightweight, type-safe dependency injection framework for Python that supports **singleton**, **lazy singleton**, and **factory** registrations, with scoped overrides and flexible parameter injection.

## Features

- **Registry-based DI**: Register services and resolve them by type and optional tags.
- **Scoped overrides**: Create temporary overrides using context managers.
- **Injection decorator**: Automatically inject dependencies into functions, methods, or constructors.
- **Multiple registration modes**:
  - `SINGLETON`: Single instance shared globally.
  - `LAZY_SINGLETON`: Created on first access and then cached.
  - `FACTORY`: New instance created on every resolution.
- **Tag-based resolution**: Support multiple implementations of the same interface.
- **Type-safe**: Uses Python type annotations for automatic injection.
- **Supports instance, class, and static methods**.

## Usage

### Using the Global Locator

The package provides a pre-created global `locator` available from the module:

```python
from di import locator, inject, RegistrationMode, NotRegisteredError
```

You can register services directly in the global `locator`:

```python
from di import locator, RegistrationMode

class Service:
    pass

locator.register(Service, lambda: Service(), RegistrationMode.SINGLETON)
locator.register(int, lambda: 42, RegistrationMode.SINGLETON, tag="answer")
```

Resolve dependencies manually:

```python
service_instance = locator.resolve(Service)
number = locator.resolve(int, tag="answer")
```

### Function and Method Injection with the Global Locator

```python
from di import locator, inject

@inject(locator, params=["service", "num:answer"])
def process(service: Service, num: int):
    return service, num

s, n = process()
```

Supports injection into:

- Instance methods:

  ```python
  class MyClass:
    @inject(locator, params=["service"])
    def method(self, service: Service):
        return service
  ```

- Class methods:

  ```python
  class MyClass:
    @classmethod
    @inject(locator, params=["service"])
    def method(cls, service: Service):
        return service, cls
  ```

- Static methods:

  ```python
  class MyClass:
    @staticmethod
    @inject(locator, params=["service"])
    def method(service: Service):
        return service
  ```

- Constructors:

  ```python
  class MyClass:
    @inject(locator, params=["service"])
    def __init__(self, service: Service):
        self.service = service
  ```

## Scoped Overrides

```python
with locator.override():
    locator.register(Service, lambda: CustomService(), RegistrationMode.SINGLETON)
    instance = locator.resolve(Service)  # Returns CustomService
# Outside override, original registration restored
instance = locator.resolve(Service)  # Returns Service
```

## Registration Modes

| Mode             | Behavior                                                                |
| ---------------- | ----------------------------------------------------------------------- |
| `SINGLETON`      | Single instance created at registration and reused for all resolutions. |
| `LAZY_SINGLETON` | Instance created on first resolution, then cached for subsequent calls. |
| `FACTORY`        | Factory function called on every resolution to return a new instance.   |

## Error Handling

- `NotRegisteredError`: Raised when a requested type or tag is not registered.
- `RootScopeCloseError`: Raised when attempting to close the root scope of a `Locator`.

## Advanced Usage

While the global `locator` is sufficient for most cases, you can create custom locators or registries if you need isolated scopes or multiple independent DI containers:

```python
from di import Locator, Registry

my_locator = Locator()
my_registry = Registry()
```
