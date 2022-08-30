from django.contrib import admin
from .models import Pergunta, Usuario, Administrador, Analista, AvaliacaoAnalista, Question

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Administrador)
admin.site.register(Analista)
admin.site.register(AvaliacaoAnalista)
admin.site.register(Question)
admin.site.register(Pergunta)
