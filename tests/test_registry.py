import pytest
from di.registry import Registry
from di.registration_mode import RegistrationMode
from di.exceptions import NotRegistered


class Service:
    pass


@pytest.fixture
def registry():
    return Registry()


def test_singleton_registration(registry):
    registry.register(Service, lambda: Service(), RegistrationMode.SINGLETON)
    instance1 = registry.resolve(Service)
    instance2 = registry.resolve(Service)
    assert isinstance(instance1, Service)
    assert instance1 is instance2


def test_factory_registration(registry):
    registry.register(Service, lambda: Service(), RegistrationMode.FACTORY)
    instance1 = registry.resolve(Service)
    instance2 = registry.resolve(Service)
    assert isinstance(instance1, Service)
    assert instance1 is not instance2


def test_lazy_singleton_registration(registry):
    registry.register(Service, lambda: Service(), RegistrationMode.LAZY_SINGLETON)
    instance1 = registry.resolve(Service)
    instance2 = registry.resolve(Service)
    assert isinstance(instance1, Service)
    assert instance1 is instance2


def test_registration_with_tag(registry):
    registry.register(
        Service,
        lambda: Service(),
        RegistrationMode.SINGLETON,
        tag="tag1",
    )

    registry.register(
        Service,
        lambda: Service(),
        RegistrationMode.SINGLETON,
        tag="tag2",
    )

    instance1 = registry.resolve(Service, tag="tag1")
    instance2 = registry.resolve(Service, tag="tag2")
    assert instance1 is not instance2


def test_not_registered_raises(registry):
    with pytest.raises(NotRegistered):
        registry.resolve(Service)


def test_factory_returns_different_instances_with_tag(registry):
    registry.register(Service, lambda: Service(), RegistrationMode.FACTORY, tag="one")
    registry.register(Service, lambda: Service(), RegistrationMode.FACTORY, tag="two")
    instance1 = registry.resolve(Service, tag="one")
    instance2 = registry.resolve(Service, tag="two")
    assert instance1 is not instance2


def test_lazy_singleton_creates_once(registry):
    def factory():
        nonlocal call_count
        call_count += 1
        return Service()

    call_count = 0
    registry.register(Service, factory, RegistrationMode.LAZY_SINGLETON)
    a = registry.resolve(Service)
    b = registry.resolve(Service)
    assert call_count == 1
    assert a is b
