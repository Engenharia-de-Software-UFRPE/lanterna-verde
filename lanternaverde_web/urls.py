from . import views
from django.urls import path


urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_redirect, name='login'),
    path('cadastro_empresa', views.cadastro_empresa, name='cadastro_empresa'),
    path('alterar_empresa', views.cadastro_empresa, name='alterar_empresa')
]
