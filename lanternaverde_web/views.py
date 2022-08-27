from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer

from lanternaverde_web.serializers import AdministradorSerializer, AnalistaSerializer, UsuarioSerializer

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the index.")

@csrf_exempt # TODO: Remover csrf_exempt (REQ. não funcional)
def login_redirect(request):
    """
    Method that tries to login an user and redirects to its designated area.
    """
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            if hasattr(user, 'analista'):
                return HttpResponseRedirect('analista')
            if hasattr(user, 'administrador'):
                return HttpResponseRedirect('admin')
            return HttpResponseBadRequest()
        return HttpResponse("Usuário ou senhas inválidos, por favor tente" +
                            " novamente")

@login_required(login_url='/')
def get_logged_usuario(request):
    """
    Function that creates a response for a GET request for a logged Usuario
    """
    if request.method == 'GET':
        serializer = UsuarioSerializer(request.user)
        ser_return = {
            'Usuario': serializer.data
        }
        return _JSONResponse(ser_return, status=201)
    return HttpResponseBadRequest()

@login_required(login_url='/')
def get_logged_administrador(request):
    """
    Function that creates a response to a GET request for a logged
    Administrador
    """
    if request.method == 'GET':
        user = request.user
        if hasattr(user, 'administrador'):
            ser_user = UsuarioSerializer(user)
            ser_admin = AdministradorSerializer(user.administrador)
            ser_return = {
                'Usuario': ser_user.data,
                'Administrador': ser_admin.data
            }
            return _JSONResponse(ser_return, status=201)
    return HttpResponseBadRequest()

@login_required(login_url='/')
def get_logged_analista(request):
    """
    Function that creates a response to a GET request for a logged Analista
    """
    if request.method == 'GET':
        user = request.user
        if hasattr(user, 'analista'):
            ser_user = UsuarioSerializer(user)
            ser_anal = AnalistaSerializer(user.analista)
            ser_return = {
                'Usuario': ser_user.data,
                'Analista': ser_anal.data
            }
            return _JSONResponse(ser_return, status=201)
    return HttpResponseBadRequest()

class _JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """

    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(_JSONResponse, self).__init__(content, **kwargs)
