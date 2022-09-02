from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('user', views.get_logged_usuario, name='test_permission'),
    path('user/admin', views.get_logged_administrador, name='get_admin'),
    path('user/analista', views.get_logged_analista, name='get_anal'),
    path('cadastro_empresa', views.cadastro_empresa, name='cadastro_empresa'),
    path('alterar_empresa', views.cadastro_empresa, name='alterar_empresa'),
    path('perguntas', views.get_questoes, name='questoes'),
    path('perguntas/add', views.create_questao, name='create_questoes'),
    path('solicitacoesAnalise', views.get_solicitacoes, name='get_solicitacoes'),
]
