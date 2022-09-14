from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseBadRequest

from .utils.jsonresponse import JSONResponse
from .models import Relatorio, SolicitacaoAnalise
from .serializers import RelatorioSerializer, AvaliacaoAnalistaSerializer
from .utils.countdimension import _count_dimension

def gerar_relatorio(request):
    if request.method == 'POST':
        if hasattr(request.user, 'administrador'):
            analysisrequestid = request.POST.get('analrequestid')
            analysis_request = SolicitacaoAnalise.objects.get(pk=analysisrequestid)
            if analysis_request.status == SolicitacaoAnalise.FINISHED:
                try:
                    report = Relatorio.objects.create(request=analysis_request, company=analysis_request.empresa)
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

                ser_report = RelatorioSerializer(report)
                ser_return = {'report': ser_report.data}

                return JSONResponse(ser_return, status=201)
            return HttpResponse(f"O status da análise é {analysis_request.get_status_display()}", status=422)
        return HttpResponse("Você precisa ser um administrador para realizar esta solicitação", status=403)
    return HttpResponseBadRequest()
