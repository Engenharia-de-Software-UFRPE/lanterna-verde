from django.http import HttpResponseBadRequest

from .serializers import UsuarioSerializer, AdministradorSerializer, AnalistaSerializer, EmpresaSerializer
from .utils.jsonresponse import JSONResponse

def get_logged_usuario(request):
    """
    Function that creates a response for a GET request for a logged Usuario
    """
    if request.method == 'GET':
        serializer = UsuarioSerializer(request.user)
        ser_return = {
            'Usuario': serializer.data
        }
        return JSONResponse(ser_return, status=201)
    return HttpResponseBadRequest()

def get_logged_administrador(request):
    """
    Function that creates a response to a GET request for a logged
    Administrador
    """
    if request.method == 'GET':
        user = request.user
        ser_user = UsuarioSerializer(user)
        ser_admin = AdministradorSerializer(user.administrador)
        ser_return = {
            'Usuario': ser_user.data,
            'Administrador': ser_admin.data
        }
        return JSONResponse(ser_return, status=201)
    return HttpResponseBadRequest()

def get_logged_analista(request):
    """
    Function that creates a response to a GET request for a logged Analista
    """
    if request.method == 'GET':
        user = request.user
        ser_user = UsuarioSerializer(user)
        ser_anal = AnalistaSerializer(user.analista)
        ser_return = {
            'Usuario': ser_user.data,
            'Analista': ser_anal.data
        }
        return JSONResponse(ser_return, status=201)
    return HttpResponseBadRequest()

def get_logged_empresa(request):
    """
    Function that creates a response to a GET request for a logged Empresa
    """
    if request.method == 'GET':
        user = request.user
        if hasattr(user, 'empresa'):
            ser_user = UsuarioSerializer(user)
            ser_empr = EmpresaSerializer(user.empresa)
            ser_return = {
                'Usuario': ser_user.data,
                'Empresa': ser_empr.data
            }
            return JSONResponse(ser_return, status=201)
    return HttpResponseBadRequest()
