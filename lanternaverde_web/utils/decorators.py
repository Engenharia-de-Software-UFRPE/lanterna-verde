from functools import wraps
from django.http import HttpResponseForbidden

def administrador_required(function):
    """
    Checks if a request is sent by an Administrador user.
    """
    @wraps(function)
    def wrap(request, *args, **kwargs):
        if hasattr(request.user, 'administrador'):
            return function(request, *args, **kwargs)
        return HttpResponseForbidden(content="Você precisa ser um "
                                     "administrador para realizar esta "
                                     "solicitação")

    return wrap

def analista_required(function):
    """
    Checks if a request is sent by an Analista user.
    """
    @wraps(function)
    def wrap(request, *args, **kwargs):
        if hasattr(request.user, 'analista'):
            return function(request, *args, **kwargs)
        return HttpResponseForbidden(content="Você precisa ser um analista "
                                     "para realizar esta solicitação")

    return wrap

def empresa_required(function):
    """
    Checks if a request is sent by an Empresa user.
    """
    @wraps(function)
    def wrap(request, *args, **kwargs):
        if hasattr(request.user, 'empresa'):
            return function(request, *args, **kwargs)
        return HttpResponseForbidden(content="Você precisa ser uma empresa "
                                     "para realizar esta solicitação")

    return wrap
