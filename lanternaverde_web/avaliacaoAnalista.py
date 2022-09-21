import json

from django.contrib.auth.hashers import check_password
from django.core.exceptions import ObjectDoesNotExist

from django.http import HttpResponse, HttpResponseBadRequest

from .utils.jsonresponse import JSONResponse
from .models import AvaliacaoAnalista, Analista, Pergunta, Questao, Empresa, SolicitacaoAnalise
from .serializers import AvaliacaoAnalistaSerializer, EmpresaSerializer
from .utils.countdimension import _count_dimension
import lanternaverde_web.relatorio as relatorio

def criar_analise(request):
    """
    Method that allows Administrators to create a new analysis based on an
    Analysis requirement and dinamically search for only available Analysts and
    least busy Analysts.
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        analysts_set = _select_Analist(data['analystamount'])
        # Check if there's enough Analysts available for the request
        if data['analystamount'] != len(analysts_set):
            return HttpResponse("O número de analistas pedidos foi " +
                                f"{data['analystamount']}, porém apenas "
                                f"{len(analysts_set)} estão disponíveis.",
                                status=422)
        analysis_request = SolicitacaoAnalise.objects.get(pk=data['analysis_request'])
        if analysis_request.status == SolicitacaoAnalise.PENDING:

            for analyst in list(analysts_set):
                analyst.analysis += 1
                analyst.save()
                analysis = AvaliacaoAnalista.objects.create(analyst=analyst, analysis_request=analysis_request)
                questions = list(Pergunta.objects.all())
                for question in questions:
                    Questao.objects.create(
                        question=question, questionnaire=analysis)
                analysis_request.status = SolicitacaoAnalise.PROCESSING
                analysis_request.save()
            return HttpResponse(status=201)
        return HttpResponse("Esta solicitação já está sendo processada", status=422)
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
        data['company'] = EmpresaSerializer(analysis.analysis_request.empresa).data
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
        data = analises.data
        for analise in data:
            analise['dimension_count'] = _count_dimension(analise)
            analise_obj = AvaliacaoAnalista.objects.get(pk=analise['id'])
            analise['company'] = EmpresaSerializer(analise_obj.analysis_request.empresa).data
        ser_return = {
            'Analise': data
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

def listar_analises_empresa(request):
    """
    Method that groups `AvaliacaoAnalista` from a specific company into a JSON
    response.
    """
    if request.method == 'GET':
        body_request = json.loads(request.body)
        company = Empresa.objects.get(id=body_request['companyid'])
        ser_company = EmpresaSerializer(company)

        #pylint: disable=E1101
        analysis_set = [AvaliacaoAnalista.objects.filter(analysis_request=analysis_request) for analysis_request in SolicitacaoAnalise.objects.filter(empresa=company)]
        if len(analysis_set) == 0:
            return HttpResponse(content="A empresa solicitada nunca foi "
                                "analisada por analistas", status=422)

        ser_analysis_set = {}
        for analysis, local_id in zip(analysis_set, range(len(analysis_set))):
            ser_analysis_set[str(local_id)] = AvaliacaoAnalistaSerializer(
                analysis, many=True).data

        ser_return = {
            'company': ser_company.data,
            'analysis': ser_analysis_set
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


def finalizar_analise(request):
    if request.method == 'POST':
        post = request.POST
        data = json.loads(request.body)
        analysis = AvaliacaoAnalista.objects.get(pk=data['analysisid'])
        if analysis.analyst.user == request.user:
            password = data['password']
            matchcheck = check_password(password, request.user.password)
            if matchcheck:
                analysis.finished = True
                analysis.save()
                analysis_request = analysis.analysis_request
                if len(analysis_request.analises.filter(finished=False)) == 0:
                    analysis_request.status = SolicitacaoAnalise.FINISHED
                    analysis_request.save()
                    relatorio.gerar_relatorio(analysis_request)
                return HttpResponse("Análise finalizada", status=200)
            return HttpResponse("Senha incorreta, a análise não foi finalizada", status=403)
        return HttpResponse("Você não é o responsável por esta análise", status=403)
    return HttpResponseBadRequest()
