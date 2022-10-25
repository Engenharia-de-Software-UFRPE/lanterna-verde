import json
from django.http import HttpResponse, HttpResponseBadRequest

from .utils.jsonresponse import JSONResponse
from .models import Administrador, NotificacaoAdm
from .serializers import NotificacoesAdmSerializer

def criar_notificacaoAdm_relatorio(relatorio_request):
    administradores = Administrador.objects.all()
    for admin in list(administradores):
        notificacao = NotificacaoAdm.objects.create(report=relatorio_request, receiver=admin)
        notificacao.title = 'O relatório da empresa ' + relatorio_request.company.tradeName + ' está disponivel'
        notificacao.save()


def criar_notificacaoAdm_solicitacao(solicitacao_request, tipoSolicitacao):
    administradores = Administrador.objects.all()
    for admin in list(administradores):
        notificacao = NotificacaoAdm.objects.create(request=solicitacao_request, receiver=admin)
        notificacao.title = solicitacao_request.empresa.tradeName + ' solicitou uma ' + tipoSolicitacao
        notificacao.save()


def listar_notificacoesAdm(request):
    if request.method == 'GET':
        destinatario = Administrador.objects.get(user=request.user)
        notificacoesAdm = NotificacoesAdmSerializer(NotificacaoAdm.objects.filter(receiver=destinatario), many=True)
        qtd_notificacoes_adm_nao_lidas = len(NotificacaoAdm.objects.filter(receiver=destinatario, has_been_seen=False))
        ser_return = {'notificacoesAdm': notificacoesAdm.data,
                      'qtd_notificacoes_nao_lidas': qtd_notificacoes_adm_nao_lidas}
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()

def notificacao_lida(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        notificacaoid = data['notificacaoAdmId']
        notificacao = NotificacaoAdm.objects.get(pk=notificacaoid)
        notificacao.has_been_seen = True
        notificacao.save()
        return HttpResponse(status=200)
    return HttpResponseBadRequest()