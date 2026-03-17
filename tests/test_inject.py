import pytest
from di import Registry, Locator, inject, RegistrationMode, NotRegistered


class Service:
    pass


@pytest.fixture
def registry() -> Registry:
    r = Registry()
    r.register(Service, lambda: Service(), RegistrationMode.SINGLETON)
    r.register(Service, lambda: Service(), RegistrationMode.SINGLETON, tag="special")
    r.register(int, lambda: 42, RegistrationMode.SINGLETON, tag="answer")
    return r


@pytest.fixture
def locator() -> Locator:
    locator = Locator()
    locator.register(Service, lambda: Service(), RegistrationMode.SINGLETON)
    locator.register(int, lambda: 42, RegistrationMode.SINGLETON, tag="answer")
    return locator


def test_simple_injection(registry: Registry):
    @inject(registry, params=["service"])
    def f(service: Service):
        return service

    instance = f()
    assert isinstance(instance, Service)


def test_injection_with_tag(registry: Registry):
    @inject(registry, params=["service:special"])
    def f(service: Service):
        return service

    instance = f()
    assert isinstance(instance, Service)


def test_default_values_not_overridden(registry: Registry):
    @inject(registry, params=["service"])
    def f(service: Service, num: int = 7):
        return service, num

    s, n = f()
    assert n == 7
    assert isinstance(s, Service)


def test_manual_override(registry: Registry):
    custom = Service()

    @inject(registry, params=["service"])
    def f(service: Service):
        return service

    instance = f(service=custom)
    assert instance is custom


def test_missing_required_param_raises(registry: Registry):
    @inject(registry, params=["service"])
    def f(service: Service, value: int):
        return service, value

    with pytest.raises(TypeError):
        f()


def test_multiple_params(registry: Registry):
    @inject(registry, params=["service", "num:answer"])
    def f(service: Service, num: int):
        return service, num

    s, n = f()
    assert isinstance(s, Service)
    assert n == 42


def test_partial_manual_override(registry: Registry):
    @inject(registry, params=["service", "num:answer"])
    def f(service: Service, num: int):
        return service, num

    s, n = f(num=99)
    assert isinstance(s, Service)
    assert n == 99


def test_no_params_injected_when_params_none(registry: Registry):
    @inject(registry)
    def f(service: Service, num: int):
        return service, num

    with pytest.raises(NotRegistered):
        f()


def test_instance_method_injection(registry: Registry):
    class MyClass:
        @inject(registry, params=["service"])
        def method(self, service: Service):
            return service

    obj = MyClass()
    instance = obj.method()
    assert isinstance(instance, Service)


def test_class_method_injection(registry: Registry):
    class MyClass:
        @classmethod
        @inject(registry, params=["service"])
        def method(cls, service: Service):
            return service, cls

    instance, cls_ref = MyClass.method()
    assert isinstance(instance, Service)
    assert cls_ref is MyClass


def test_static_method_injection(registry: Registry):
    class MyClass:
        @staticmethod
        @inject(registry, params=["service"])
        def method(service: Service):
            return service

    instance = MyClass.method()
    assert isinstance(instance, Service)


def test_manual_override_instance_method(registry: Registry):
    class MyClass:
        @inject(registry, params=["service"])
        def method(self, service: Service):
            return service

    obj = MyClass()
    custom = Service()
    instance = obj.method(service=custom)
    assert instance is custom


def test_manual_override_class_method(registry: Registry):
    class MyClass:
        @classmethod
        @inject(registry, params=["service"])
        def method(cls, service: Service):
            return service

    custom = Service()
    instance = MyClass.method(service=custom)
    assert instance is custom


def test_manual_override_static_method(registry: Registry):
    class MyClass:
        @staticmethod
        @inject(registry, params=["service"])
        def method(service: Service):
            return service

    custom = Service()
    instance = MyClass.method(service=custom)
    assert instance is custom


def test_injection_in_constructor(registry: Registry):
    class MyClass:
        @inject(registry, params=["service"])
        def __init__(self, service: Service):
            self.service = service

    obj = MyClass()
    assert isinstance(obj.service, Service)


def test_constructor_manual_override(registry: Registry):
    class MyClass:
        @inject(registry, params=["service"])
        def __init__(self, service: Service):
            self.service = service

    custom = Service()
    obj = MyClass(service=custom)
    assert obj.service is custom


def test_constructor_with_defaults(registry: Registry):
    class MyClass:
        @inject(registry, params=["service"])
        def __init__(self, service: Service, num: int = 99):
            self.service = service
            self.num = num

    obj = MyClass()
    assert isinstance(obj.service, Service)
    assert obj.num == 99


def test_constructor_multiple_params_with_tag(registry: Registry):
    class MyClass:
        @inject(registry, params=["service", "b:special"])
        def __init__(self, service: Service, b: Service):
            self.service = service
            self.b = b

    obj = MyClass()
    assert isinstance(obj.service, Service)
    assert isinstance(obj.b, Service)
    assert obj.service is not obj.b


def test_simple_injection_with_locator(locator: Locator):
    @inject(locator, params=["service"])
    def f(service: Service):
        return service

    instance = f()
    assert isinstance(instance, Service)


def test_injection_with_tag_and_locator(locator: Locator):
    locator.register(
        Service,
        lambda: Service(),
        RegistrationMode.SINGLETON,
        tag="special",
    )

    @inject(locator, params=["service:special"])
    def f(service: Service):
        return service

    instance = f()
    assert isinstance(instance, Service)


def test_override_scope_injection(locator: Locator):
    with locator.override():
        locator.register(
            Service,
            lambda: Service(),
            RegistrationMode.SINGLETON,
            tag="special",
        )

        @inject(locator, params=["service:special"])
        def f(service: Service):
            return service

        instance = f()
        assert isinstance(instance, Service)


def test_constructor_injection_with_locator(locator: Locator):
    class MyClass:
        @inject(locator, params=["service"])
        def __init__(self, service: Service):
            self.service = service

    obj = MyClass()
    assert isinstance(obj.service, Service)


def test_manual_override_with_locator(locator: Locator):
    class MyClass:
        @inject(locator, params=["service"])
        def __init__(self, service: Service):
            self.service = service

    custom = Service()
    obj = MyClass(service=custom)
    assert obj.service is custom


def test_nested_override_with_locator(locator: Locator):
    @inject(locator, params=["num:answer"])
    def f(num: int):
        return num

    assert f() == 42
    locator.register(int, lambda: 1, RegistrationMode.LAZY_SINGLETON, tag="answer")
    assert f() == 1
    with locator.override():
        locator.register(int, lambda: 2, RegistrationMode.FACTORY, tag="answer")
        assert f() == 2
    assert f() == 1
