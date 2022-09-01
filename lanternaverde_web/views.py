
from django.shortcuts import render
from .models import Usuario, Analista, UserManager
import json
from django.db import IntegrityError
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from lanternaverde_web.models import Pergunta
from lanternaverde_web.serializers import AdministradorSerializer, AvaliacaoAnalistaSerializer, AnalistaSerializer, PerguntaSerializer, UsuarioSerializer
from lanternaverde_web.models import Empresa, Usuario, AvaliacaoAnalista, Analista, Questao

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the index.")


@csrf_exempt
def cadastro_analista(request):
    print(request.POST)
    if request.method == 'GET':
        pass

    elif request.method == 'POST':
        data = request.POST
        usuario = Usuario.objects.create_user(username=data.get('username'), email=data.get('email'), password=data.get('password'))
        usuario.save()
        analista = Analista.objects.create(cpf=data.get('cpf'), specialty=data.get('specialty'), user=usuario)
        analista.save()

    return HttpResponse(status=201)


def alterar_analista(request):
    data = request.POST
    analista = Analista.objects.get(pk=2)
    analista.cpf = data.get("cpf")
    analista.specialty = data.get("specialty")
    analista.user.username = data.get("username")
    analista.user.email = data.get("email")
    analista.user.password = data.get("password")
    analista.save()
    analista.user.save()
    return HttpResponse(status=201)


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
    empresa = Empresa.objects.get(pk=2)
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

class _JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """

    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(_JSONResponse, self).__init__(content, **kwargs)


def listar_analises(request):
    """
    Function that groups all `AvaliaçaoAnalista` objects into a JSON response.
    """
    if request.method == 'GET':
        #pylint: disable=E1101
        analises = AvaliacaoAnalistaSerializer(
            request.user.analista.analises.all(),
            many=True,
            context={'request': None}
        )

        ser_return = {
            'Analise': analises.data
        }
        return _JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

@csrf_exempt
def detalhar_analise(request):
    """
    Function that detail a analysis
    """
    if request.method == 'GET':
        analysisid = request.GET.get('analysisid')
        analysis = AvaliacaoAnalista.objects.get(pk=analysisid)
        ser_anal = AvaliacaoAnalistaSerializer(analysis)
        ser_return = {
            'analysis': ser_anal.data
        }
        return _JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


@csrf_exempt
def criar_analise(request):
    if request.method == 'POST':
        post = request.POST
        data = json.loads(request.body)
        analysts = data['analysts']
        company = Empresa.objects.get(pk=data['company'])
        analysts_set = Analista.objects.filter(pk__in=analysts)
        print(list(analysts_set))
        for analyst in list(analysts_set):
            analysis = AvaliacaoAnalista.objects.create(company=company, analyst=analyst)
            questions = list(Pergunta.objects.all())
            for question in questions:
                Questao.objects.create(question=question, questionnaire=analysis)
        return HttpResponse(status=201)
    return HttpResponseBadRequest()


@csrf_exempt
@login_required
def atualizar_analise(request):
    if request.method == 'POST':
        post = request.POST
        data = json.loads(request.body)

        analysis = AvaliacaoAnalista.objects.get(pk=data['id'])
        if analysis.analyst.user == request.user:
            analysis.comment = data['comment']
            for question in data['question']:
                q = Questao.objects.get(pk=question['id'])
                q.answer = data['answer']

            analysis.score = '2'
        print(analysis)
    return HttpResponse(status=200)
