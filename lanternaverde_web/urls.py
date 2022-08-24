from . import views
from django.urls import path


urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_redirect, name='login')
]
