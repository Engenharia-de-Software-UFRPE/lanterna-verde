import json

from django.http import HttpResponse, HttpResponseBadRequest

from .utils.jsonresponse import JSONResponse
from .models import AvaliacaoAnalista, Analista, Pergunta, Questao, Empresa, SolicitacaoAnalise
from .serializers import AvaliacaoAnalistaSerializer

def criar_analise(request):
    if request.method == 'POST':
        post = request.POST
        data = json.loads(request.body)
        company = Empresa.objects.get(pk=data['company'])
        analysts_set = _select_Analist(data['analystamount'])
        analysis_request = SolicitacaoAnalise.objects.get(pk=data['analysis_request'])
        for analyst in list(analysts_set):
            analyst.analysis += 1
            analyst.save()
            analysis = AvaliacaoAnalista.objects.create(
                company=company, analyst=analyst, analysis_request=analysis_request)
            questions = list(Pergunta.objects.all())
            for question in questions:
                Questao.objects.create(
                    question=question, questionnaire=analysis)
        return HttpResponse(status=201)
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
        data['dimension_count'] = _count_dimension(data)
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
        data = analises.data
        for analise in data:
            analise['dimension_count'] = _count_dimension(analise)
        ser_return = {
            'Analise': data
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


def get_analysis_by_request(request):
    if request.method == 'GET':
        analysis_request = SolicitacaoAnalise.objects.get(pk=request.GET.get('analysis_request'))
        analises = AvaliacaoAnalistaSerializer(analysis_request.analises.all(), many=True, context={'request': None})
        data = analises.data
        for analise in data:
            analise['dimension_count'] = _count_dimension(analise)
        ser_return = {
            'Analise': data,
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


def _count_dimension(analysis):
    question_set = analysis['questao_set']
    dimensions = {'D1': {'amount': 0, 'checked': 0},
                  'D2': {'amount': 0, 'checked': 0},
                  'D3': {'amount': 0, 'checked': 0},
                  'D4': {'amount': 0, 'checked': 0}
                  }
    for question in question_set:
        dimensions[question['question']['dimension']]['amount'] += 1
        if question['answer']:
            dimensions[question['question']['dimension']]['checked'] += 1
    return dimensions
