import json
from django.db import IntegrityError
from django.contrib.auth import authenticate
from django.contrib.auth import login as djangoLogin, logout as djangoLogout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer

#pylint: disable=W0401
from .models import *
from .serializers import *

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
    if request.method == 'POST':
        data = json.loads(request.body)
        usuario = Usuario.objects.create_user(username=data['username'], 
                                            email=data['email'], 
                                            password=data['password'])        
        usuario.save()
        empresa = Empresa.objects.create(tradeName= data['tradeName'],
                                        corporateName= data['corporateName'],
                                        stateRegistration= data['stateRegistration'],
                                        cnpj= data['cnpj'],
                                        tipo= data['type'],
                                        phoneNumber= data['phoneNumber'],
                                        user=usuario)
        empresa.save()

        print(data) #debug
        return HttpResponse(status=201)
    return HttpResponseBadRequest()

@csrf_exempt
@login_required
def alterar_empresa(request):
    if(request.method == 'PUT'):
        data = json.loads(request.body)
        usuario = Usuario.objects.filter(email=data['email'])
        empresa = Empresa.objects.get(pk=data['cnpj'])
        """ 
        Visto que sao unicos nao sei se seriam alterados
        
        usuario.username = data['username']
        usuario.email = data['email']
        empresa.cnpj = data['cnpj'] 
        """

        usuario.password = data['password']
        usuario.save

        empresa.tradeName = data['tradeName']
        empresa.corporateName = data['corporateName']
        empresa.stateRegistration = data['stateRegistration']
        empresa.tipo = data['type']
        empresa.phoneNumber = data['phoneNumber']
        empresa.user = usuario
        empresa.save()
        print(empresa) #debug

        return HttpResponse(status=200)
    return HttpResponseBadRequest()

def get_empresas(request):
    if request.method == 'GET':
        empresas = EmpresaSerializer(
            Empresa.objects.all(),
            many=True
        )
        ser_return = {
            'Empresas': empresas.data
        }
        return _JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


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

@login_required(login_url='/')
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
            return _JSONResponse(ser_return, status=201)
    return HttpResponseBadRequest()

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


@login_required
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
@login_required
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
@login_required
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
            for question in data['questions']:
                q = Questao.objects.get(pk=question['id'])
                q.answer = question['answer']
                q.save()
            analysis.score = '2'
        analysis.save()
        return HttpResponse(status=200)
    return HttpResponseBadRequest()

