import json
from django.db import IntegrityError
from django.contrib.auth import authenticate, update_session_auth_hash
from django.contrib.auth import login as djangoLogin, logout as djangoLogout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password

import lanternaverde_web.solicitacaoAnalise as solAnalise
import lanternaverde_web.avaliacaoAnalista as avalAnalista
import lanternaverde_web.relatorio as relatorio
import lanternaverde_web.notificacaoAdm as notificacaoAdm

from django.contrib.auth.hashers import check_password

from datetime import datetime


#pylint: disable=W0401
from .models import *
from .serializers import *
from .utils.decorators import administrador_required, analista_required, empresa_required
from lanternaverde_web.utils.jsonresponse import JSONResponse

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the index.")


@csrf_exempt
@login_required
@administrador_required
def cadastro_analista(request):
    if request.method == 'POST':
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
    if request.method == 'POST':
        data = json.loads(request.body)
        usuario = Usuario.objects.create_user(username=data['username'], 
                                            email=data['email'], 
                                            password=data['password'])        
        empresa = Empresa.objects.create(tradeName= data['tradeName'],
                                        corporateName= data['corporateName'],
                                        stateRegistration= data['stateRegistration'],
                                        cnpj= data['cnpj'],
                                        tipo= data['type'],
                                        phoneNumber= data['phoneNumber'],
                                        user=usuario)
        usuario.save()
        empresa.save()

        return HttpResponse(status=201)
    return HttpResponseBadRequest()

@csrf_exempt
@login_required
@empresa_required
def alterar_empresa(request):
    if(request.method == 'PUT'):
        data = json.loads(request.body)
        
        usuario = request.user
        usuario.username = data['username']
        usuario.email = data['email']
        usuario.set_password(data['password'])
        usuario.save()

        update_session_auth_hash(request, request.user)
        
        empresa = Empresa.objects.get(user=usuario.id)
        empresa.tradeName = data['tradeName']
        empresa.corporateName = data['corporateName']
        empresa.tipo = data['type']
        empresa.phoneNumber = data['phoneNumber']
        empresa.user = usuario
        empresa.save()

        return HttpResponse(status=200)
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
        return JSONResponse(ser_return, status=201)
    return HttpResponseBadRequest()

@login_required(login_url='/')
@administrador_required
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


@login_required(login_url='/')
@analista_required
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

@csrf_exempt
@login_required
@empresa_required
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

@csrf_exempt
@login_required
@administrador_required
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
@empresa_required
def create_solicitacao(request):
    """
    Creates a new Solicitacao Analise Object.

    This function restricts who can create new Analysis requirement to Company
    Users.
    """
    return solAnalise.create_solicitacao(request)


@csrf_exempt
@login_required
@administrador_required
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
@empresa_required
def listar_analises_empresa(request):
    return avalAnalista.listar_analises_empresa(request)

@csrf_exempt
@login_required
@empresa_required
def listar_analises_passiveis_reanalise(request):
    return avalAnalista.listar_analises_passiveis_reanalise(request)

@csrf_exempt
@login_required
def detalhar_analise(request):
    """
    Function that detail a analyst
    """
    return avalAnalista.detalhar_analise(request)


@csrf_exempt
@login_required
@administrador_required
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
@administrador_required
def detalhar_analista(request):
    """
    Function that detail a analyst
    """
    if request.method == 'GET':
        analystid = request.GET.get('analystid')
        analyst = Analista.objects.get(pk=analystid)
        ser_user = UsuarioSerializer(analyst.user)
        ser_anal = AnalistaSerializer(analyst)
        ser_return = {
            'user': ser_user.data,
            'analyst': ser_anal.data
        }
        return JSONResponse(ser_return, status=200)
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

@csrf_exempt
@login_required
@empresa_required
def assinar_pacote(request):
    if(request.method == 'PUT'):
        data = json.loads(request.body)
        usuario = request.user        
        empresa = Empresa.objects.get(user=usuario.id) 
        empresa.package = data
        empresa.save()
        return HttpResponse(status=200)
    return HttpResponseBadRequest()

@csrf_exempt
@login_required
@empresa_required
def solicitar_reanalise(request, pk):
    if request.method == 'PUT':
        data = json.loads(request.body)
        solicitacao = SolicitacaoAnalise.objects.get(analises__id = pk)
        solicitacao.reanalysis = False
        solicitacao.save()
        return HttpResponse(status=200)
    return HttpResponseBadRequest()

