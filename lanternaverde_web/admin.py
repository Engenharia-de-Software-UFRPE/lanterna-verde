from django.contrib import admin
from .models import Pergunta, Relatorio, Usuario, Administrador, Analista, AvaliacaoAnalista, Questao, Empresa, SolicitacaoAnalise


# Register your models here.

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ['email', 'username']


@admin.register(Administrador)
class AdministradorAdmin(admin.ModelAdmin):
    list_display = ['user', 'role']


@admin.register(Analista)
class AnalistaAdmin(admin.ModelAdmin):
    list_display = ['user', 'specialty', 'available', 'cpf']


@admin.register(AvaliacaoAnalista)
class AvaliacaoAnalistaAdmin(admin.ModelAdmin):
    list_display = ['analyst', 'analysis_request', 'status']


@admin.register(Pergunta)
class PerguntaAdmin(admin.ModelAdmin):
    list_display = ['body', 'dimension']


@admin.register(Questao)
class QuestaoAdmin(admin.ModelAdmin):
    list_display = ['questionnaire', 'question', 'answer']


@admin.register(Empresa)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = ['user', 'tradeName', 'cnpj', 'tipo']

@admin.register(SolicitacaoAnalise)
class SolicitacaoAnaliseAdmin(admin.ModelAdmin):
    list_display = ['empresa', 'date', 'status']

@admin.register(Relatorio)
class RelatorioAdmin(admin.ModelAdmin):
    pass

