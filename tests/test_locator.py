import pytest
from di import RegistrationMode, NotRegisteredError, Locator


class Service:
    pass


@pytest.fixture
def locator() -> Locator:
    locator = Locator()
    locator.register(Service, lambda: Service(), RegistrationMode.SINGLETON)
    locator.register(int, lambda: 42, RegistrationMode.SINGLETON, tag="answer")
    return locator


def test_basic_resolution(locator: Locator):
    s = locator.resolve(Service)
    assert isinstance(s, Service)

    n = locator.resolve(int, tag="answer")
    assert n == 42


def test_not_registered_propagates(locator: Locator):
    with pytest.raises(NotRegisteredError):
        locator.resolve(str)


def test_exception_from_override_registry(locator: Locator):
    with locator.override():
        with pytest.raises(NotRegisteredError):
            locator.resolve(str)


def test_override_registry(locator: Locator):
    with locator.override():
        locator.register(int, lambda: 99, RegistrationMode.SINGLETON, tag="answer")
        assert locator.resolve(int, tag="answer") == 99
    assert locator.resolve(int, tag="answer") == 42


def test_nested_overrides(locator: Locator):
    with locator.override():
        locator.register(int, lambda: 1, RegistrationMode.SINGLETON, tag="answer")
        assert locator.resolve(int, tag="answer") == 1
        with locator.override():
            locator.register(int, lambda: 2, RegistrationMode.SINGLETON, tag="answer")
            assert locator.resolve(int, tag="answer") == 2
        assert locator.resolve(int, tag="answer") == 1
    assert locator.resolve(int, tag="answer") == 42
