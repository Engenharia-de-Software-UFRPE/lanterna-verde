from . import views
from django.urls import path


urlpatterns = [
    path('', views.index,name='index'),
    path("criar_analista",
         views.cadastro_analista,name= 'criar_analista'),
    path("alterar_analista",
         views.alterar_analista,name= 'alterar cadastro')
]
