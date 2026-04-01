import di


class Service:
    def __init__(self, name: str):
        self.name = name


class Repository:
    @di.inject(di.locator)
    def __init__(self, service: Service):
        self.service = service


def setup():
    di.locator.register(
        Service,
        lambda: Service("Local"),
        di.RegistrationMode.FACTORY,
    )

    di.locator.register(
        Repository,
        lambda: Repository(),
        di.RegistrationMode.FACTORY,
    )


def main():
    assert di.locator.resolve(Repository).service.name == "Local"

    with di.locator.override():
        assert di.locator.resolve(Repository).service.name == "Local"

        di.locator.register(
            Service,
            lambda: Service("Remote"),
            di.RegistrationMode.FACTORY,
        )

        assert di.locator.resolve(Repository).service.name == "Remote"

    assert di.locator.resolve(Repository).service.name == "Local"


if __name__ == "__main__":
    setup()
    main()
