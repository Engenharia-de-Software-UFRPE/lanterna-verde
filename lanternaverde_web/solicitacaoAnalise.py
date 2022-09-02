from django.http import HttpResponseBadRequest

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
