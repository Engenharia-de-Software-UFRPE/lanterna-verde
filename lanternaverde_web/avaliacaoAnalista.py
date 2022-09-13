import json

from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseBadRequest

from .utils.jsonresponse import JSONResponse
from .models import AvaliacaoAnalista, Analista, Pergunta, Questao, Empresa, SolicitacaoAnalise
from .serializers import AvaliacaoAnalistaSerializer

# pylint: disable=E1101

def create_analysis(request):
    """
    Method that allows Administrators to create a new analysis based on an
    Analysis requirement and dinamically search for only available Analysts and
    least busy Analysts.
    """
    if request.method == 'POST' and hasattr(request.user, 'administrador'):
        data = json.loads(request.body)
        amount_analysts = data['amount_analysts']
        company = Empresa.objects.get(pk=data['company'])

        # Checks if there's any Analysis ongoing about this company
        if len(AvaliacaoAnalista.objects.filter(company=company)) > 0:
            return HttpResponse("Há análises em andamento para essa empresa",
                                status=422)

        try:
            solicitacao = SolicitacaoAnalise.objects.get(empresa=company)
            analysts_set = _select_Analist(amount_analysts)

            # Check if there's enough Analysts available for the request
            if amount_analysts != len(analysts_set):
                return HttpResponse("O número de analistas pedidos foi " +
                                    f"{amount_analysts}, porém apenas "
                                    f"{len(analysts_set)} estão disponíveis.",
                                    status=422)

            requirement_date = solicitacao.date

            # Creates the analysis
            for analyst in list(analysts_set):
                analysis = AvaliacaoAnalista.objects.create(
                    company=company,
                    analyst=analyst,
                    requirement_date=requirement_date)
                questions = list(Pergunta.objects.all())
                for question in questions:
                    Questao.objects.create(
                        question=question, questionnaire=analysis)
            return HttpResponse(status=201)
        except ObjectDoesNotExist:
            # In case a Analysis requirement is not available for the requested
            # company.
            return HttpResponse("Não foi possível encontrar uma "
                                "Solicitação de Análise para essa empresa.",
                                status=422)
    return HttpResponseBadRequest()

def detalhar_analise(request):
    """
    Function that detail a analysis
    """
    if request.method == 'GET':
        analysisid = request.GET.get('analysisid')
        analysis = AvaliacaoAnalista.objects.get(pk=analysisid)
        ser_anal = AvaliacaoAnalistaSerializer(analysis)
        data = ser_anal.data
        if hasattr(request.user, 'empresa'):
            del data['analyst']
            if analysis.finished is False:
                return HttpResponse("Essa análise ainda não foi concluída ", status=403)
        ser_return = {
            'analysis': data
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

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
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

def atualizar_analise(request):
    if request.method == 'POST':
        post = request.POST
        data = json.loads(request.body)
        analysis = AvaliacaoAnalista.objects.get(pk=data['id'])
        if analysis.analyst.user == request.user:
            analysis.comment = data['comment']
            for question in data['questao_set']:
                q = Questao.objects.get(pk=question['id'])
                q.answer = question['answer']
                q.save()
            analysis.score = '2'
        analysis.save()
        return HttpResponse(status=200)
    return HttpResponseBadRequest()

def _select_Analist(amount):
    analists = Analista.objects.filter(
        available=True).order_by('analysis')[:amount]
    return analists
