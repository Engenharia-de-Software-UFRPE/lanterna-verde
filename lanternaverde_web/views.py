from django.db import IntegrityError
from django.contrib.auth import authenticate
from django.contrib.auth import login as djangoLogin, logout as djangoLogout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer

from lanternaverde_web.serializers import AdministradorSerializer, AnalistaSerializer, PerguntaSerializer, UsuarioSerializer
from lanternaverde_web.models import Empresa, Usuario, Pergunta, Analista

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the index.")

@csrf_exempt # TODO: Remover csrf_exempt (REQ. não funcional)
def login(request):
    """
    Method that tries to login an user.
    """
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            djangoLogin(request, user)
            if hasattr(user, 'analista'):
                return HttpResponse('analista', status=200)
            if hasattr(user, 'administrador'):
                return HttpResponse('administrador', status=200)
            if hasattr(user, 'empresa'):
                return HttpResponse('empresa', status=200)
            return HttpResponseBadRequest(status=401)
        return HttpResponse("Usuário ou senhas inválidos, por favor tente" +
                            " novamente", status=401)
    return HttpResponseBadRequest()

@login_required
def logout(request):
    """
    Method that logs out an user.
    """
    if request.method in ['GET','POST']:
        djangoLogout(request)
        return HttpResponse(status=200)
    return HttpResponseBadRequest()

@csrf_exempt
def cadastro_empresa(request):
    print(request.POST)
    if request.method == 'GET':
        pass

    elif request.method == 'POST':
        data = request.POST
        usuario = Usuario.objects.create_user(username=data.get('username'), email=data.get('email'), password=data.get('password'))
        usuario.save()
        empresa = Empresa.objects.create(tradeName=data.get('tradeName'),
                                        corporateName=data.get('corporateName'),
                                        stateRegistration=data.get('stateRegistration'),
                                        cnpj=data.get('cnpj'),
                                        tipo=data.get('tipo'),
                                        contactName=data.get('contactName'),
                                        phoneNumber=data.get('phoneNumber'),
                                        user=usuario)
        empresa.save()

    return HttpResponseRedirect(status=201)

@csrf_exempt
def alterar_empresa(request):
    data = request.POST
    empresa = empresa.objects.get(pk=2)
    empresa.tradeName = data.get("tradeName")
    empresa.corporateName = data.get("corporateName")
    empresa.stateRegistration = data.get("stateRegistration")
    empresa.cnpj = data.get("cnpj")
    empresa.tipo = data.get("tipo")
    empresa.contactName = data.get("contactName")
    empresa.phoneNumber = data.get("phoneNumber")
    empresa.user.username = data.get("username")
    empresa.user.email = data.get("email")
    empresa.user.password = data.get("password")
    empresa.save()
    empresa.user.save()
    return HttpResponse(status=200)

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

@login_required
@csrf_exempt
def create_questao(request):
    """
    Function that creates a `Questao` object and stores it in the DataBase.
    """
    if request.method == 'POST':
        try:
            dimension = request.POST.get('dimension')
            question = request.POST.get('questao')
            #pylint: disable=E1101
            Pergunta.objects.create(dimension=dimension, body=question)
            return HttpResponse(status=201)
        except IntegrityError:
            pass
    return HttpResponseBadRequest()

@login_required
def get_questoes(request):
    """
    Function that groups all `Questão` objects into a JSON response.
    """
    if request.method == 'GET':
        #pylint: disable=E1101
        questoes = PerguntaSerializer(Pergunta.objects.all(), many=True)
        ser_return = {
            'Questoes': questoes.data
        }
        return _JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

def _select_Analist(amount):
    analists = Analista.objects.filter(available=True).order_by('analysis')[:amount]
    return analists

class _JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """

    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(_JSONResponse, self).__init__(content, **kwargs)
