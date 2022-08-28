from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the index.")

@csrf_exempt # TODO: Remover csrf_exempt (REQ. não funcional)
def login_redirect(request):
    """
    Method that tries to login an user and redirects to its designated area.
    """
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            if hasattr(user, 'analista'):
                return HttpResponseRedirect('analista')
            if hasattr(user, 'administrador'):
                return HttpResponseRedirect('admin')
            return HttpResponseBadRequest()
        return HttpResponse("Usuário ou senhas inválidos, por favor tente" +
                            " novamente")

def cadastro_empresa(request):
    print(request.POST)
    if request.method == 'GET':
        pass

    elif request.method == 'POST':
        data = request.POST
        usuario = Usuario.objects.create_user(username=data.get('username'), email=data.get('email'), password=data.get('password'))
        usuario.save()
        empresa = Empresa.objects.create(tradeName=data.get('tradeName'),
                                        corporateName=data.get('corporateName'),
                                        stateRegistration=data.get('stateRegistration'),
                                        cnpj=data.get('cnpj'),
                                        tipo=data.get('tipo'),
                                        contactName=data.get('contactName'),
                                        phoneNumber=data.get('phoneNumber'),
                                        user=usuario)
        empresa.save()

    return HttpResponseRedirect(status=201)


def alterar_empresa(request):
    data = request.POST
    empresa = empresa.objects.get(pk=2)
    empresa.tradeName = data.get("tradeName")
    empresa.corporateName = data.get("corporateName")
    empresa.stateRegistration = data.get("stateRegistration")
    empresa.cnpj = data.get("cnpj")
    empresa.tipo = data.get("tipo")
    empresa.contactName = data.get("contactName")
    empresa.phoneNumber = data.get("phoneNumber")
    empresa.user.username = data.get("username")
    empresa.user.email = data.get("email")
    empresa.user.password = data.get("password")
    empresa.save()
    empresa.user.save()
    return HttpResponse(status=200)