@csrf_exempt
@login_required
@empresa_required
def get_info_analise_empresa(request, pk):
    if request.method == 'GET':
        empresa = request.user.empresa

        solicitacao = SolicitacoesAnaliseSerializer(
            SolicitacaoAnalise.objects.get(empresa__id=empresa.id, analises__id = pk),
            context={'request': None}
        )
        relatorio = RelatorioSerializer(
            Relatorio.objects.get(request__id = solicitacao.data['id'])
        )
        
        ser_return = {
            'Solicitacao': solicitacao.data,
            'Relatorio': relatorio.data
        }
        
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

"""
def get_empresa(request, id):
    if request.method == 'GET':
        empresas = EmpresaSerializer(
            Empresa.objects.get(id=id)
        )
        ser_return = {
            'Empresa': empresas.data
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()
"""

def get_ranking(request):
    if request.method == 'GET':
        empresas = Empresa.objects.all()
        for i in range(len(empresas)):
            relatoriosEmpresa = Relatorio.objects.filter(request__empresa__id = empresas[i].id,
                                                        request__status=3)
            somaAscores = 0
            for j in range(len(relatoriosEmpresa)):
                somaAscores += relatoriosEmpresa[j].ascore

            empresa = Empresa.objects.get(id=empresas[i].id)
            
            if somaAscores>0:
                empresa.score = somaAscores/len(relatoriosEmpresa)
            else :
                empresa.score = 0

            empresa.save()

        empresas = EmpresaSerializer(
            Empresa.objects.all().order_by('-score'),
            many=True
        )
                       
        ser_return = {
            'Empresas': empresas.data
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

@csrf_exempt
@login_required
@empresa_required
def compilar_relatorio_geral_empresa(request):
    if request.method == 'GET':
        analises = AvaliacaoAnalistaSerializer(
                    AvaliacaoAnalista.objects.filter(analysis_request__empresa__id = request.user.empresa.id,
                                                    analysis_request__status = 3,
                                                    status = 2).order_by('-update_date'),
                    many = True,
                    context={'request': None}
        )

        relatorios = list()
        ascore_por_data = list()
        for i in range(len(analises.data)):
            for analises_key,analises_value in analises.data[i].items():
                if(analises_key == 'analysis_request'):
                    relatorio = RelatorioSerializer(
                                Relatorio.objects.get(request__id = analises_value)
                    )
                    if len(relatorio.data)>0:
                        relatorios.append(relatorio.data)
                        ascore_por_data.append({
                            'ascore': relatorio.data['ascore'],
                            'data': analises.data[i]['update_date']})

        scoresD1 = 0
        scoresD2 = 0
        scoresD3 = 0
        scoresD4 = 0
        ascores = 0
        for i in range(len(relatorios)):
            scoresD1 += relatorios[i]['scoreD1']
            scoresD2 += relatorios[i]['scoreD2']
            scoresD3 += relatorios[i]['scoreD3']
            scoresD4 += relatorios[i]['scoreD4']
            ascores += relatorios[i]['ascore']

        if (len(relatorios) >0 ) :
            scores = {
                'D1': scoresD1/len(relatorios),
                'D2': scoresD2/len(relatorios),
                'D3': scoresD3/len(relatorios), 
                'D4': scoresD4/len(relatorios),
                'Ascore': ascores/len(relatorios)
            }
        else:
            scores = {
                'D1': scoresD1,
                'D2': scoresD2,
                'D3': scoresD3, 
                'D4': scoresD4,
                'Ascore': ascores
            }
        
        array_scores = [scores['D1'],
                    scores['D2'],
                    scores['D3'],
                    scores['D4']]

        array_scores_sorted = [scores['D1'],
                    scores['D2'],
                    scores['D3'],
                    scores['D4']]

        array_scores_sorted.sort()
        
        piores_dimensoes = []
        [piores_dimensoes.append("D" + str(i+1) + " = " + str(array_scores_sorted[j]))
            for i in range(len(array_scores))
                for j in range(2)
                    if array_scores_sorted[j] == array_scores[i]
        ]

        relatorio_geral = {
            'Scores': scores,
            'ScorePorData': ascore_por_data,
            'PioresDimensoes': piores_dimensoes
        } 
        
        return JSONResponse(relatorio_geral, status=200)
    return HttpResponseBadRequest()

@csrf_exempt
@login_required(login_url='/')
@administrador_required
def listar_notificacoesAdm(request):
    return notificacaoAdm.listar_notificacoesAdm(request)

@csrf_exempt
@login_required(login_url='/')
@administrador_required
def notificacao_lida(request):
    return notificacaoAdm.notificacao_lida(request)
