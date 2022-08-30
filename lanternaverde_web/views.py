from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import Usuario, Analista, UserManager
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the index.")


def cadastro_analista(request):
    print(request.POST)
    if request.method == 'GET':
        pass

    elif request.method == 'POST':
        data = request.POST
        usuario = Usuario.objects.create_user(username=data.get('username'), email=data.get('email'), password=data.get('password'))
        usuario.save()
        analista = Analista.objects.create(cpf=data.get('cpf'), specialty=data.get('specialty'), user=usuario)
        analista.save()

    return HttpResponse(status=201)


def alterar_analista(request):
    data = request.POST
    analista = Analista.objects.get(pk=2)
    analista.cpf = data.get("cpf")
    analista.specialty = data.get("specialty")
    analista.user.username = data.get("username")
    analista.user.email = data.get("email")
    analista.user.password = data.get("password")
    analista.save()
    analista.user.save()
    return HttpResponse(status=201)












