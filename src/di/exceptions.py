from typing import Type, Optional


class NotRegisteredError(RuntimeError):
    def __init__(self, interface: Type, tag: Optional[str]):
        super().__init__(f"No registration found for {interface} with tag {tag}")


class RootScopeCloseError(RuntimeError):
    def __init__(self):
        super().__init__("Cannot close the root scope")
