from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),

    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),

    path("analista/add", views.cadastro_analista, name='criar_analista'),
    path("analista/update", views.alterar_analista, name='alterar cadastro'),
    path("analista/detail", views.detalhar_analista, name='detalhar_analista'),

    path('user', views.get_logged_usuario, name='test_permission'),
    path('user/admin', views.get_logged_administrador, name='get_admin'),
    path('user/analista', views.get_logged_analista, name='get_anal'),

    path('perguntas', views.get_questoes, name='questoes'),
    path('perguntas/add', views.create_questao, name='create_questoes'),

    path('analise', views.listar_analises, name='listar_analises'),
    path('analise/add', views.criar_analise, name='criar_analise'),
    path('analise/detail', views.detalhar_analise, name='detalhar_analise'),
    path('analise/update', views.atualizar_analise, name='atualizar_analise'),

    path('empresa/add', views.cadastro_empresa, name='cadastro_empresa'),
    path('empresa/update', views.cadastro_empresa, name='alterar_empresa'),

]
