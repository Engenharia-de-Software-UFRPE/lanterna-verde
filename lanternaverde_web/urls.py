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
    path('user/password/change', views.alterar_senha, name='alterar_senha'),

    path('perguntas', views.get_questoes, name='questoes'),
    path('perguntas/add', views.create_questao, name='create_questoes'),

    path('solicitacoesAnalise', views.get_solicitacoes, name='get_solicitacoes'),
    path('solicitacoesAnalise/add', views.create_solicitacao, name="Criar Solicitação de Análise"),
    path('solicitacoesAnalise/detail', views.get_solicitacao, name='Get Solicitação Análise'),

    path('analise', views.listar_analises, name='listar_analises'),
    path('analise/add', views.criar_analise, name='criar_analise'),
    path('analise/detail', views.detalhar_analise, name='detalhar_analise'),
    path('analise/update', views.atualizar_analise, name='atualizar_analise'),
    path('analise/finish', views.concluir_analise, name='concluir_analise'),

    path('analise/empresa', views.listar_analises_empresa, name='listar_analises_empresa'),
    path('analise/reanalise', views.listar_analises_passiveis_reanalise, name='listar_analises_empresa'),

    path('empresa/add', views.cadastro_empresa, name='cadastro_empresa'),
    path('empresa/update', views.alterar_empresa, name='alterar_empresa'),
    path('empresas', views.get_empresas, name='get_empresas'),
    
]
