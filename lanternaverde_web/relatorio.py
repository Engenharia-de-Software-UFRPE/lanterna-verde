import json
from urllib import request
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseBadRequest

from lanternaverde_web import notificacaoAdm
from .utils.jsonresponse import JSONResponse
from .models import Relatorio, SolicitacaoAnalise, NotificacaoAdm
from .serializers import RelatorioSerializer, AvaliacaoAnalistaSerializer
from .utils.countdimension import _count_dimension

def gerar_relatorio(analysis_request):
    if analysis_request.status == SolicitacaoAnalise.FINISHED:
        try:
            report, _ = Relatorio.objects.get_or_create(request=analysis_request, company=analysis_request.empresa)
        except IntegrityError:
            return HttpResponse("Um relatório já foi gerado para esta solicitação", status=409)
        analises = AvaliacaoAnalistaSerializer(analysis_request.analises.all(), many=True, context={'request': None})
        data = analises.data

        sD1 = list()
        sD2 = list()
        sD3 = list()
        sD4 = list()

        for analise in data:
            analise['dimension_count'] = _count_dimension(analise)
            sD1.append(analise['dimension_count']['D1']['checked']/analise['dimension_count']['D1']['amount'])
            sD2.append(analise['dimension_count']['D2']['checked']/analise['dimension_count']['D2']['amount'])
            sD3.append(analise['dimension_count']['D3']['checked']/analise['dimension_count']['D3']['amount'])
            sD4.append(analise['dimension_count']['D4']['checked']/analise['dimension_count']['D4']['amount'])

        report.scoreD1 = sum(sD1)/len(sD1)
        report.scoreD2 = sum(sD2)/len(sD2)
        report.scoreD3 = sum(sD3)/len(sD3)
        report.scoreD4 = sum(sD4)/len(sD4)

        report.ascore = (report.scoreD1 +
                         report.scoreD2 +
                         report.scoreD3 +
                         report.scoreD4)/4

        report.save()
        notificacaoAdm.criar_notificacaoAdm_relatorio(report)
        return HttpResponse("Análise finalizada", status=200)


def get_relatorios(request):
    if request.method == 'GET':
        relatorios = RelatorioSerializer(Relatorio.objects.all(), many=True)
        ser_return = {'relatorios': relatorios.data}
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

def get_relatorios_por_empresa(request):
    if request.method == 'GET':
        empresaid = request.GET.get('empresaid')
        relatorios = RelatorioSerializer(Relatorio.objects.filter(company=empresaid), many=True)
        ser_return = {'relatorios': relatorios.data}
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

def comment_relatorio(request):
    if request.method == 'POST':
        if hasattr(request.user, 'administrador'):
            reportid = request.POST.get('reportid')
            comment = request.POST.get('comment')
            report = Relatorio.objects.get(pk=reportid)
            report.adm_comment = comment
            report.request.status = SolicitacaoAnalise.DELIVERED
            report.save()
            report.request.save()
            return HttpResponse('Relatorio finalizado.', status=200)
        return HttpResponse("Você precisa ser um administrador para realizar esta solicitação", status=403)
    return HttpResponseBadRequest()