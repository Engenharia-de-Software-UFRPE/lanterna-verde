from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound
from django.utils import timezone

from lanternaverde_web import notificacaoAdm
from lanternaverde_web.serializers import SolicitacoesAnaliseSerializer as serializer
from lanternaverde_web.models import SolicitacaoAnalise
from lanternaverde_web.utils.jsonresponse import JSONResponse

# TODO: Method to validate if a Company is not creating a duplicate Analysis
# Requirement
def create_solicitacao(request):
    """
    Creates a new Solicitacao Analise Object.

    This function restricts who can create new Analysis requirement to Company
    Users.
    """
    if request.method == 'POST':
        empresa = request.user.empresa
        if len(empresa.solicitacoes.filter(status__in=[SolicitacaoAnalise.PROCESSING, SolicitacaoAnalise.PENDING])) == 0:
            solicitacao = SolicitacaoAnalise.objects.create(empresa=empresa, date=timezone.now())
            notificacaoAdm.criar_notificacaoAdm_solicitacao(solicitacao)
            return HttpResponse(status=200)
        return HttpResponse("Há análises em andamento para essa empresa", status=422)
    return HttpResponseBadRequest()

def get_solicitacoes(request):
    """
    Groups all `SolicitacoesAnalise` objects into a JSON response.
    """
    if request.method == 'GET':
        #pylint: disable=E1101
        solicitacoes = serializer(SolicitacaoAnalise.objects.all(), many=True)
        data=solicitacoes.data
        ser_return = {
            'solicitacoes_analise': data
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

def get_analysis(request):
    """
    Takes a requested analysis by its ID and returns.
    """
    if request.method == 'GET':
        #pylint: disable=E1101
        id_analysis = request.GET.get('id')
        try:
            solicitacao = SolicitacaoAnalise.objects.get(pk=id_analysis)
            return JSONResponse(serializer(solicitacao).data, status=200)
        except IntegrityError:
            return HttpResponseNotFound()
    return HttpResponseBadRequest


def listar_analises_empresa(request):
    if request.method == 'GET':
        empresa = request.user.empresa
        analises = serializer(empresa.solicitacoes, many=True)
        ser_return = {'Relatorios': analises.data}
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()
     