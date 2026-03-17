import inspect
from functools import wraps
from typing import Callable, Optional, Iterable, Dict, Union
from di.registry import Registry
from di.locator import Locator


def inject(
    store: Union[Registry, Locator],
    params: Optional[Iterable[str]] = None,
) -> Callable:
    tags_by_names: Dict[str, Optional[str]] = _parse_params_and_tags(params)

    def decorator(wrapped: Callable) -> Callable:
        signature = inspect.signature(wrapped)

        @wraps(wrapped)
        def wrapper(*args, **kwargs):
            bound = signature.bind_partial(*args, **kwargs)
            for name, param in signature.parameters.items():
                if name in bound.arguments:
                    continue
                if param.default is not inspect.Parameter.empty:
                    continue
                if param.annotation is inspect.Parameter.empty:
                    continue
                if (params is not None) and (name not in tags_by_names):
                    continue

                bound.arguments[name] = store.resolve(
                    interface=param.annotation,
                    tag=tags_by_names.get(name),
                )

            return wrapped(*bound.args, **bound.kwargs)

        return wrapper

    return decorator


def _parse_params_and_tags(params: Optional[Iterable[str]]) -> Dict[str, Optional[str]]:
    if params is None:
        return {}

    return {
        name: tag
        for name, tag in (
            param.split(":", 1) if ":" in param else (param, None) for param in params
        )
    }
