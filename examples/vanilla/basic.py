import di


class Service:
    def __init__(self, name: str):
        self.name = name


class Repository:
    @di.inject(di.locator, params=["service:production"])
    def __init__(self, service: Service):
        self.service = service


def setup():
    di.locator.register(
        interface=Service,
        factory=lambda: Service(name="Local Service"),
        mode=di.RegistrationMode.FACTORY,
    )
    di.locator.register(
        interface=Service,
        factory=lambda: Service(name="Remote Service"),
        mode=di.RegistrationMode.LAZY_SINGLETON,
        tag="production",
    )

    di.locator.register(
        interface=Repository,
        factory=lambda: Repository(),  # auto-resolve dependencies
        mode=di.RegistrationMode.SINGLETON,
    )


def main():
    assert di.locator.resolve(Service).name == "Local Service"
    assert di.locator.resolve(Service, tag="production").name == "Remote Service"
    assert di.locator.resolve(Repository).service.name == "Remote Service"


if __name__ == "__main__":
    setup()
    main()
