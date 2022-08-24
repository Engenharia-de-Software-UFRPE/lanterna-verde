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
