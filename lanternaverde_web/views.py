import json
from django.db import IntegrityError
from django.contrib.auth import authenticate, update_session_auth_hash
from django.contrib.auth import login as djangoLogin, logout as djangoLogout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

import lanternaverde_web.solicitacaoAnalise as solAnalise
import lanternaverde_web.avaliacaoAnalista as avalAnalista
import lanternaverde_web.relatorio as relatorio

from rest_framework.renderers import JSONRenderer

from django.contrib.auth.hashers import check_password


#pylint: disable=W0401
from .models import *
from .serializers import *
from lanternaverde_web.utils.jsonresponse import JSONResponse

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the index.")

@csrf_exempt
@login_required
def cadastro_analista(request):
    if request.method == 'POST':
        if hasattr(request.user, 'administrador'):
            data = request.POST
            try:
                usuario = Usuario.objects.create_user(username=data.get('username'),
                                                      email=data.get('email'),
                                                      password=data.get('password'),
                                                      first_name=data.get('first_name'),
                                                      last_name=data.get('last_name')
                                                      )
                usuario.save()
                analista = Analista.objects.create(cpf=data.get('cpf'),
                                                   specialty=data.get('specialty'),
                                                   user=usuario
                                                   )
                analista.save()
            except IntegrityError:
                return HttpResponse("Este usuário já está cadastrado", status=409)
            return HttpResponse(status=201)
        else:
            return HttpResponse("Você precisa ser um administrador para realizar esta solicitação", status=403)
    return HttpResponseBadRequest()


@csrf_exempt
@login_required
def alterar_analista(request):
    if request.method == 'POST':
        data = request.POST
        if hasattr(request.user, 'administrador'):
            try:
                user = Usuario.objects.get(pk=data.get("id"))
            except:
                return HttpResponse("Usuário não encontrado", status=404)
        elif hasattr(request.user, 'analista'):
            user = request.user
        else:
            return HttpResponse("Você não tem permissão para realizar esta solicitação", status=403)

        user.analista.cpf = data.get("cpf")
        user.analista.specialty = data.get("specialty")
        user.username = data.get("username")
        user.first_name = data.get("first_name")
        user.last_name = data.get("last_name")
        user.analista.email = data.get("email")
        user.save()
        user.analista.save()
        return HttpResponse(status=201)
    return HttpResponseBadRequest()


@csrf_exempt # TODO: Remover csrf_exempt (REQ. não funcional)
def login(request):
    """
    Method that tries to login an user.
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
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

@csrf_exempt
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

    return HttpResponse(status=201)

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
        return JSONResponse(ser_return, status=201)
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
            return JSONResponse(ser_return, status=201)
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
            return JSONResponse(ser_return, status=201)
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
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


@csrf_exempt
@login_required
def create_solicitacao(request):
    """
    Creates a new Solicitacao Analise Object.

    This function restricts who can create new Analysis requirement to Company
    Users.
    """
    return solAnalise.create_solicitacao(request)


@csrf_exempt
@login_required
def get_solicitacoes(request):
    """
    Groups all `SolicitacoesAnalise` objects into a JSON response.
    """
    return solAnalise.get_solicitacoes(request)


@csrf_exempt
@login_required
def get_solicitacao(request):
    """
    Takes a requested analysis by its ID and returns.
    """
    return solAnalise.get_analysis(request)

@login_required
def listar_analises(request):
    """
    Function that groups all `AvaliaçaoAnalista` objects into a JSON response.
    """
    return avalAnalista.listar_analises(request)

@csrf_exempt
@login_required
def detalhar_analise(request):
    """
    Function that detail a analyst
    """
    return avalAnalista.detalhar_analise(request)


@csrf_exempt
@login_required
def criar_analise(request):
    return avalAnalista.criar_analise(request)


@csrf_exempt
@login_required
def atualizar_analise(request):
    return avalAnalista.atualizar_analise(request)


def get_analysis_by_request(request):
    return avalAnalista.get_analysis_by_request(request)

@csrf_exempt
@login_required
def gerar_relatorio(request):
    return relatorio.gerar_relatorio(request)

@csrf_exempt
@login_required
def get_relatorios(request):
    return relatorio.get_relatorios(request)

@csrf_exempt
@login_required
def comment_relatorio(request):
    return relatorio.comment_relatorio(request)

@csrf_exempt
@login_required
def detalhar_analista(request):
    """
    Function that detail a analyst
    """
    if request.method == 'GET':
        if hasattr(request.user, 'administrador'):
            analystid = request.GET.get('analystid')
            analyst = Analista.objects.get(pk=analystid)
            ser_user = UsuarioSerializer(analyst.user)
            ser_anal = AnalistaSerializer(analyst)
            ser_return = {
                'user': ser_user.data,
                'analyst': ser_anal.data
            }
            return JSONResponse(ser_return, status=200)
        else:
            return HttpResponse("Você precisa ser um administrador para realizar esta solicitação", status=403)
    return HttpResponseBadRequest()

@csrf_exempt
@login_required
def concluir_analise(request):
    return avalAnalista.concluir_analise(request)

@csrf_exempt
@login_required
def alterar_senha(request):
    if request.method == 'POST':
        data = request.POST
        old_password = data.get('old')
        new_password = data.get('new')
        user = request.user
        matchcheck = check_password(old_password, user.password)
        if matchcheck:
            user.set_password(new_password)
            user.save()
            update_session_auth_hash(request, request.user)
            return HttpResponse("Senha alterada com sucesso", status=200)
        else:
            return HttpResponse("Senha incorreta, não foi possível alterar", status=401)
    return HttpResponseBadRequest()


@csrf_exempt
@login_required
def finalizar_analise(request):
    return avalAnalista.finalizar_analise(request)
