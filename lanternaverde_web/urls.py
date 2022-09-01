from django.urls import path
from . import views

urlpatterns = [
    path("criar_analista", views.cadastro_analista,name= 'criar_analista'),
    path("alterar_analista", views.alterar_analista,name= 'alterar cadastro'),
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('user', views.get_logged_usuario, name='test_permission'),
    path('user/admin', views.get_logged_administrador, name='get_admin'),
    path('user/analista', views.get_logged_analista, name='get_anal'),

    path('perguntas', views.get_questoes, name='questoes'),
    path('perguntas/add', views.create_questao, name='create_questoes'),
    path('analista/analises', views.listar_analises, name='listar_analises'),
    path('criar_analise', views.criar_analise, name='criar_analise'),
    path('detalhar_analise', views.detalhar_analise, name='detalhar_analise'),
    path('atualizar_analise', views.atualizar_analise, name='atualizar_analise'),


    path('cadastro_empresa', views.cadastro_empresa, name='cadastro_empresa'),
    path('alterar_empresa', views.cadastro_empresa, name='alterar_empresa'),

]
