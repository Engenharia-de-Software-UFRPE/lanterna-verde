from django.contrib import admin
from .models import Pergunta, Usuario, Administrador, Analista, AvaliacaoAnalista, Questao, Empresa

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Administrador)
admin.site.register(Analista)
admin.site.register(AvaliacaoAnalista)
admin.site.register(Pergunta)
admin.site.register(Questao)
admin.site.register(Empresa)
