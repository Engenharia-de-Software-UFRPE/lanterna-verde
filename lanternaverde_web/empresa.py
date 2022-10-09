from .models import Empresa
import json
from .serializers import EmpresaSerializer, EmpresaPublicSerializer
from .utils.jsonresponse import JSONResponse
from django.http import HttpResponse, HttpResponseBadRequest


def detalhar_empresa_public(request):
    """
    Método para detalhar uma empresa sem necessariamente estar logado (visão do consumidor)
    """
    if request.method == 'GET':
        data = request.GET
        try:
            empresa = Empresa.objects.get(pk=data.get('companyid'))
        except Exception as error:
            return HttpResponse(error, status=404)
        ser_empresa = EmpresaPublicSerializer(empresa).data
        ser_return = {
            "Empresa": ser_empresa
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


def detalhar_empresa(request):
    """
    Método para detalhar uma empresa sem necessariamente estar logado (visão do consumidor)
    """
    if request.method == 'GET':
        data = request.GET
        try:
            empresa = Empresa.objects.get(pk=data.get('companyid'))
        except Exception as error:
            return HttpResponse(error, status=404)
        ser_empresa = EmpresaSerializer(empresa).data
        ser_return = {
            "Empresa": ser_empresa
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


def listar_empresas(request):
    if request.method == 'GET':
        #pylint: disable=E1101
        empresas = EmpresaSerializer(Empresa.objects.all(), many=True)
        ser_return = {
            'listaEmpresa': empresas.data
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()


def listar_empresas_public(request):
    if request.method == 'GET':
        # pylint: disable=E1101
        empresas = EmpresaPublicSerializer(Empresa.objects.all(), many=True)
        ser_return = {
            'listaEmpresa': empresas.data
        }
        return JSONResponse(ser_return, status=200)
    return HttpResponseBadRequest()
