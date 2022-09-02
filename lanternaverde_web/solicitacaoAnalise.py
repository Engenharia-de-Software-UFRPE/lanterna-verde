from django.db import IntegrityError
from django.http import HttpResponseBadRequest, HttpResponseNotFound

from lanternaverde_web.serializers import SolicitacoesAnaliseSerializer as serializer
from lanternaverde_web.models import SolicitacaoAnalise
from lanternaverde_web.utils.jsonresponse import JSONResponse

def get_solicitacoes(request):
    """
    Groups all `SolicitacoesAnalise` objects into a JSON response.
    """
    if request.method == 'GET':
        #pylint: disable=E1101
        solicitacoes = serializer(SolicitacaoAnalise.objects.all(), many=True)
        ser_return = {
            'solicitacoes_analise': solicitacoes.data
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
