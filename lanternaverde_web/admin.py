from django.contrib import admin
from .models import Pergunta, Empresa, SolicitacaoAnalise, Usuario, Administrador, Analista

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Administrador)
admin.site.register(Analista)
admin.site.register(Pergunta)
admin.site.register(Empresa)
admin.site.register(SolicitacaoAnalise)
