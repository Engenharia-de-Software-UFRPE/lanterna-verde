from django.contrib import admin
from .models import Questao, Usuario, Administrador, Analista, AvaliacaoAnalista, Question

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Administrador)
admin.site.register(Analista)
admin.site.register(Questao)
admin.site.register(AvaliacaoAnalista)
admin.site.register(Question)
