import json
from django.http import HttpResponse, HttpResponseBadRequest

from . import control_notificacaoAdm

from .models import AvaliacaoAnalista, Empresa, Relatorio, SolicitacaoAnalise
from .serializers import AvaliacaoAnalistaSerializer, EmpresaSerializer
from .serializers import EmpresaPublicSerializer, RelatorioSerializer
from .serializers import SolicitacoesAnaliseSerializer
from .utils.jsonresponse import JSONResponse

def detalhar_empresa_public(request):
    """
    Método para detalhar uma empresa sem necessariamente estar logado (visão do consumidor)
    """
    if request.method == 'GET':
        data = request.GET
        try:
            empresa = Empresa.objects.get(pk=data.get('companyid'))
        except Exception as error:
            return HttpResponse(error, status=404)
        ser_empresa = EmpresaPublicSerializer(empresa).data
        ser_return = {
            "Empresa": ser_empresa
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


def detalhar_empresa(request):
    """
    Método para detalhar uma empresa com todas os dados
    """
    if request.method == 'GET':
        data = request.GET
        try:
            empresa = Empresa.objects.get(pk=data.get('companyid'))
        except Exception as error:
            return HttpResponse(error, status=404)
        ser_empresa = EmpresaSerializer(empresa).data
        ser_return = {
            "Empresa": ser_empresa
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


def listar_empresas(request):
    """
    Lista as empresas com todos os dados
    """
    if request.method == 'GET':
        #pylint: disable=E1101
        empresas = EmpresaSerializer(Empresa.objects.all(), many=True)
        ser_return = {
            'listaEmpresa': empresas.data
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


def listar_empresas_public(request):
    """
    Lista as empresas com dados limitados (visão de consumidor)
    """
    if request.method == 'GET':
        # pylint: disable=E1101
        empresas = EmpresaPublicSerializer(Empresa.objects.all(), many=True)
        ser_return = {
            'listaEmpresa': empresas.data
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

def assinar_pacote(request):
    if (request.method == 'PUT'):
        data = json.loads(request.body)
        usuario = request.user
        empresa = Empresa.objects.get(user=usuario.id)
        empresa.package = data
        empresa.save()
        return HttpResponse(status=200)
    return HttpResponseBadRequest()

def solicitar_reanalise(request, pk):
    if request.method == 'PUT':
        solicitacao = SolicitacaoAnalise.objects.get(analises__id=pk)
        solicitacao.reanalysis = True
        solicitacao.status = 0
        solicitacao.save()
        control_notificacaoAdm.criar_notificacaoAdm_solicitacao(
            solicitacao, 'reanálise')
        return HttpResponse(status=200)
    return HttpResponseBadRequest()

def get_info_analise_empresa(request, pk):
    if request.method == 'GET':
        empresa = request.user.empresa

        solicitacao = SolicitacoesAnaliseSerializer(
            SolicitacaoAnalise.objects.get(
                empresa__id=empresa.id, analises__id=pk),
            context={'request': None}
        )
        relatorio = RelatorioSerializer(
            Relatorio.objects.get(request__id=solicitacao.data['id'])
        )

        ser_return = {
            'Solicitacao': solicitacao.data,
            'Relatorio': relatorio.data
        }

        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

def get_ranking(request):
    if request.method == 'GET':
        empresas = Empresa.objects.all()
        for i in range(len(empresas)):
            relatoriosEmpresa = Relatorio.objects.filter(request__empresa__id=empresas[i].id,
                                                         request__status=3)
            somaAscores = 0
            for j in range(len(relatoriosEmpresa)):
                somaAscores += relatoriosEmpresa[j].ascore

            empresa = Empresa.objects.get(id=empresas[i].id)

            if somaAscores > 0:
                empresa.score = somaAscores/len(relatoriosEmpresa)
            else:
                empresa.score = 0

            empresa.save()

        empresas = EmpresaSerializer(
            Empresa.objects.all().order_by('-score'),
            many=True
        )

        ser_return = {
            'Empresas': empresas.data
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


def compilar_relatorio_geral_empresa(request):
    if request.method == 'GET':
        analises = AvaliacaoAnalistaSerializer(
            AvaliacaoAnalista.objects.filter(analysis_request__empresa__id=request.user.empresa.id,
                                             analysis_request__status=3,
                                             status=2).order_by('-update_date'),
            many=True,
            context={'request': None}
        )

        relatorios = list()
        ascore_por_data = list()
        for i in range(len(analises.data)):
            for analises_key, analises_value in analises.data[i].items():
                if (analises_key == 'analysis_request'):
                    relatorio = RelatorioSerializer(
                        Relatorio.objects.get(request__id=analises_value)
                    )
                    if len(relatorio.data) > 0:
                        relatorios.append(relatorio.data)
                        ascore_por_data.append({
                            'ascore': relatorio.data['ascore'],
                            'data': analises.data[i]['update_date']})

        scoresD1 = 0
        scoresD2 = 0
        scoresD3 = 0
        scoresD4 = 0
        ascores = 0
        for i in range(len(relatorios)):
            scoresD1 += relatorios[i]['scoreD1']
            scoresD2 += relatorios[i]['scoreD2']
            scoresD3 += relatorios[i]['scoreD3']
            scoresD4 += relatorios[i]['scoreD4']
            ascores += relatorios[i]['ascore']

        if (len(relatorios) > 0):
            scores = {
                'D1': scoresD1/len(relatorios),
                'D2': scoresD2/len(relatorios),
                'D3': scoresD3/len(relatorios),
                'D4': scoresD4/len(relatorios),
                'Ascore': ascores/len(relatorios)
            }
        else:
            scores = {
                'D1': scoresD1,
                'D2': scoresD2,
                'D3': scoresD3,
                'D4': scoresD4,
                'Ascore': ascores
            }

        array_scores = [scores['D1'],
                        scores['D2'],
                        scores['D3'],
                        scores['D4']]

        array_scores_sorted = [scores['D1'],
                               scores['D2'],
                               scores['D3'],
                               scores['D4']]

        array_scores_sorted.sort()

        piores_dimensoes = []
        [piores_dimensoes.append("D" + str(i+1) + " = " + str(array_scores_sorted[j]))
            for i in range(len(array_scores))
         for j in range(2)
         if array_scores_sorted[j] == array_scores[i]
         ]

        relatorio_geral = {
            'Scores': scores,
            'ScorePorData': ascore_por_data,
            'PioresDimensoes': piores_dimensoes
        }

        return JSONResponse(relatorio_geral, status=200)
    return HttpResponseBadRequest()
