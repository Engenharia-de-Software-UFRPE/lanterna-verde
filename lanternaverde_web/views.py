from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from lanternaverde_web import control_analista
from lanternaverde_web import control_auth
from lanternaverde_web import control_avaliacaoAnalista
from lanternaverde_web import control_empresa
from lanternaverde_web import control_notificacaoAdm
from lanternaverde_web import control_question
from lanternaverde_web import control_relatorio
from lanternaverde_web import control_session
from lanternaverde_web import control_solicitacaoAnalise

from .utils.decorators import administrador_required, analista_required, empresa_required

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the index.")

@login_required
@administrador_required
def cadastro_analista(request):
    return control_auth.cadastro_analista(request)

@login_required
def alterar_analista(request):
    return control_auth.alterar_analista(request)

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

@login_required
@empresa_required
def get_logged_empresa(request):
    """
    Function that creates a response to a GET request for a logged Empresa
    """
    return control_session.get_logged_empresa(request)

@login_required
@administrador_required
def create_questao(request):
    """
    Function that creates a `Questao` object and stores it in the DataBase.
    """
    return control_question.create_questao(request)

@login_required
def get_questoes(request):
    """
    Function that groups all `Questão` objects into a JSON response.
    """
    return control_question.get_questoes(request)

@login_required
@empresa_required
def create_solicitacao(request):
    """
    Creates a new Solicitacao Analise Object.

    This function restricts who can create new Analysis requirement to Company
    Users.
    """
    return control_solicitacaoAnalise.create_solicitacao(request)

@login_required
@administrador_required
def get_solicitacoes(request):
    """
    Groups all `SolicitacoesAnalise` objects into a JSON response.
    """
    return control_solicitacaoAnalise.get_solicitacoes(request)


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

@login_required
@empresa_required
def listar_analises_passiveis_reanalise(request):
    return control_avaliacaoAnalista.listar_analises_passiveis_reanalise(request)

@login_required
def detalhar_analise(request):
    """
    Function that detail a analyst
    """
    return control_avaliacaoAnalista.detalhar_analise(request)

@login_required
@administrador_required
def criar_analise(request):
    return control_avaliacaoAnalista.criar_analise(request)

@login_required
def atualizar_analise(request):
    return control_avaliacaoAnalista.atualizar_analise(request)

@login_required
def get_analysis_by_request(request):
    return control_avaliacaoAnalista.get_analysis_by_request(request)

@login_required
def gerar_relatorio(request):
    return control_relatorio.gerar_relatorio(request)

@login_required
def get_relatorios(request):
    return control_relatorio.get_relatorios(request)

@login_required
def get_relatorios_por_empresa(request):
    return control_relatorio.get_relatorios_por_empresa(request)

@login_required
def comment_relatorio(request):
    return control_relatorio.comment_relatorio(request)

@login_required
@administrador_required
def detalhar_analista(request):
    """
    Function that detail a analyst
    """
    return control_analista.detalhar_analista(request)

@login_required
def alterar_senha(request):
    return control_auth.alterar_senha(request)

@login_required
def finalizar_analise(request):
    return control_avaliacaoAnalista.finalizar_analise(request)

@login_required
@empresa_required
def assinar_pacote(request):
    return control_empresa.assinar_pacote(request)

@login_required
@empresa_required
def solicitar_reanalise(request, pk):
    return control_empresa.solicitar_reanalise(request, pk)

@login_required
@empresa_required
def get_info_analise_empresa(request, pk):
    return control_empresa.get_info_analise_empresa(request, pk)

@login_required
@administrador_required
def listar_empresas(request):
    return control_empresa.listar_empresas(request)

def listar_empresas_public(request):
    return control_empresa.listar_empresas_public(request)

def get_ranking(request):
    return control_empresa.get_ranking(request)

@login_required
@empresa_required
def compilar_relatorio_geral_empresa(request):
    return control_empresa.compilar_relatorio_geral_empresa(request)

@login_required(login_url='/')
@administrador_required
def listar_notificacoesAdm(request):
    return control_notificacaoAdm.listar_notificacoesAdm(request)

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
