from django.shortcuts import render
from django.http import HttpResponse
from .models import Usuario, Analista, UserManager
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the index.")

@csrf_exempt
def cadastro_analista(request):
    if request.method == 'GET':
        pass

    elif request.method == 'POST':
        data = json.loads(request.body)
        print(request.body)
        print(data["username"])
        usuario = Usuario.objects.create_user(username=data["username"], email=data["email"], password=data["password"])
        usuario.save()
        analista = Analista.objects.create(cpf=data["cpf"],specialty=data["specialty"], user=usuario)
        analista.save()


    return HttpResponse(status=201)
@csrf_exempt
def alterar_analista(request):
    data = json.loads(request.body)
    analista = Analista.objects.get(pk=2)
    analista.cpf=data["cpf"]
    analista.specialty=data["specialty"]
    analista.user.username=data["username"]
    analista.user.email=data["email"]
    analista.user.password=data["password"]
    analista.save()
    analista.user.save()
    return HttpResponse(status=200)












