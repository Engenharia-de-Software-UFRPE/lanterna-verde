from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_redirect, name='login'),
    path('user', views.get_logged_usuario, name='test_permission'),
    path('user/admin', views.get_logged_administrador, name='get_admin'),
    path('user/analista', views.get_logged_analista, name='get_anal'),
    path('questoes', views.get_questoes, name='questoes'),
    path('questoes/add', views.create_questao, name='create_questoes'),
]
