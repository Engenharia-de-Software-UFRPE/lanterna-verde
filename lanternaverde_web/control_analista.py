from django.http import HttpResponseBadRequest

from .models import Analista
from .serializers import AnalistaSerializer, UsuarioSerializer
from .utils.jsonresponse import JSONResponse

def detalhar_analista(request):
    """
    Function that detail a analyst
    """
    if request.method == 'GET':
        analystid = request.GET.get('analystid')
        analyst = Analista.objects.get(pk=analystid)
        ser_user = UsuarioSerializer(analyst.user)
        ser_anal = AnalistaSerializer(analyst)
        ser_return = {
            'user': ser_user.data,
            'analyst': ser_anal.data
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()
