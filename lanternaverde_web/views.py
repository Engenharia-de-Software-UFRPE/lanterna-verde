import json
from django.db import IntegrityError

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt


from lanternaverde_web import control_auth
from lanternaverde_web import control_avaliacaoAnalista
from lanternaverde_web import control_empresa
from lanternaverde_web import control_notificacaoAdm
from lanternaverde_web import control_relatorio
from lanternaverde_web import control_session
from lanternaverde_web import control_solicitacaoAnalise

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
    return control_auth.cadastro_analista(request)

@csrf_exempt
@login_required
def alterar_analista(request):
    return control_auth.alterar_analista(request)

@csrf_exempt # TODO: Remover csrf_exempt (REQ. não funcional)
def login(request):
    """
    Method that tries to login an user.
    """
    return control_auth.login(request)

@csrf_exempt
@login_required
def logout(request):
    """
    Method that logs out an user.
    """
    return control_auth.logout(request)

@csrf_exempt
def cadastro_empresa(request):
    return control_auth.cadastro_empresa(request)

@csrf_exempt
@login_required
@empresa_required
def alterar_empresa(request):
    return control_auth.alterar_empresa(request)

@login_required(login_url='/')
def get_logged_usuario(request):
    """
    Function that creates a response for a GET request for a logged Usuario
    """
    return control_session.get_logged_usuario(request)

@login_required(login_url='/')
@administrador_required
def get_logged_administrador(request):
    """
    Function that creates a response to a GET request for a logged
    Administrador
    """
    return control_session.get_logged_administrador(request)

@login_required(login_url='/')
@analista_required
def get_logged_analista(request):
    """
    Function that creates a response to a GET request for a logged Analista
    """
    return control_session.get_logged_analista(request)

@csrf_exempt
@login_required
@empresa_required
def get_logged_empresa(request):
    """
    Function that creates a response to a GET request for a logged Empresa
    """
    return control_session.get_logged_empresa(request)

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
    return control_solicitacaoAnalise.create_solicitacao(request)


@csrf_exempt
@login_required
@administrador_required
def get_solicitacoes(request):
    """
    Groups all `SolicitacoesAnalise` objects into a JSON response.
    """
    return control_solicitacaoAnalise.get_solicitacoes(request)


@csrf_exempt
@login_required
def get_solicitacao(request):
    """
    Takes a requested analysis by its ID and returns.
    """
    return control_solicitacaoAnalise.get_analysis(request)

@login_required
def listar_analises(request):
    """
    Function that groups all `AvaliaçaoAnalista` objects into a JSON response.
    """
    return control_avaliacaoAnalista.listar_analises(request)

@login_required
@empresa_required
def listar_analises_empresa(request):
    """
    Method that groups `AvaliacaoAnalista` from a specific company into a JSON
    response.
    """
    return control_avaliacaoAnalista.listar_analises_empresa(request)

@csrf_exempt
@login_required
@empresa_required
def listar_analises_passiveis_reanalise(request):
    return control_avaliacaoAnalista.listar_analises_passiveis_reanalise(request)

@csrf_exempt
@login_required
def detalhar_analise(request):
    """
    Function that detail a analyst
    """
    return control_avaliacaoAnalista.detalhar_analise(request)


@csrf_exempt
@login_required
@administrador_required
def criar_analise(request):
    return control_avaliacaoAnalista.criar_analise(request)


@csrf_exempt
@login_required
def atualizar_analise(request):
    return control_avaliacaoAnalista.atualizar_analise(request)


def get_analysis_by_request(request):
    return control_avaliacaoAnalista.get_analysis_by_request(request)

@csrf_exempt
@login_required
def gerar_relatorio(request):
    return control_relatorio.gerar_relatorio(request)

@csrf_exempt
@login_required
def get_relatorios(request):
    return control_relatorio.get_relatorios(request)

@csrf_exempt
@login_required
def get_relatorios_por_empresa(request):
    return control_relatorio.get_relatorios_por_empresa(request)

@csrf_exempt
@login_required
def comment_relatorio(request):
    return control_relatorio.comment_relatorio(request)

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
def alterar_senha(request):
    return control_auth.alterar_senha(request)

@csrf_exempt
@login_required
def finalizar_analise(request):
    return control_avaliacaoAnalista.finalizar_analise(request)

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
        solicitacao = SolicitacaoAnalise.objects.get(analises__id = pk)
        solicitacao.reanalysis = True
        solicitacao.status = 0
        solicitacao.save()
        control_notificacaoAdm.criar_notificacaoAdm_solicitacao(solicitacao, 'reanálise')
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

@login_required
@administrador_required
def listar_empresas(request):
    return control_empresa.listar_empresas(request)


def listar_empresas_public(request):
    return control_empresa.listar_empresas_public(request)

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
    return control_notificacaoAdm.listar_notificacoesAdm(request)

@csrf_exempt
@login_required(login_url='/')
@administrador_required
def notificacao_lida(request):
    return control_notificacaoAdm.notificacao_lida(request)


def detalhar_empresa_public(request):
    return control_empresa.detalhar_empresa_public(request)


@login_required(login_url='/')
@administrador_required
def detalhar_empresa(request):
    return control_empresa.detalhar_empresa(request)
