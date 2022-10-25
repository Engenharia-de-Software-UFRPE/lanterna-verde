import json
from django.contrib.auth import authenticate, update_session_auth_hash
from django.contrib.auth import login as djangoLogin, logout as djangoLogout
from django.contrib.auth.hashers import check_password
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseBadRequest

from .models import Usuario, Analista, Empresa

## Usuários ##

def login(request):
    """
    Method that tries to login an user.
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            djangoLogin(request, user)
            if hasattr(user, 'analista'):
                return HttpResponse('analista', status=200)
            if hasattr(user, 'administrador'):
                return HttpResponse('administrador', status=200)
            if hasattr(user, 'empresa'):
                return HttpResponse('empresa', status=200)
            return HttpResponseBadRequest(status=401)
        return HttpResponse("Usuário ou senhas inválidos, por favor tente" +
                            " novamente", status=401)
    return HttpResponseBadRequest()

def logout(request):
    """
    Method that logs out an user.
    """
    if request.method in ['GET', 'POST']:
        djangoLogout(request)
        return HttpResponse(status=200)
    return HttpResponseBadRequest()

def alterar_senha(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        old_password = data['oldpw']
        new_password = data['newpw']
        user = request.user
        matchcheck = check_password(old_password, user.password)
        if matchcheck:
            user.set_password(new_password)
            user.save()
            update_session_auth_hash(request, request.user)
            return HttpResponse("Senha alterada com sucesso", status=200)
        else:
            return HttpResponse("Senha incorreta, não foi possível alterar", status=401)
    return HttpResponseBadRequest()

## Analista ##

def cadastro_analista(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            usuario = Usuario.objects.create_user(username=data['username'],
                                                  email=data['email'],
                                                  password=data['password'],
                                                  first_name=data['first_name'],
                                                  last_name=data['last_name']
                                                  )
            usuario.save()
            analista = Analista.objects.create(cpf=data['cpf'],
                                               specialty=data['specialty'],
                                               user=usuario
                                               )
            analista.save()
        except IntegrityError:
            return HttpResponse("Este usuário já está cadastrado", status=409)
        return HttpResponse(status=201)
    return HttpResponseBadRequest()

def alterar_analista(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if hasattr(request.user, 'administrador'):
            try:
                user = Usuario.objects.get(pk=data["id"])
            except:
                return HttpResponse("Usuário não encontrado", status=404)
        elif hasattr(request.user, 'analista'):
            user = request.user
        else:
            return HttpResponse("Você não tem permissão para realizar esta solicitação", status=403)

        user.analista.cpf = data["cpf"]
        user.analista.specialty = data["specialty"]
        user.username = data["username"]
        user.first_name = data["first_name"]
        user.last_name = data["last_name"]
        user.analista.email = data["email"]
        user.save()
        user.analista.save()
        return HttpResponse(status=201)
    return HttpResponseBadRequest()


## Empresa ##

def cadastro_empresa(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        usuario = Usuario.objects.create_user(username=data['username'],
                                              email=data['email'],
                                              password=data['password'])
        empresa = Empresa.objects.create(tradeName=data['tradeName'],
                                         corporateName=data['corporateName'],
                                         stateRegistration=data['stateRegistration'],
                                         cnpj=data['cnpj'],
                                         tipo=data['type'],
                                         phoneNumber=data['phoneNumber'],
                                         user=usuario)
        usuario.save()
        empresa.save()

        return HttpResponse(status=201)
    return HttpResponseBadRequest()

def alterar_empresa(request):
    if (request.method == 'PUT'):
        data = json.loads(request.body)

        usuario = request.user
        usuario.username = data['username']
        usuario.email = data['email']
        usuario.set_password(data['password'])
        usuario.save()

        update_session_auth_hash(request, request.user)

        empresa = Empresa.objects.get(user=usuario.id)
        empresa.tradeName = data['tradeName']
        empresa.corporateName = data['corporateName']
        empresa.tipo = data['type']
        empresa.phoneNumber = data['phoneNumber']
        empresa.user = usuario
        empresa.save()

        return HttpResponse(status=200)
    return HttpResponseBadRequest()
