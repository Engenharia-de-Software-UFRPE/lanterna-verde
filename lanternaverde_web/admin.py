from django.contrib import admin
from .models import Questao, Usuario, Administrador, Analista

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Administrador)
admin.site.register(Analista)
admin.site.register(Questao)
