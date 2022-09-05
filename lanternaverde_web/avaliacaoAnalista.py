import json

from django.http import HttpResponse, HttpResponseBadRequest

from .utils.jsonresponse import JSONResponse
from .models import AvaliacaoAnalista, Analista, Pergunta, Questao, Empresa
from .serializers import AvaliacaoAnalistaSerializer

def criar_analise(request):
    if request.method == 'POST':
        post = request.POST
        data = json.loads(request.body)
        analysts = data['analysts']
        company = Empresa.objects.get(pk=data['company'])
        analysts_set = Analista.objects.filter(pk__in=analysts)
        for analyst in list(analysts_set):
            analysis = AvaliacaoAnalista.objects.create(
                company=company, analyst=analyst)
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
        ser_return = {
            'analysis': ser_anal.data
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
            for question in data['questions']:
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
